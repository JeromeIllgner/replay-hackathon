"use server";

import { connectToTemporal } from "../lib/temporal";

export async function getAuctions() {
  let auctions = [];
  try {
    const client = await connectToTemporal();
    const workflows = client.workflow.list();

    for await (const auction of workflows) {
      auctions.push(auction);
    }
  } catch (e) {
    console.log("error encountered");
    console.error(e);
  }

  return auctions;
}

export async function startAuction(item: string) {
  console.log("starting auction for", item);
  try {
    const client = await connectToTemporal();

    await client.workflow.start("AuctionWorkflow", {
      workflowId: item,
      taskQueue: "auction",
    });
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
}
