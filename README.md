# Starlit Crowdfunding

A **full on-chain crowdfunding** platform. Create campaigns and back projects by providing your **Stablecoin**. Project owner needs to request for the approval of any budget withdrawal from backers. Backers can also request approval for project termination if it seems suspicious. All of the approvals are determined by voting of the backers weighted by each backer's contribution.


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