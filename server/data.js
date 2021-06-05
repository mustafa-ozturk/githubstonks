const stocknames = ["react", "angular", "vue"];

const githubData = {
    react: {
        logo: "/assets/react.svg",
        name: "React",
        symbol: "RCT",
        increase: 0,
        stars: 169000,
        forks: 34000,
        commits: 14173,
        priceHistory: [
            {
                $: 0,
            },
            {
                $: 58.9,
            },
        ],
    },
    angular: {
        logo: "/assets/angular.svg",
        name: "Angular",
        symbol: "AGR",
        increase: 0,
        stars: 73400,
        forks: 19300,
        commits: 21010,
        priceHistory: [
            {
                $: 0,
            },
            {
                $: 28.0,
            },
        ],
    },
    vue: {
        logo: "/assets/vue.svg",
        name: "Vue",
        symbol: "VUE",
        increase: 0,
        stars: 184000,
        forks: 29100,
        commits: 3175,
        priceHistory: [
            {
                $: 0,
            },
            {
                $: 61.34,
            },
        ],
    },
};

const guestTotalShares = {
    react: 0,
    angular: 0,
    vue: 0,
};

module.exports = { stocknames, githubData, guestTotalShares };
