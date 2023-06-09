"use client";

import { BadgeCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

export default function ProfileVerifiedIndicator() {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <BadgeCheck className="ml-2 h-6 w-6 cursor-auto text-blue-500" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-normal">Verified user</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
