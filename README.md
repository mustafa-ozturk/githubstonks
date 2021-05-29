# GithubStonks

-   What is github stonks ?

Github Stonks is a simple stock market simulator(game) where the "stocks" are Github repositories.

-   How are the share prices calculated ?

`stars * 0.0003 + forks * 0.0002 + commits * 0.0001`

When a user buys a share the price goes up by 0.0001$

When a user sells a share the price goes down by 0.0001$

There is unlimited amount of shares (might change)

---

## Api doc

Get - /api/cards

Response:
Logo
Name
Symbol
Price
Increase price
Increase percent
stars
forks
commits
