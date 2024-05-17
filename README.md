# Cypto Currency Price Tracker

## Overview

This app allows the user to track the price and market cap of several different Crypto Coins at once.

It also allows the user to get an in-depth look at the price changes in the last hour.

Note, however, that since it uses a free API by [Coin Gecko](https://www.coingecko.com/), it has a set limit rate.

## Features

- Select a coin to track from a dropdown menu from 10 of largest coins by market-cap
- Search for a coin by name or symbol (e.g., Bitcoin or BTC)
- Remove a coin from the select coins
- View an updated graph of the price changes from the last hour, with the highest and lowest prices being annotated

## Images

![normal-view](https://github.com/estevesnp/TW-Coding-Challenge/assets/147717227/3c4934ef-bc4a-4657-9025-360a6c6f0722)

![chart-view](https://github.com/estevesnp/TW-Coding-Challenge/assets/147717227/c761575f-3ddf-4b6a-bf37-0006d0f3502f)

## Dependencies

- NPM
- Node.js

## Tech-stack

- TypeScript
- React
- Next.js
- MaterialUI
- Chart.js

## How to install the app

Firstly, clone this repository.

Afterwards, cd to the root of the app and run the following commands:

```bash
npm install
npm run build
```

## How to run the app

To run the app, run:

```bash
npm start
```

By default, the project will run on `http://localhost:3000`.

To change the port, you can run `npm start -- --port PORT_NUM`, where PORT_NUM is your desired port.

You can run the app in development mode with `npm run dev`, but do note that local storage won't function properly.
