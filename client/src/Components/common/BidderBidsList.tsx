"use client";

import { Download } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const BidderBidsList = ({
  seeMore,
  limit,
  bids,
}: {
  seeMore: boolean;
  limit: boolean;
  bids: any;
}) => {
  const { data: session } = useSession();
  const [Language, setLanguage] = useState("fr");
  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Bids List</CardTitle>
              <CardDescription>Your bids list</CardDescription>
            </div>
            {seeMore ? (
              <Link href={`/${Language}/Dashboard-B/My-Bids`}>
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
                  <TableHead>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Offer Name</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          the name of the offer
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Depositor Name</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          the name of the depositor <br /> who posted the offer
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Date</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          the date of the bid
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Estimate</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          estimate
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bids &&
                  bids.map((bid: any, index: number) => {
                    if (limit && index >= 4) return null;
                    return (
                      <TableRow key={`${bid.offer_title}-${index}`}>
                        <Link href={`/${Language}/offers/${bid[0].offer_id}`}>
                          <TableCell>{bid[0].offer_title}</TableCell>
                        </Link>
                        <TableCell className="text-center">
                          {bid[0].depositor_name}
                        </TableCell>
                        <TableCell className="text-center">
                          {new Date(bid[0].bid.date).toLocaleDateString(
                            "en-CA"
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <a
                            target="_blank"
                            href={`http://localhost:3001/uploads/${bid[0].bid.estimate}`}
                            className=" mt-2 text-primary hover:text-orange-600"
                          >
                            <Download
                              size={22}
                              className="inline-block text-primary hover:text-orange-600"
                            />
                          </a>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BidderBidsList;
