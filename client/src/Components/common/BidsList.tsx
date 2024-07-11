"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
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

import Link from "next/link";

// Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";

const BidsList = ({
  Content,
  seeMore,
  limit,
  dBids,
}: {
  Content: any;
  seeMore: boolean;
  limit: boolean;
  dBids: any;
}) => {
  const { data: session } = useSession();
  const user_id = session ? session.user?.id : null;
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
              <TableBody>
                {dBids &&
                  Object.keys(dBids).map((offerTitle: string) => {
                    const bidsToDisplay = limit
                      ? dBids[offerTitle].slice(0, 5)
                      : dBids[offerTitle];
                    return bidsToDisplay.map((bid: any, index: number) => {
                      const averageRating =
                        bid.bidder.bidder_review &&
                        bid.bidder.bidder_review.length > 0
                          ? (
                              bid.bidder.bidder_review.reduce(
                                (acc: number, review: any) =>
                                  acc + review.rating,
                                0
                              ) / bid.bidder.bidder_review.length
                            ).toFixed(1)
                          : "N/A";

                      const handleAccept = async (e: any) => {
                        e.preventDefault();
                        const response = await axios.post(
                          `http://localhost:3001/accept/depositor/bid/${bid.bid_id}`,
                          { user_id }
                        );
                        if (response.data.success) {
                          window.location.reload();
                        }
                      };
                      return (
                        <TableRow
                          className="cursor-pointer"
                          key={`${offerTitle}-${index}`}
                        >
                          <TableCell>{offerTitle}</TableCell>
                          <TableCell className="text-center">
                            <div className="font-medium">
                              {bid.bidder.bidder_name}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {bid.bidder.bidder_email}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {averageRating}
                          </TableCell>
                          <TableCell className="text-center">
                            {new Date(bid.applyDate).toLocaleDateString(
                              "en-CA"
                            )}
                          </TableCell>
                          <TableCell className="flex justify-center items-center">
                            <a
                              target="_blank"
                              href={`http://localhost:3001/uploads/${bid.estimate}`}
                              className="font-extralight mt-2 text-primary hover:text-orange-600"
                            >
                              <Download
                                size={22}
                                className="font-extralight mt-2 text-primary hover:text-orange-600"
                              />
                            </a>
                          </TableCell>
                          <TableCell className="text-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    onClick={handleAccept}
                                    className="h-6 rounded-full text-white text-xs bg-green-600 hover:bg-green-500"
                                  >
                                    {Content("Accept")}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="text-xs font-sm "
                                >
                                  {Content("AcceptDesc1")} <br />{" "}
                                  {Content("AcceptDesc2")}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      );
                    });
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BidsList;
