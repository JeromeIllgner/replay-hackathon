import { getBids } from "./actions";
import { HackathonBidding } from "../components/bidding";

export default async function Home({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item } = await params;
  const stats = await getBids(item);
  return (
    <HackathonBidding
      bids={stats.previousBids.filter((i) => i.isValid)}
      hasAuctionEnded={stats.state === "COMPLETED"}
      item={item}
    />
  );
}
