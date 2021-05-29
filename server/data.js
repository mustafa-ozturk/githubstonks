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
    },
    angular: {
        logo: "/assets/angular.svg",
        name: "Angular",
        symbol: "AGR",
        increase: 0,
        stars: 73400,
        forks: 19300,
        commits: 21010,
    },
    vue: {
        logo: "/assets/vue.svg",
        name: "Vue",
        symbol: "VUE",
        increase: 0,
        stars: 184000,
        forks: 29100,
        commits: 3175,
    },
};

const totalShares = {
    react: 0,
    angular: 0,
    vue: 0,
};

module.exports = { stocknames, githubData, totalShares };
