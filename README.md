# Starlit Crowdfunding

A **Full on-chain crowdfunding** platform. Create campaigns and back projects by providing your **Stablecoin**. Project owner needs to request for the approval of any budget withdrawal from backers. Backers can also request approval for project termination if it seems suspicious. All of the approvals are determined by voting of the backers weighted by each backer's contribution.

# Prerequisites

1) You need metamask installed in your browswer.
2) Connect the metamask wallet to the web application when first accessing.
3) Don't forget to switch to Rinkeby testnet, if nothing shows up, try refreshing once.


# How to run

There are 2 ways to run this project, run with Docker container, or run locally (in development mode) using yarn command.

## Run with Docker

1) Build the Docker image from Dockerfile.
```
docker build --no-cache . -t starlit
```
2) Run Docker image.
```
docker run -p 3000:3000 starlit
```
3) Access the application on http://localhost:3000

## Run locally in development mode

1) Install dependencies.
```
yarn
```
2) Run project in development mode
```
yarn dev
```
3) Access the application on http://localhost:3000
