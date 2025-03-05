"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { startAuction } from "../actions";

export function StartAuction() {
  const [item, setItem] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-row gap-4 justify-end">
      <Input value={item} onChange={(e) => setItem(e.target.value)} />
      <Button
        onClick={() => {
          startAuction(item);
          router.push(`/${item}`);
          toast("Auction started! 🚀");
        }}
      >
        Start New Auction
      </Button>
    </div>
  );
}
