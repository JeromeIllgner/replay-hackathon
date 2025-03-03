"use server";

import { client } from "../lib/temporal";

const bidWorkflow = "HackathonBidding";

export interface Bid {
  id: number;
  name: string;
  amount: number;
  timestamp: string;
}

export async function sendBid(name: string, bidAmount: number) {
  const handle = client.workflow.getHandle(bidWorkflow);
  handle.signal("bid", name, bidAmount);
}

export async function getBids(): Promise<Bid[]> {
  const handle = client.workflow.getHandle(bidWorkflow);
  return handle.query("getStats") as Promise<Bid[]>;
}
