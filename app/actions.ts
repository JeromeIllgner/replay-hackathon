"use server";

import { connectToTemporal } from "../lib/temporal";

const bidWorkflow = "car";

export interface Bid {
  userId: string;
  amount: number;
  isValid: boolean;
  timestamp: number;
}

export interface Stats {
  auctionId?: string;
  state: "STARTED" | "COMPLETED";
  previousBids: Bid[];
}

export async function sendBid(name: string, bidAmount: number) {
  try {
    const client = await connectToTemporal();
    const handle = client.workflow.getHandle(bidWorkflow);
    handle.signal("bid", name, bidAmount);
  } catch (e) {
    console.error(e);
  }
}

export async function getBids(): Promise<Stats> {
  try {
    const client = await connectToTemporal();
    const wf = client.workflow.getHandle(bidWorkflow);
    const bids = await wf.query("getStats");
    return bids as Stats;
  } catch (e) {
    console.error(e);
  }

  return Promise.resolve({
    previousBids: [],
    state: "STARTED",
  });
}
