const Axios = require("axios");
const fetch = require("node-fetch");
// I would get this data from github but rate limiting and stuff...
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
        priceHistory: [{ "Price: $": 0 }],
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
        priceHistory: [{ "Price: $": 0 }],
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
        priceHistory: [{ "Price: $": 0 }],
    },
];

// thank you https://github.com/matthew-e-brown for helping with this (finding total commit count)
// const BASE_URL = "https://api.github.com";

// const myFetch = (url) =>
//     fetch(url, {
//         // github api requires a user-agent to avoid rate limit
//         headers: { "user-agent": "commit-counter" },
//     });

// const getCurrentCommitSHA = async (branchURL) => {
//     const branchData = await myFetch(branchURL).then((res) => res.json());
//     return branchData.commit.sha;
// };

// const getFirstCommitSHA = async (repoURL) => {
//     let response = await myFetch(`${repoURL}/commits`);

//     const link = response.headers.get("link") || response.headers.get("Link");

//     if (link) {
//         const firstPage = /<([^>]+)>; rel="last"/.exec(link)[1];
//         response = await myFetch(firstPage);
//     }

//     const firstCommit = (await response.json()).pop();
//     return firstCommit.sha;
// };

// const getCommitCount = async (...args) => {
//     let owner, repo;

//     if (args.length == 2) {
//         [owner, repo] = args;
//     } else if (args.length == 1) {
//         [owner, repo] = args[0].split("/");
//     } else {
//         throw new Error("Incorrect args, ('owner', 'repo') or ('owner/repo')");
//     }

//     const repoURL = `${BASE_URL}/repos/${owner}/${repo}`;

//     // Get default branch and branch URL
//     const branchURL = await myFetch(repoURL)
//         .then((res) => res.json())
//         .then(({ branches_url, default_branch }) => {
//             return branches_url.replace("{/branch}", `/${default_branch}`);
//         });

//     // Check what commit it's at
//     const currentSHA = await getCurrentCommitSHA(branchURL);

//     // Check what the first commit was
//     const firstSHA = await getFirstCommitSHA(repoURL);

//     const comp = await myFetch(
//         `${repoURL}/compare/${currentSHA}...${firstSHA}`
//     ).then((res) => res.json());

//     switch (comp.status) {
//         case "behind":
//             return comp.behind_by;
//         case "ahead":
//             return comp.ahead_by;
//     }
// };

// const ghStarsAndForks = async (link) => {
//     const data = await fetch(`https://api.github.com/${link}`);
//     const reactData = {
//         stars: data.stargazers_count,
//         forks: data.forks,
//     };
//     console.log(data);
//     return reactData;
// };

// getCommitCount("facebook/react").then((num) => console.log(num));
// ghStarsAndForks("facebook/react");

const stonkData = () => {
    const stonkDataArray = githubData.map((elem, index) => {
        return {
            _id: index,
            logo: elem.logo,
            name: elem.name,
            symbol: elem.symbol,
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
