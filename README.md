<div align="center">
<img align="center" width="100" height="100" src="client/public/ghs.png">
<h1>GitHubStonks</h1>

</div>

## What is githubstonks ?

<a href="https://githubstonks.com/" target="_blank">githubstonks.com</a>

Githubstonks is a stock market game where the stocks are popular GitHub repositories. You can buy and sell repo's like React, Node, and more.

---

> NOTE_0: GITHUBSTONKS is still under development which means user data and stonk data will be reset many times, if you encounter a bug or have a suggestion/question please submit an issue or join our discord server

### [Join my Discord server for questions/discussions/suggestions/reporting bugs](https://discord.gg/n7uR5CbM2u)

---

## "You should add this repo to the game"

Create an issue with a link to the repo you want me to add, and I might add it :)

## How are the share prices calculated ?

`intial price = stars * 0.0003 + forks * 0.0002 + commits * 0.0001`

The price of the stonks go up and down based on the total shares bought of that stonk.

`marketprice = total shares bought * 0.00001`

`final price = initial price + market price`

---

## Contributions

GitHubStonks is open to contributions, but I recommend creating an issue first to let me know what you are working on that way we don't overwrite each other.

## How to run locally (dev environment)

Frontend (React.js)

1. `cd client`
2. `yarn install`
3. `yarn start`

if you want to fetch the hosted api instead of localhost
go to `client/.env` and change localhost to `https://api.githubstonks.com/`

Backend (Node, Express, MongoDB)

1. create a `.env` file in `/server` and put your mongoURI, github client id, github client secret, and github personal access token.

> when generating a personal access token from github you need to enable the public_repo scope

```
MONGO_URI=
CLIENT_ID=
CLIENT_SECRET=
PERSONAL_ACCESS_TOKEN=
```

2. `cd server`
3. `yarn install`
4. `yarn start:dev`

if you have any questions about running the code locally join our discord server !

# Api doc

api link: https://api.githubstonks.com/

## login/auth

| METHOD | path                    |
| ------ | ----------------------- |
| GET    | /api/user/signin        |
| GET    | /oauth-callback         |
| POST   | /api/user/auth          |
| DELETE | /api/:id/delete-session |

## data

| METHOD | path             |
| ------ | ---------------- |
| GET    | /api/stonkData   |
| GET    | /api/leaderboard |
| GET    | /api/:id/info    |

## buy/sell

| METHOD | path          |
| ------ | ------------- |
| POST   | /api/:id/buy  |
| POST   | /api/:id/sell |

proper api doc coming soon
