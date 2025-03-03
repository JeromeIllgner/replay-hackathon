import { getBids } from "./actions";
import { HackathonBidding } from "./components/bidding";

export default async function Home() {
  const stats = await getBids();
  return <HackathonBidding bids={stats.previousBids} />;
}
