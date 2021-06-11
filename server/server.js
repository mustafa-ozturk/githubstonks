require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const {
    handleCards,
    handleSigninRedirect,
    handleOauthCallback,
    handleUserAuth,
    handleUserBuy,
    handleUserSell,
    handleUserInfo,
    handleDeleteSession,
    handleLeaderboard,
} = require("./handlers");

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/api/stonkData", handleCards);

app.get("/api/leaderboard", handleLeaderboard);

app.get("/api/user/signin", handleSigninRedirect);

app.get("/oauth-callback", handleOauthCallback);

app.post("/api/user/auth", handleUserAuth);

app.post("/api/:id/buy", handleUserBuy);

app.post("/api/:id/sell", handleUserSell);

app.get("/api/:id/info", handleUserInfo);

app.delete("/api/delete-session", handleDeleteSession);

app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is not the way",
    });
});

app.listen(process.env.PORT || 8000, () =>
    console.log(`Listening on port 8000`)
);
