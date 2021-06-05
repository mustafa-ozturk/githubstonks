const Axios = require("axios");
const db = require("./db.json");
const { stonkData } = require("./utils");

const stonkDataArr = stonkData();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

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

const handleCards = (req, res) => {
    try {
        return res.status(200).json({ data: stonkDataArr });
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

    const user = {
        id: ghData.id,
        username: ghData.login,
    };
    db.push(user);
    res.redirect(`http://localhost:3000?id=${ghData.id}`);
};

const handleUserAuth = (req, res) => {
    const { id } = req.body;
    db.find((elem) => {
        if (elem.id === parseInt(id)) {
            return res.json({ message: "user logged in" });
        }
        return res.json({ message: "user not found" });
    });
};

module.exports = {
    handleTest,
    handleCards,
    handleSigninRedirect,
    handleOauthCallback,
    handleUserAuth,
};
