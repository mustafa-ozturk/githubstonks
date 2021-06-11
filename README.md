# GithubStonks

> NOTE: This was my final project for a full-stack web bootcamp, I only had 2 weeks~ to work on it. I'm planning on continuing to improve it. top priorities: cleaning up the code base/files,user authentication (the current one was rushed and has many flaws) and use the github api to get stars, forks, commit (I already have the code for this I just ran into rate limitting so I commented it out)

for any questions join my discord server or create an issue. [discord server link]

## What is githubstonks ?

Githubstonks is a simple stock market game where the stocks are popular github repositories. You can buy and sell popular repo's like React, Node and more.

## "You should add this repo to the game"

Create an issue with a link to the repo you wan't me to add and I might add it :)

## How are the share prices calculated ?

`stars * 0.0003 + forks * 0.0002 + commits * 0.0001`

[link to the code where the price is calculated]

---

## Contributing

Frontend dev setup:

1.
2.
3.

Full dev setup (frontend + backend)

1.
2.
3.

---

## to-do

-   website is not responsive
-

---

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
