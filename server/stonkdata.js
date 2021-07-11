const fetch = require("node-fetch");
require("dotenv").config();

const githubData = [
    {
        logo: "/assets/react.svg",
        name: "React",
        owner: "facebook",
        symbol: "RCT",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/angular.svg",
        name: "Angular",
        owner: "angular",
        symbol: "AGLR",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/vue.svg",
        name: "Vue",
        owner: "vuejs",
        symbol: "VUE",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/node.svg",
        name: "Node",
        owner: "nodejs",
        symbol: "NODE",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/expressjs.png",
        name: "Express",
        owner: "expressjs",
        symbol: "EXSS",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/nest.svg",
        name: "Nest",
        owner: "nestjs",
        symbol: "NEST",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/linux.svg",
        name: "Linux",
        owner: "torvalds",
        symbol: "LNX",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/solana.svg",
        name: "Solana",
        owner: "solana-labs",
        symbol: "SOL",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/githubstonks.png",
        name: "GithubStonks",
        owner: "mustafa-ozturk",
        symbol: "STONKS",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/deno.svg",
        name: "Deno",
        owner: "denoland",
        symbol: "DENO",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/serenity.png",
        name: "Serenity",
        owner: "SerenityOS",
        symbol: "SOS",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
    {
        logo: "/assets/rust.svg",
        name: "Rust",
        owner: "rust-lang",
        symbol: "RUST",
        increase: 0,
        totalBoughtShares: 0,
        priceHistory: [{ "Price: $": 0 }],
    },
];

let cache = {};

// thank you https://github.com/matthew-e-brown for helping with this (finding total commit count)
const BASE_URL = "https://api.github.com";

const myFetch = (url) => {
    return fetch(url, {
        headers: {
            Authorization: `token ${process.env.PERSONAL_ACCESS_TOKEN}`,
        },
    });
};

const getCurrentCommitSHA = async (branchURL) => {
    const branchData = await myFetch(branchURL).then((res) => res.json());
    return branchData.commit.sha;
};

const getFirstCommitSHA = async (repoURL) => {
    let response = await myFetch(`${repoURL}/commits`);

    const link = response.headers.get("link") || response.headers.get("Link");

    if (link) {
        const firstPage = /<([^>]+)>; rel="last"/.exec(link)[1];
        response = await myFetch(firstPage);
    }

    const firstCommit = (await response.json()).pop();
    return firstCommit.sha;
};

const getCommitCount = async (...args) => {
    let owner, repo;

    if (args.length == 2) {
        [owner, repo] = args;
    } else if (args.length == 1) {
        [owner, repo] = args[0].split("/");
    } else {
        throw new Error("Incorrect args, ('owner', 'repo') or ('owner/repo')");
    }

    const repoURL = `${BASE_URL}/repos/${owner}/${repo}`;

    // Get default branch and branch URL
    const branchURL = await myFetch(repoURL)
        .then((res) => res.json())
        .then(({ branches_url, default_branch }) => {
            return branches_url.replace("{/branch}", `/${default_branch}`);
        });

    // Check what commit it's at
    const currentSHA = await getCurrentCommitSHA(branchURL);

    // Check what the first commit was
    const firstSHA = await getFirstCommitSHA(repoURL);

    const comp = await myFetch(
        `${repoURL}/compare/${currentSHA}...${firstSHA}`
    ).then((res) => res.json());

    switch (comp.status) {
        case "behind":
            return comp.behind_by;
        case "ahead":
            return comp.ahead_by;
    }
};

const ghStarsForksCommits = async (link) => {
    const data = await fetch(`https://api.github.com/repos/${link}`, {
        headers: {
            Authorization: `token ${process.env.PERSONAL_ACCESS_TOKEN}`,
        },
    })
        .then((res) => res.json())
        .then((json) => ({
            stars: json.stargazers_count,
            forks: json.forks,
        }));
    data.commits = await getCommitCount(link);
    console.log("fetched", link);
    return data;
};

const stonkData = async () => {
    const stonkDataArray = await Promise.all(
        githubData.map(async (elem, index) => {
            if (!cache[elem.name]) {
                cache[elem.name] = await ghStarsForksCommits(
                    `${elem.owner}/${elem.name}`
                );
            }
            return {
                _id: index,
                logo: elem.logo,
                name: elem.name,
                owner: elem.owner,
                symbol: elem.symbol,
                stars: cache[elem.name].stars,
                forks: cache[elem.name].forks,
                commits: cache[elem.name].commits,
                totalBoughtShares: elem.totalBoughtShares,
                priceHistory: elem.priceHistory,
            };
        })
    );
    return stonkDataArray;
};

setInterval(() => {
    cache = {};
    console.log("cache cleared");
}, 10000);

module.exports = {
    stonkData,
};
