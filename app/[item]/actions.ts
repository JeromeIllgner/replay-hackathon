"use server";

import { connectToTemporal } from "../../lib/temporal";

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

export async function sendBid(name: string, bidAmount: number, item: string) {
  try {
    const client = await connectToTemporal();
    const handle = client.workflow.getHandle(item);
    handle.signal("bid", name, bidAmount);
  } catch (e) {
    console.error(e);
  }
}

export async function getBids(item: string): Promise<Stats> {
  try {
    const client = await connectToTemporal();
    const wf = client.workflow.getHandle(item);
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
