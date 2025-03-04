"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { startAuction } from "./action";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StartAuction() {
  const [item, setItem] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-4 md:p-8 w-full">
      <Card className="shadow-md border-t-4 border-t-purple-500 hover:shadow-lg transition-shadow max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Start a new auction
          </CardTitle>
          <CardDescription>Enter the item name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4">
            <Input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-xs"
            />
            <Button
              onClick={() => {
                startAuction(item);
              }}
            >
              Start Auction
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
