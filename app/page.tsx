import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuctions } from "./actions";
import { Rocket, Zap } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { StartAuction } from "./components/start_auction";

export default async function Home() {
  const auctions = await getAuctions();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Rocket className="h-8 w-8 text-purple-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Durable Bids 2025
            </h1>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-1">
          {/* Bid Submission Form */}
          <Card className="shadow-md border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Checkout our auctions
              </CardTitle>
              <CardDescription>
                Enjoy starting or bidding on one of our auctions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {auctions.map((auction) => (
                  <li
                    key={auction.runId}
                    className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">
                        {auction.workflowId.slice(0, 1).toUpperCase()}
                        {auction.workflowId.slice(1)}
                      </h2>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{auction.status.name}</Badge>
                        <Link
                          href={`/${auction.workflowId}`}
                          className={buttonVariants({ variant: "secondary" })}
                        >
                          View Auction
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
                <li
                  key={"new_auction"}
                  className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <StartAuction />
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
