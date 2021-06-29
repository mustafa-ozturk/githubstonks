require("dotenv").config();
const { MongoClient } = require("mongodb");

const { MONGO_URI } = process.env;
const DBNAME = "githubstonks";

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

module.exports = { connectDb, disconnectDb };