require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

const {
    handleTest,
    handleCards,
    handleSigninRedirect,
    handleOauthCallback,
    handleUserAuth,
} = require("./handlers");

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(cors());
app.use(express.json());

app.get("/test", handleTest);

app.get("/api/stonkData", handleCards);

app.get("/api/user/signin", handleSigninRedirect);

app.get("/oauth-callback", handleOauthCallback);

app.post("/api/user/auth", handleUserAuth);

app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is not the way",
    });
});

app.listen(8000, () => console.log(`Listening on port 8000`));
