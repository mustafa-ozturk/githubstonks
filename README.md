<div align="center">
<img align="center" width="100" height="100" src="client/public/ghs.png">
<h1>GitHubStonks</h1>
</div>

> NOTE_0: This is my full-stack web bootcamp final project, I only had 2 weeks to work on it (though I did start couple days early). There is still a lot of things to do, Top priorities: cleaning up the code base/files, user authentication (the current one was rushed and has many flaws) and use the github api to get stars, forks, commits (I already have the code for this I just ran into rate limitting so I commented it out)

> NOTE_1: GITHUBSTONKS is still under development which means user data and stonk data will be reset many times, if you encounter a bug or have a suggestion/question please submit an issue or join our discord server

### [Join my Discord server for questions/discussions/suggestions/reporting bugs](https://discord.gg/n7uR5CbM2u)

---

## What is githubstonks ?

Githubstonks is a simple stock market game where the stocks are popular github repositories. You can buy and sell popular repo's like React, Node and more.

## "You should add this repo to the game"

Create an issue with a link to the repo you wan't me to add and I might add it :)

## How are the share prices calculated ?

`intial price = stars * 0.0003 + forks * 0.0002 + commits * 0.0001`

the price of the stocks go up and down based on how many total shares were bought

`marketprice = total shares bought * 0.00001`

`price = initial price + market price`

## Github login says "Act on your Behalf"

This is bad wording from github the only data I use and request is public info (github id and username). There has been a lot of complaints about this to github but no changes yet.

<https://github.community/t/enable-you-to-trigger-actions-in-github/117938/12>

<https://news.ycombinator.com/item?id=26485844>

I only use github id and username.

[you can check for yourself here](https://github.com/mustafa-ozturk/githubstonks/blob/6ee4dd89c43f06e7d0d65832f6bba6f992840641/server/handlers.js#L92)

---

## Contributions

GitHubStonks is open to contributions, but I recommend creating an issue first to let me know what you are working on that way we don't overwrite each other.

more info on contributing coming soon

## How to run locally

coming soon

## to-do

-   website is not responsive
-   more coming soon

## Api doc

Get - /api/stonkInfo

Response:

```json
Logo
Name
Symbol
Price
Increase price
Increase percent
stars
forks
commits
```

proper api doc coming soon
