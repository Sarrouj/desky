"use client";

import { Skeleton } from "@/Components/ui/skeleton"
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/Components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";

import { Tabs, TabsContent } from "@/Components/ui/tabs";

import Link from "next/link";

// Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";

const BidsListSkeleton = ({
  Content,
  seeMore,
  amount
}: {
  Content: any;
  seeMore: boolean;
  amount : number
}) => {
  const { data: session } = useSession();
  const user_id = session ? session.user?.id : null;
  const [Language, setLanguage] = useState("fr");
  
  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  let skeleton = [];

  for(let i = 0; i < amount ; i++){
    skeleton.push(<TableRow className="">
        <TableCell className="text-center">
            <Skeleton className="h-4 w-72" />
        </TableCell>
        <TableCell className="text-center">
            <Skeleton className="h-4 w-32 inline-block" />
        </TableCell>
        <TableCell className="text-center">
            <Skeleton className="h-4 w-14 inline-block" />
        </TableCell>
        <TableCell className="text-center  ">
            <Skeleton className="h-4 w-14 inline-block" />
        </TableCell>
        <TableCell className="text-center ">
            <Skeleton className="h-4 w-14 inline-block" />
        </TableCell>
        <TableCell className="text-center">
            <Skeleton className="h-4 w-14 inline-block" />
        </TableCell>
    </TableRow>);
  }

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>{Content("title")}</CardTitle>
              <CardDescription>{Content("Desc")}</CardDescription>
            </div>
            {seeMore ? (
              <Link href={`/${Language}/dashboard-d/manage-bids`}>
                <Button size={"sm"} className="h-7 gap-1 text-xs text-white">
                  See more...
                </Button>
              </Link>
            ) : null}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="">
                <TableRow className="hover:bg-white">
                  <TableHead>{Content("OfferName")}</TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("BidderName")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("BidderNameDesc1")} <br />{" "}
                          {Content("BidderNameDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("Rate")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("RateDesc1")} <br /> {Content("RateDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("Date")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("DateDesc1")} <br /> {Content("DateDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("Devi")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("DeviDesc1")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("AcceptBid")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("AcceptBidDesc1")} <br />{" "}
                          {Content("AcceptBidDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{skeleton}</TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BidsListSkeleton;