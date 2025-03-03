"use server";

import { connectToTemporal } from "../../lib/temporal";
const bidWorkflow = "car";

export async function startAuction() {
  const client = await connectToTemporal();

  // client.workflow.start(bidWorkflow, {
  //   workflowId: bidWorkflow,
  //   taskQueue: "default",
  // });
}
