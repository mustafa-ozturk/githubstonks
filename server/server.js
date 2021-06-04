require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const Axios = require("axios");
const db = require("./db.json");
const app = express();

const { handleTest, handleCards, handleGuessUser } = require("./handlers");

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors());
app.use(express.json());
app.get("/test", handleTest);

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.get("/api/stonkData", handleCards);

app.get("/api/user/signin", (req, res) => {
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    );
});

app.get("/oauth-callback", async (req, res) => {
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
});

app.post("/api/user/auth", (req, res) => {
    const { id } = req.body;
    db.find((elem) => {
        if (elem.id === parseInt(id)) {
            return res.json({ message: "user logged in" });
        }
        return res.json({ message: "user not found" });
    });
});

app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is not the way",
    });
});

app.listen(8000, () => console.log(`Listening on port 8000`));
