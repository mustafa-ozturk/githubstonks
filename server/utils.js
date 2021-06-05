const { stocknames, githubData, guestTotalShares } = require("./data");

const stockShares = (stockname) => {
    return guestTotalShares[stockname];
};

const buyOrSellShares = (type, stockname, newnum) => {
    if (type === "buy") {
        guestTotalShares[stockname] += newnum;
    }
    if (type === "sell") {
        guestTotalShares[stockname] -= newnum;
    }
};

const initialSharePrice = (stockname) => {
    return (
        githubData[stockname].stars * 0.0003 +
        githubData[stockname].forks * 0.0002 +
        githubData[stockname].commits * 0.0001
    );
};

const sharePriceAfterUserMarket = (stockname) => {
    return initialSharePrice(stockname) + guestTotalShares[stockname] * 0.001;
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

const stonkData = () => {
    let stonkDataArray = [];

    stocknames.forEach((elem) => {
        const stonkDataObj = {
            logo: githubData[elem].logo,
            name: githubData[elem].name,
            symbol: githubData[elem].symbol,
            price: sharePriceAfterUserMarket(elem),
            increasePrice: dollarIncreaseFromInitialPrice(elem),
            increasePercent: percentIncreaseFromInitialPrice(elem),
            stars: githubData[elem].stars,
            forks: githubData[elem].forks,
            commits: githubData[elem].commits,
            priceHistory: githubData[elem].priceHistory,
        };
        stonkDataArray.push(stonkDataObj);
    });

    return stonkDataArray;
};

const buyStock = () => {};

const sellStock = () => {};

module.exports = {
    stonkData,
};
