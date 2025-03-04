"use server";

import { connectToTemporal } from "../../lib/temporal";
const bidWorkflow = "car";

export async function startAuction(item: string) {
  const client = await connectToTemporal();

  client.workflow.start("AuctionWorkflow", {
    workflowId: item,
    taskQueue: "auction",
  });
}
