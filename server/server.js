const express = require("express");
const cors = require("cors");
const app = express();

const { handleTest } = require("./handlers");

app.get("/test", handleTest);

app.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is not the way",
    });
});

app.listen(8000, () => console.log(`Listening on port 8000`));
