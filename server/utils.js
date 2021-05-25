const { githubData, totalShares } = require("./data");

const stockShares = (stockname) => {
    return totalShares[stockname];
};

const buyOrSellShares = (type, stockname, newnum) => {
    if (type === "buy") {
        totalShares[stockname] += newnum;
    }
    if (type === "sell") {
        totalShares[stockname] -= newnum;
    }
};

const initialSharePrice = (stockname) => {
    return (
        ((githubData[stockname].stars /
            (githubData[stockname].forks *
                (githubData[stockname].commits /
                    githubData[stockname].closedIssues))) *
            githubData[stockname].commits *
            githubData[stockname].contributors) /
        1000000
    );
};

const sharePriceAfterUserMarket = (stockname) => {
    return initialSharePrice(stockname) + totalShares[stockname] * 0.001;
};

const dollarIncreaseFromInitialPrice = (stockname) => {
    return sharePriceAfterUserMarket(stockname) - initialSharePrice(stockname);
};

const percentIncreaseFromInitialPrice = (stockname) => {
    return (
        (100 * dollarIncreaseFromInitialPrice(stockname)) /
        initialSharePrice(stockname)
    );
};

module.exports = {
    stockShares,
    buyOrSellShares,
    initialSharePrice,
    sharePriceAfterUserMarket,
    dollarIncreaseFromInitialPrice,
    percentIncreaseFromInitialPrice,
};
