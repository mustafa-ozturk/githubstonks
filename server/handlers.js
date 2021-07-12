require("dotenv").config();
const Axios = require("axios");
const crypto = require("crypto");
const { stonkData } = require("./stonkdata");
const { ObjectOfTokens } = require("./ObjectOfTokens");
const { connectDb } = require("./db");
const {
    insertStockData,
    getBalance,
    getPortfolioValue,
    getProfitLoss,
    getTotalshares,
    getAccountStats,
    updateDbBuySell,
} = require("./utils");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const STOCKDATA_COLLECTION = "stock-data";
const USER_COLLECTION = "user-data";
const CLIENT_LINK = "https://githubstonks.com";
// http://localhost:3000
// https://githubstonks.com

// /api/stonkData
const handleCards = async (req, res) => {
    const stonkDataArr = await stonkData();
    await insertStockData(stonkDataArr).then(async () => {
        let collection = await connectDb(STOCKDATA_COLLECTION);
        let result = await collection.find().toArray();
        return res.status(200).json({ data: result });
    });
};

// /api/user/signin
const handleSigninRedirect = (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
};

// /oauth-callback
const handleOauthCallback = async (req, res) => {
    try {
        const code = req.query.code;
        const { data } = await Axios.post(
            `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
        );
        const accessTokenParams = new URLSearchParams(data);

        const accessToken = accessTokenParams.get("access_token");
        // const refreshToken = accessTokenParams.get("refresh_token");

        const { data: ghData } = await Axios.get(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const cryptographicToken = crypto
            .randomBytes(32)
            .toString("base64")
            .replace(/\//g, "_")
            .replace(/\+/g, "-")
            .replace(/=/g, "");

        ObjectOfTokens[cryptographicToken] = ghData.id;
        // create user if it doesnt already exist
        let collection = await connectDb(USER_COLLECTION);
        const user = {
            id: ghData.id,
            username: ghData.login,
            startingBalance: 100000,
            buysAndSells: [],
            stocksOwned: {},
            newBalance: 100000,
        };
        const query = { id: ghData.id };
        const result = await collection.findOne(query);
        if (!result) {
            await collection.insertOne(user);
            console.log("inserted data");
        }
        res.redirect(`${CLIENT_LINK}/?id=${cryptographicToken}`);
    } catch (error) {
        console.log("error", error);
    }
};

// /api/user/auth
const handleUserAuth = async (req, res) => {
    try {
        const token = req.body.id;
        const authenticated = ObjectOfTokens[token];

        if (authenticated === undefined) {
            return res.json({ message: "not authenticated" });
        }
        const id = authenticated[token];
        const query = { id: parseInt(id) };
        let collection = await connectDb(USER_COLLECTION);
        const result = await collection.findOne(query);
        if (!result) {
            return res.json({ auth: "false", message: "user not found" });
        }
        return res.json({ auth: "true", message: "user logged in" });
    } catch (error) {
        console.log("error", error);
    }
};

// /api/:id/buy
const handleUserBuy = async (req, res) => {
    const tokenid = req.params.id;
    const id = ObjectOfTokens[tokenid];
    let collection = await connectDb(USER_COLLECTION);
    let stockCollection = await connectDb(STOCKDATA_COLLECTION);
    const stockResult = await stockCollection.findOne({
        name: req.body.stockName,
    });
    const userResult = await collection.findOne({ id: id });
    const purchaseCost =
        Math.round(
            (parseInt(req.body.quantity) *
                parseFloat(stockResult.price) *
                1.15 +
                Number.EPSILON) *
                100
        ) / 100;

    req.body.quantity.split("").forEach((e) => {
        if (isNaN(parseInt(e))) {
            return res.status(400).json({
                status: 400,
                message: "quantity must be number",
            });
        }
    });
    if (parseFloat(req.body.quantity) > 1000) {
        return res.status(400).json({
            status: 400,
            message: "quantity cannot be more than 1000",
        });
    }
    if (isNaN(parseFloat(req.body.quantity))) {
        return res.status(400).json({
            status: 400,
            message: "quantity must be number",
        });
    }
    if (!stockResult) {
        return res.status(400).json({
            status: 400,
            message: "stonk does not exist",
        });
    }
    if (req.body.quantity <= 0) {
        return res.status(400).json({
            status: 400,
            message: "cannot buy 0 or negative",
        });
    }
    if (purchaseCost > userResult.newBalance) {
        return res.status(400).json({
            status: 400,
            message: "not enough money to buy stonks",
        });
    }

    const bodyObj = {
        type: req.body.type,
        stockName: req.body.stockName,
        symbol: req.body.symbol,
        quantity: parseInt(req.body.quantity),
        purchaseCost: purchaseCost,
    };

    const query = { id: id };
    const push = { $push: { buysAndSells: bodyObj } };
    await collection.updateOne(query, push);

    const stockname = req.body.stockName;
    const updateStock = {
        $inc: {
            [`stocksOwned.${stockname}`]: +parseInt(req.body.quantity),
        },
    };
    await collection.updateOne(query, updateStock);

    const stockQuery = { name: stockname };
    const updateBoughtShares = {
        $inc: {
            totalBoughtShares: +parseInt(req.body.quantity),
        },
    };
    await stockCollection.updateOne(stockQuery, updateBoughtShares);

    await updateDbBuySell(stockCollection, stockname);

    return res.status(200).json({
        confirmation: `Bought ${req.body.stockName} for ${purchaseCost}`,
        message: "success pushed buy to buyandsells in db",
    });
};

// /api/:id/sell
const handleUserSell = async (req, res) => {
    const tokenid = req.params.id;
    const id = ObjectOfTokens[tokenid];

    let collection = await connectDb(USER_COLLECTION);
    let stockCollection = await connectDb(STOCKDATA_COLLECTION);
    const stockResult = await stockCollection.findOne({
        name: req.body.stockName,
    });
    const userResult = await collection.findOne({ id: id });
    const purchaseCost =
        Math.round(
            (parseInt(req.body.quantity) *
                parseFloat(stockResult.price) *
                1.15 +
                Number.EPSILON) *
                100
        ) / 100;

    req.body.quantity.split("").forEach((e) => {
        if (isNaN(parseInt(e))) {
            return res.status(400).json({
                status: 400,
                message: "quantity must be number",
            });
        }
    });
    if (parseFloat(req.body.quantity) > 1000) {
        return res.status(400).json({
            status: 400,
            message: "quantity cannot be more than 1000",
        });
    }
    if (isNaN(parseFloat(req.body.quantity))) {
        return res.status(400).json({
            status: 400,
            message: "quantity must be number",
        });
    }
    if (!stockResult) {
        return res.status(400).json({
            status: 400,
            message: "stonk does not exist",
        });
    }
    if (req.body.quantity <= 0) {
        return res.status(400).json({
            status: 400,
            message: "cannot sell 0 or negative",
        });
    }
    if (
        parseInt(req.body.quantity) > userResult.stocksOwned[req.body.stockName]
    ) {
        return res.status(400).json({
            status: 400,
            message: "you can't sell more stonks than you own",
        });
    }
    if (parseInt(req.body.quantity) <= 0) {
        return res.status(400).json({
            status: 400,
            message: "you can't sell zero or negative stonks",
        });
    }

    const bodyObj = {
        type: req.body.type,
        stockName: req.body.stockName,
        symbol: req.body.symbol,
        quantity: parseInt(req.body.quantity),
        purchaseCost: purchaseCost,
    };

    const query = { id: id };
    const push = { $push: { buysAndSells: bodyObj } };

    await collection.updateOne(query, push);
    const stockname = req.body.stockName;
    const updateStock = {
        $inc: {
            [`stocksOwned.${stockname}`]: -parseInt(req.body.quantity),
        },
    };
    await collection.updateOne(query, updateStock);

    const stockQuery = { name: stockname };
    const updateBoughtShares = {
        $inc: {
            totalBoughtShares: -parseInt(req.body.quantity),
        },
    };
    await stockCollection.updateOne(stockQuery, updateBoughtShares);

    await updateDbBuySell(stockCollection, stockname);

    return res.status(200).json({
        confirmation: `Sold ${req.body.stockName} for ${purchaseCost}`,
        message: "success pushed sell to buyandsells in db",
    });
};

// /api/:id/info
const handleUserInfo = async (req, res) => {
    const tokenid = req.params.id;
    const id = ObjectOfTokens[tokenid];
    if (id) {
        const balance = await getBalance(id);
        const portfolio = await getPortfolioValue(id);
        const netWorth = portfolio + balance;
        const profitLoss = await getProfitLoss(id);
        const totalShares = await getTotalshares(id);
        const accountStats = await getAccountStats(id);
        let collection = await connectDb(USER_COLLECTION);
        const query = { id: id };
        const setNetWorth = {
            $set: {
                networth: netWorth,
            },
        };
        await collection.updateOne(query, setNetWorth);
        return res.status(200).json({
            data: {
                balance,
                portfolio,
                netWorth,
                profitLoss,
                totalShares,
                accountStats,
            },
        });
    }
};

// /api/:id/delete-session
const handleDeleteSession = (req, res) => {
    const tokenid = req.params.id;
    delete ObjectOfTokens[tokenid];
    res.status(200).end();
};

// /api/leaderboard"
const handleLeaderboard = async (req, res) => {
    let collection = await connectDb(USER_COLLECTION);
    let result = await collection.find().toArray();
    const usernameAndNetWorth = result.map((elem) => {
        const obj = {
            username: elem.username,
            networth: elem.networth,
        };
        return obj;
    });
    res.status(200).json({ leaderboard: usernameAndNetWorth });
};

module.exports = {
    handleCards,
    handleSigninRedirect,
    handleOauthCallback,
    handleUserAuth,
    handleUserBuy,
    handleUserSell,
    handleUserInfo,
    handleDeleteSession,
    handleLeaderboard,
};
