"use server";

import { connectToTemporal } from "../lib/temporal";

export async function getAuctions() {
  const auctions = [];
  try {
    const client = await connectToTemporal();
    const workflows = client.workflow.list({});

    for await (const auction of workflows) {
      auctions.push(auction);
    }
  } catch (e) {
    console.error(e);
  }

  return auctions;
}

export async function startAuction(item: string) {
  const client = await connectToTemporal();

  client.workflow.start("AuctionWorkflow", {
    workflowId: item,
    taskQueue: "auction",
  });
}
