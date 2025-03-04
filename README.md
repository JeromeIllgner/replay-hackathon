# Temporal Auction System – Hackathon 2025

This project was built during the 2025 Temporal Replay Conference Hackathon, where the cyan team developed an auctioning demo to showcase a workflow using signals, queries and a codec server for encryption in the Java SDK. The system manages bid submissions and tracks bid history in a reliable and fault tolerant way.

## Getting Started

First, run install the deps:

```bash
bun install
```

Then make sure your env file points to a valid temporal instance and there is a running worker and starter.
Visit the [https://github.com/tomwheeler/hackathon-auction](original repo) for instructions there.

You can view the example.env file for the env vars needed.

Lastly run the dev server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Also deployed on Vercel

You can view this demo on [https://replay-hackathon.vercel.app/](https://replay-hackathon.vercel.app/)

If it is no longer working it is likely because the temporal instance has terminated after the hackathon.

## Future improvements

- [] Show Auction Winner
- [] Add support to start new auctions
