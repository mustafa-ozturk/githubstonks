const githubData = [
    {
        logo: "/assets/react.svg",
        name: "React",
        symbol: "RCT",
        increase: 0,
        stars: 169000,
        forks: 34000,
        commits: 14173,
        totalBoughtShares: 0,
        priceHistory: [
            {
                Price: 0,
            },
            {
                Price: 58.9,
            },
        ],
    },
    {
        logo: "/assets/angular.svg",
        name: "Angular",
        symbol: "AGR",
        increase: 0,
        stars: 73400,
        forks: 19300,
        commits: 21010,
        totalBoughtShares: 0,
        priceHistory: [
            {
                Price: 0,
            },
            {
                Price: 28.0,
            },
        ],
    },
    {
        logo: "/assets/vue.svg",
        name: "Vue",
        symbol: "VUE",
        increase: 0,
        stars: 184000,
        forks: 29100,
        commits: 3175,
        totalBoughtShares: 0,
        priceHistory: [
            {
                Price: 0,
            },
            {
                Price: 61.34,
            },
        ],
    },
];
const initialSharePrice = (stockname) => {
    githubData.find((e) => {
        if (e.name === stockname) {
            return e.stars * 0.0003 + e.forks * 0.0002 + e.commits * 0.0001;
        }
    });
};

const sharePriceAfterUserMarket = (stockname) => {
    githubData.find((e) => {
        if (e.name === stockname) {
            return initialSharePrice(stockname) + e.totalBoughtShares * 0.001;
        }
    });
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
    const stonkDataArray = githubData.map((elem, index) => {
        return {
            _id: index,
            logo: elem.logo,
            name: elem.name,
            symbol: elem.symbol,
            price: sharePriceAfterUserMarket(elem),
            increasePrice: dollarIncreaseFromInitialPrice(elem),
            increasePercent: percentIncreaseFromInitialPrice(elem),
            stars: elem.stars,
            forks: elem.forks,
            commits: elem.commits,
            totalBoughtShares: elem.totalBoughtShares,
            priceHistory: elem.priceHistory,
        };
    });

    return stonkDataArray;
};

module.exports = {
    stonkData,
};
