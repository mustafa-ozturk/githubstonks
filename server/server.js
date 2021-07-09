require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
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

app.set("trust proxy", 1);
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 120, // limit each IP to 60 requests per windowMs
});
app.use(limiter);

app.use(cors());
app.use(express.json());

app.disable("x-powered-by");
app.use((req, res, next) => {
    res.setHeader("x-powered-by", "electricity");
    next();
});

app.get("/api/stonkData", handleCards);

app.get("/api/leaderboard", handleLeaderboard);

app.get("/api/user/signin", handleSigninRedirect);

app.get("/oauth-callback", handleOauthCallback);

app.post("/api/user/auth", handleUserAuth);

app.post("/api/:id/buy", handleUserBuy);

app.post("/api/:id/sell", handleUserSell);

app.get("/api/:id/info", handleUserInfo);

app.delete("/api/:id/delete-session", handleDeleteSession);

app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is not the way",
    });
});

app.listen(process.env.PORT || 8000, () =>
    console.log(`Listening on port 8000`)
);
