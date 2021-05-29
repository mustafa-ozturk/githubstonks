const { stocknames, githubData, totalShares } = require("./data");

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
        githubData[stockname].stars * 0.0003 +
        githubData[stockname].forks * 0.0002 +
        githubData[stockname].commits * 0.0001
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

const cardInfo = () => {
    let cardArray = [];

    stocknames.forEach((elem) => {
        const cardObj = {
            logo: githubData[elem].logo,
            name: githubData[elem].name,
            symbol: githubData[elem].symbol,
            price: sharePriceAfterUserMarket(elem),
            increasePrice: dollarIncreaseFromInitialPrice(elem),
            increasePercent: percentIncreaseFromInitialPrice(elem),
            stars: githubData[elem].stars,
            forks: githubData[elem].forks,
            commits: githubData[elem].commits,
        };
        cardArray.push(cardObj);
    });

    return cardArray;
};

module.exports = {
    cardInfo,
};
