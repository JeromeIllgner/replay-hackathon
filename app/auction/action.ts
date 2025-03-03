"use server";

import { client } from "../../lib/temporal";
const bidWorkflow = "HackathonBidding";

export function startAuction() {
  client.workflow.start(bidWorkflow, {
    workflowId: bidWorkflow,
    taskQueue: "hackathon",
  });
}
