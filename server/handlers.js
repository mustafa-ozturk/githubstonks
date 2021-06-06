const { MongoClient } = require("mongodb");
const ObjectID = require("mongodb").ObjectID;
require("dotenv").config();
const Axios = require("axios");
const { stonkData } = require("./utils");
const { v4: uuidv4 } = require("uuid");
// uuidv4()
const stonkDataArr = stonkData();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const { MONGO_URI } = process.env;
const DBNAME = "githubstonks";
const STOCKDATA_COLLECTION = "stock-data";
const USER_COLLECTION = "user-data";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client;
const connectDb = async (collection) => {
    if (!client) {
        client = MongoClient(MONGO_URI, options);
        await client.connect();
        console.log("client connected");
    }
    return client.db(DBNAME).collection(collection);
};

const disconnectDb = () => {
    if (client) {
        client.close();
        client = undefined;
        console.log("client disconnected");
    }
};

const handleTest = (req, res) => {
    try {
        return res.status(200).json({ status: 200, message: "this is a test" });
    } catch (error) {
        return res.status(404).json({
            status: 500,
            error: error.message,
        });
    }
};

const insertStockData = async (stockDataArr) => {
    let collection = await connectDb(STOCKDATA_COLLECTION);
    stockDataArr.forEach(async (e) => {
        const query = { _id: e._id };
        const doc = await collection.findOne(query);

        if (!doc) {
            await collection.insertOne(e);
            console.log("inserted data");
        }
    });
};
insertStockData(stonkDataArr);

const handleCards = async (req, res) => {
    let collection = await connectDb(STOCKDATA_COLLECTION);
    let result = await collection.find().toArray();
    try {
        return res.status(200).json({ data: result });
    } catch (error) {
        return res.status(404).json({
            status: 500,
            error: error.message,
        });
    }
};

const handleSigninRedirect = (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
};

const handleOauthCallback = async (req, res) => {
    const code = req.query.code;
    const { data } = await Axios.post(
        `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
    );
    const accessTokenParams = new URLSearchParams(data);

    const accessToken = accessTokenParams.get("access_token");
    // const refreshToken = accessTokenParams.get("refresh_token");

    const { data: ghData } = await Axios.get("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    let collection = await connectDb(USER_COLLECTION);
    const user = {
        id: ghData.id,
        username: ghData.login,
    };
    const query = { id: ghData.id };
    const result = await collection.findOne(query);
    if (!result) {
        await collection.insertOne(user);
    }

    console.log("inserted data");

    res.redirect(`http://localhost:3000?id=${ghData.id}`);
};

const handleUserAuth = async (req, res) => {
    const { id } = req.body;
    const query = { id: parseInt(id) };
    let collection = await connectDb(USER_COLLECTION);
    const result = await collection.findOne(query);
    if (!result) {
        return res.json({ message: "user not found" });
    }
    return res.json({ message: "user logged in" });
};

module.exports = {
    handleTest,
    handleCards,
    handleSigninRedirect,
    handleOauthCallback,
    handleUserAuth,
};
