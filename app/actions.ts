"use server";

import { connectToTemporal } from "../lib/temporal";

const bidWorkflow = "car";

export interface Bid {
  id: number;
  name: string;
  amount: number;
  timestamp: string;
}

export async function sendBid(name: string, bidAmount: number) {
  const client = await connectToTemporal();
  const handle = client.workflow.getHandle(bidWorkflow);
  handle.signal("bid", name, bidAmount);
}

export async function getBids(): Promise<Bid[]> {
  console.log(" test");
  const client = await connectToTemporal();
  const wf = client.workflow.getHandle(bidWorkflow);

  const bids = await wf.query("getStats");
  console.log("getBids", bids);

  return bids as Bid[];
}
