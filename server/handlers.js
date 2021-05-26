const {
    stockShares,
    buyOrSellShares,
    initialSharePrice,
    sharePriceAfterUserMarket,
    dollarIncreaseFromInitialPrice,
    percentIncreaseFromInitialPrice,
} = require("./utils");

// buyOrSellShares("buy", "react", 10000);

console.log(
    "React initial price: $",
    initialSharePrice("react"),
    "\n",
    "total shares bought: ",
    stockShares("react"),
    "\n",
    "price after user market: $",
    sharePriceAfterUserMarket("react"),
    "\n",
    "increase from initial price: $",
    dollarIncreaseFromInitialPrice("react"),
    "\n",
    "percent Increase: ",
    percentIncreaseFromInitialPrice("react"),
    "%"
);

const handleTest = (req, res) => {
    try {
        return res.status(200).json({ status: 200, message: "this is a test" });
    } catch (error) {
        return res.status(404).json({
            status: 404,
            error: error.message,
        });
    }
};

module.exports = {
    handleTest,
};
