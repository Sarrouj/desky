import React from "react";

import { GanttChart, Home, CopyPlus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";

import Link from "next/link";

const BidderAside = ({
  Language,
  Content,
}: {
  Language: string | undefined;
  Content: any;
}) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href={`/${Language}`}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-white md:h-8 md:w-8 md:text-base"
        >
          <p className="transition-all group-hover:scale-110">D</p>
          <span className="sr-only">Acme Inc</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/${Language}/bidder-dashboard`}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 text-muted-foreground hover:text-foreground`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">{Content("Dashboard")}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{Content("Dashboard")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/${Language}/bidder-dashboard/my-bids`}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <GanttChart className="h-5 w-5" />
                <span className="sr-only">{Content("MyBids")}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{Content("MyBids")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/${Language}/bidder-dashboard/add-review`}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
              >
                <CopyPlus className="h-5 w-5" />
                <span className="sr-only">{Content("AddReview")}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{Content("AddReview")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default BidderAside;
