"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { startAuction } from "./action";

export default function StartAuction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-4 md:p-8">
      <Button
        onClick={() => {
          startAuction();
        }}
      >
        Start Auction
      </Button>
    </div>
  );
}
