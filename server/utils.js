const { connectDb } = require("./db");
const STOCKDATA_COLLECTION = "stock-data";
const USER_COLLECTION = "user-data";

const stonkValueCalc = (elem) => {
    const initialPrice =
        Math.round(
            (elem.stars * 0.0003 +
                elem.forks * 0.0002 +
                elem.commits * 0.0001 +
                Number.EPSILON) *
                100
        ) / 100;
    const marketPrice =
        Math.round((elem.totalBoughtShares * 0.00001 + Number.EPSILON) * 100) /
        100;
    const priceAfterMarket =
        Math.round((initialPrice + marketPrice + Number.EPSILON) * 100) / 100;
    const dollarIncrease =
        Math.round((priceAfterMarket - initialPrice + Number.EPSILON) * 100) /
        100;
    return { initialPrice, priceAfterMarket, dollarIncrease };
};

const insertStockData = async (stockDataArr) => {
    let collection = await connectDb(STOCKDATA_COLLECTION);
    await stockDataArr.forEach(async (e) => {
        const query = { _id: e._id };
        const result = await collection.findOne(query);
        const { initialPrice, priceAfterMarket, dollarIncrease } =
            stonkValueCalc(e);
        e.price = priceAfterMarket;
        e.increasePrice = dollarIncrease;
        e.increasePercent = (100 * dollarIncrease) / initialPrice;
        e.initialPrice = initialPrice;
        e.firstPrice = initialPrice;
        if (!result) {
            await collection.insertOne(e);
            console.log("inserted data");
        } else if (
            result.stars !== e.stars ||
            result.forks !== e.forks ||
            result.commits !== e.commits
        ) {
            const stockQuery = { name: e.name };
            const update = {
                $set: {
                    price: priceAfterMarket,
                    increasePrice: dollarIncrease,
                    increasePercent: (100 * dollarIncrease) / result.firstPrice,
                    stars: e.stars,
                    forks: e.forks,
                    commits: e.commits,
                },
                $push: { priceHistory: { "Price: $": priceAfterMarket } },
            };
            await collection.updateOne(stockQuery, update);
            console.log("updated");
        }
    });
};

const getBalance = async (id) => {
    const query = { id: parseInt(id) };
    let collection = await connectDb(USER_COLLECTION);
    let result = await collection.findOne(query);
    let total = 0;
    result.buysAndSells.forEach((elem) => {
        if (elem.type === "BUY") {
            total += parseFloat(elem.purchaseCost);
        } else {
            total -= parseFloat(elem.purchaseCost);
        }
    });
    await collection.updateOne(query, {
        $set: {
            newBalance: parseInt(result.startingBalance - total),
        },
    });
    return result.startingBalance - total;
};

const getPortfolioValue = async (id) => {
    const query = { id: parseInt(id) };
    let userCollection = await connectDb(USER_COLLECTION);
    let result = await userCollection.findOne(query);
    const stocksOwned = result.stocksOwned;
    let stockCollection = await connectDb(STOCKDATA_COLLECTION);
    let stockData = await stockCollection.find().toArray();
    let portfolioValue = 0;
    stockData.forEach((elem) => {
        if (stocksOwned[elem.name]) {
            portfolioValue += stocksOwned[elem.name] * elem.price;
        }
    });
    return portfolioValue;
};

const getProfitLoss = async (id) => {
    // get total purchase cost from user data
    const query = { id: parseInt(id) };
    let userCollection = await connectDb(USER_COLLECTION);
    let result = await userCollection.findOne(query);
    let totalCostAtPurchase = 0;
    result.buysAndSells.forEach((elem) => {
        if (elem.type === "BUY") {
            totalCostAtPurchase += parseFloat(elem.purchaseCost);
        } else {
            totalCostAtPurchase -= parseFloat(elem.purchaseCost);
        }
    });
    // get total value of shares owned from stockdata
    const stocksOwned = result.stocksOwned;
    let stockCollection = await connectDb(STOCKDATA_COLLECTION);
    let stockData = await stockCollection.find().toArray();
    let portfolioValue = 0;
    stockData.forEach((elem) => {
        if (stocksOwned[elem.name]) {
            portfolioValue += stocksOwned[elem.name] * elem.price;
        }
    });
    // return total value of shares - total cost at purchase
    return portfolioValue - totalCostAtPurchase;
};

const getTotalshares = async (id) => {
    const query = { id: parseInt(id) };
    let userCollection = await connectDb(USER_COLLECTION);
    let result = await userCollection.findOne(query);
    return result.stocksOwned;
};

const getAccountStats = async (id) => {
    const query = { id: parseInt(id) };
    let accountArr = [];
    let userCollection = await connectDb(USER_COLLECTION);
    let userResult = await userCollection.findOne(query);
    let stockCollection = await connectDb(STOCKDATA_COLLECTION);
    let stockData = await stockCollection.find().toArray();
    Object.keys(userResult.stocksOwned).forEach((stockname) => {
        let obj = {};
        obj.name = stockname;
        const foundData = stockData.find((e) => e.name === stockname);
        obj.symbol = foundData.symbol;
        obj.price = foundData.price;
        obj.quantity = userResult.stocksOwned[stockname];
        const foundStocksBought = userResult.buysAndSells.filter(
            (e) => e.stockName === stockname && e.type === "BUY"
        );
        let totalPurchaseCost = 0;
        foundStocksBought.forEach((elem) => {
            totalPurchaseCost += elem.purchaseCost;
        });
        obj.totalCostBasis = totalPurchaseCost;
        obj.totalGainLoss =
            foundData.price * userResult.stocksOwned[stockname] -
            totalPurchaseCost;
        obj.currentValue = foundData.price * userResult.stocksOwned[stockname];
        accountArr.push(obj);
    });
    return accountArr;
};

const updateDbBuySell = async (stockCollection, stockname) => {
    let stockData = await stockCollection.find().toArray();
    stockData.forEach(async (e) => {
        if (e.name === stockname) {
            const { priceAfterMarket, dollarIncrease } = stonkValueCalc(e);
            const updateValues = {
                $set: {
                    price: priceAfterMarket,
                    increasePrice: dollarIncrease,
                    increasePercent: (100 * dollarIncrease) / e.firstPrice,
                },
                $push: { priceHistory: { "Price: $": priceAfterMarket } },
            };
            await stockCollection.updateOne({ name: e.name }, updateValues);
        }
    });
};

module.exports = {
    stonkValueCalc,
    insertStockData,
    getBalance,
    getPortfolioValue,
    getProfitLoss,
    getTotalshares,
    getAccountStats,
    updateDbBuySell,
};
