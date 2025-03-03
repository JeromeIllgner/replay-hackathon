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
  const client = await connectToTemporal();
  const handle = client.workflow.getHandle(bidWorkflow);
  return handle.query("getStats") as Promise<Bid[]>;
}
