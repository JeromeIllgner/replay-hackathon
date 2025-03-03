"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, History, Trophy, Zap } from "lucide-react";
import { toast } from "sonner";
import { Bid, getBids, sendBid } from "../actions";

export default function HackathonBidding() {
  const [name, setName] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [bidHistory, setBidHistory] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  // Mock function to submit a bid
  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !bidAmount.trim()) {
      toast("Missing Information");
      return;
    }

    setIsLoading(true);

    try {
      const amount = Number.parseInt(bidAmount);
      await sendBid(name, amount);

      setBidHistory((prev) => [
        { id: 99, amount, name, timestamp: new Date().toISOString() },
        ...prev,
      ]);
      setBidAmount("");
      toast("Bid submitted! 🚀");
    } catch (e) {
      console.error(e);
      toast("Failed to submit bid. Please try again later.");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock function to fetch bid history
  const fetchBidHistory = async () => {
    setIsHistoryLoading(true);

    const bids = await getBids();

    setBidHistory(bids);

    setIsHistoryLoading(false);

    toast("Bid history loaded");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Rocket className="h-8 w-8 text-purple-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              HackBid 2025
            </h1>
          </div>
          <p className="text-gray-600">
            Support your favorite hackathon projects!
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Bid Submission Form */}
          <Card className="shadow-md border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Submit Your Bid
              </CardTitle>
              <CardDescription>
                Enter your name and bid amount to support a project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitBid} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="bidAmount" className="text-sm font-medium">
                    Bid Amount ($)
                  </label>
                  <Input
                    id="bidAmount"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Place Bid 🚀"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Bid History */}
          <Card className="shadow-md border-t-4 border-t-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  Bid Leaderboard
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchBidHistory}
                  disabled={isHistoryLoading}
                  className="flex items-center gap-1"
                >
                  <History className="h-4 w-4" />
                  {isHistoryLoading ? "Loading..." : "Refresh"}
                </Button>
              </div>
              <CardDescription>
                See who's supporting the hackathon projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bidHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <History className="h-12 w-12 mx-auto mb-2 opacity-30" />
                    <p>No bids yet. Be the first to support!</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {bidHistory.map((bid) => (
                      <li
                        key={bid.id}
                        className="p-3 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{bid.name}</p>
                            <p className="text-xs text-gray-500">
                              {bid.timestamp}
                            </p>
                          </div>
                          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
                            ${bid.amount}
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </CardContent>
            <CardFooter className="text-xs text-gray-500 justify-center">
              Top bidders will be recognized at the closing ceremony
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
