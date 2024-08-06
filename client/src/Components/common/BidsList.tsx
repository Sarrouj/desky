"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Download, Users } from "lucide-react";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import Image from "next/image";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { useBoundStore } from "@/lib/store";

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

  const putAcceptOffer = useBoundStore((state) => state.putAcceptOffer);
  const getBidID = useBoundStore((state) => state.getBidID);
  const getUserID = useBoundStore((state) => state.getUserID);

  function handleAccept(e: any) {
    e.preventDefault();
    putAcceptOffer();
  }

  useEffect(() => {
    if (limit) {
      dBids.slice(-5);
    }
  }, [limit, dBids]);

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-5 lg:px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-secondaryDarkBlue text-xl">
                {Content("title")}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {Content("Desc")}
              </CardDescription>
            </div>
            <div className="hidden sm:flex gap-2">
              <Link href={`/${Language}/Create-Offer`}>
                <Button size={"sm"} className="text-xs text-white">
                  {Content("AddOffer")}
                </Button>
              </Link>
              {seeMore ? (
                <Link href={`/${Language}/dashboard-d/manage-bids`}>
                  <Button size={"sm"} className="text-xs text-white">
                    {Content("SeeMore")}
                  </Button>
                </Link>
              ) : null}
            </div>
          </CardHeader>
          <CardContent>
            <Table className="min-w-[800px]">
              <TableHeader className="">
                <TableRow className="hover:bg-white">
                  <TableHead className="text-xs sm:text-sm">
                    {Content("OfferName")}
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs sm:text-sm">
                          {Content("BidderName")}
                        </TooltipTrigger>
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
                        <TooltipTrigger className="text-xs sm:text-sm">
                          {Content("Rate")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("RateDesc1")} <br /> {Content("RateDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs sm:text-sm">
                          {Content("Date")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("DateDesc1")} <br /> {Content("DateDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs sm:text-sm">
                          {Content("Devi")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("DeviDesc1")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs sm:text-sm">
                          {Content("AcceptBid")}
                        </TooltipTrigger>
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
                {dBids.map((bid: any, i: number) => {
                  if (bid.offer_state == "open") {
                    if (bid.bid_id) {
                      getBidID(bid.bid_id);
                      getUserID(user_id);
                    }
                    return (
                      <TableRow className="cursor-pointer" key={i}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <TableCell className="text-xs sm:text-sm">
                              {bid.offer_title}
                            </TableCell>
                          </DialogTrigger>
                          {bid.bidder_review.length > 0 ? (
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <DialogHeader>
                                <DialogTitle className="pb-6 border-b text-lg">
                                  {Content("ReviewsHistory")}{" "}
                                  <span className="text-primary">
                                    ({bid.bidder_review.length})
                                  </span>
                                </DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col gap-3 h-72 pr-5 overflow-y-auto">
                                {bid.bidder_review.map(
                                  async (review: any, index: number) => {
                                    try {
                                      const response = await axios.get(
                                        `http://localhost:3001/depositor/${review.depositor_id}`
                                      );
                                      const responseOffer = await axios.get(
                                        `http://localhost:3001/offer/${review.offer_id}`
                                      );
                                      const data = response.data.success;
                                      const dataOffer =
                                        responseOffer.data.success;
                                      return (
                                        <div
                                          key={index}
                                          className="border p-4 rounded-lg"
                                        >
                                          <div className="flex justify-between items-center">
                                            <h3 className="font-semibold">
                                              {data.depositor_name}{" "}
                                            </h3>
                                            <h3 className="text-neutral-500 text-sm">
                                              {new Date(
                                                review.date
                                              ).toLocaleString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                              })}
                                            </h3>
                                          </div>
                                          <div className="flex items-center gap-[2px]">
                                            {Array.from(
                                              { length: review.rating },
                                              (_, i) => (
                                                <Image
                                                  key={i}
                                                  src="/icons/Star.svg" // Adjust the path to your actual star icon
                                                  alt="Star Icon"
                                                  width={18} // Specify the width of the image
                                                  height={18} // Specify the height of the image
                                                />
                                              )
                                            )}
                                          </div>
                                          <div className="mt-2">
                                            <h1 className="text-lg font-semibold">
                                              {dataOffer.offer_title}
                                            </h1>
                                            <p className="text-sm">
                                              {review.text}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error fetching depositor details:",
                                        error
                                      );
                                      return null; // or handle error display
                                    }
                                  }
                                )}
                              </div>
                            </DialogContent>
                          ) : (
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <p>{Content("NoReviews")}</p>
                            </DialogContent>
                          )}
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <TableCell className="text-center">
                              <div className="font-medium text-xs sm:text-sm">
                                {bid.bidder_name}
                              </div>
                              <div className="hidden text-xs sm:text-sm text-muted-foreground md:inline">
                                {bid.bidder_type}
                              </div>
                            </TableCell>
                          </DialogTrigger>
                          {bid.bidder_review.length > 0 ? (
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <DialogHeader>
                                <DialogTitle className="pb-6 border-b text-lg">
                                  {Content("ReviewsHistory")}{" "}
                                  <span className="text-primary">
                                    ({bid.bidder_review.length})
                                  </span>
                                </DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col gap-3 h-72 pr-5 overflow-y-auto">
                                {bid.bidder_review.map(
                                  async (review: any, index: number) => {
                                    try {
                                      const response = await axios.get(
                                        `http://localhost:3001/depositor/${review.depositor_id}`
                                      );
                                      const responseOffer = await axios.get(
                                        `http://localhost:3001/offer/${review.offer_id}`
                                      );
                                      const data = response.data.success;
                                      const dataOffer =
                                        responseOffer.data.success;
                                      return (
                                        <div
                                          key={index}
                                          className="border p-4 rounded-lg"
                                        >
                                          <div className="flex justify-between items-center">
                                            <h3 className="font-semibold">
                                              {data.depositor_name}{" "}
                                            </h3>
                                            <h3 className="text-neutral-500 text-sm">
                                              {new Date(
                                                review.date
                                              ).toLocaleString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                              })}
                                            </h3>
                                          </div>
                                          <div className="flex items-center gap-[2px]">
                                            {Array.from(
                                              { length: review.rating },
                                              (_, i) => (
                                                <Image
                                                  key={i}
                                                  src="/icons/Star.svg" // Adjust the path to your actual star icon
                                                  alt="Star Icon"
                                                  width={18} // Specify the width of the image
                                                  height={18} // Specify the height of the image
                                                />
                                              )
                                            )}
                                          </div>
                                          <div className="mt-2">
                                            <h1 className="text-lg font-semibold">
                                              {dataOffer.offer_title}
                                            </h1>
                                            <p className="text-sm">
                                              {review.text}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error fetching depositor details:",
                                        error
                                      );
                                      return null; // or handle error display
                                    }
                                  }
                                )}
                              </div>
                            </DialogContent>
                          ) : (
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <p>{Content("NoReviews")}</p>
                            </DialogContent>
                          )}
                        </Dialog>
                        <Dialog>
                          <DialogTrigger asChild>
                            <TableCell className="text-center text-xs sm:text-sm">
                              {bid.bidder_avgRating}
                            </TableCell>
                          </DialogTrigger>
                          {bid.bidder_review.length > 0 ? (
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <DialogHeader>
                                <DialogTitle className="pb-6 border-b text-lg">
                                  {Content("ReviewsHistory")}{" "}
                                  <span className="text-primary">
                                    ({bid.bidder_review.length})
                                  </span>
                                </DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col gap-3 h-72 pr-5 overflow-y-auto">
                                {bid.bidder_review.map(
                                  async (review: any, index: number) => {
                                    try {
                                      const response = await axios.get(
                                        `http://localhost:3001/depositor/${review.depositor_id}`
                                      );
                                      const responseOffer = await axios.get(
                                        `http://localhost:3001/offer/${review.offer_id}`
                                      );
                                      const data = response.data.success;
                                      const dataOffer =
                                        responseOffer.data.success;
                                      return (
                                        <div
                                          key={index}
                                          className="border p-4 rounded-lg"
                                        >
                                          <div className="flex justify-between items-center">
                                            <h3 className="font-semibold">
                                              {data.depositor_name}{" "}
                                            </h3>
                                            <h3 className="text-neutral-500 text-sm">
                                              {new Date(
                                                review.date
                                              ).toLocaleString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                              })}
                                            </h3>
                                          </div>
                                          <div className="flex items-center gap-[2px]">
                                            {Array.from(
                                              { length: review.rating },
                                              (_, i) => (
                                                <Image
                                                  key={i}
                                                  src="/icons/Star.svg" // Adjust the path to your actual star icon
                                                  alt="Star Icon"
                                                  width={18} // Specify the width of the image
                                                  height={18} // Specify the height of the image
                                                />
                                              )
                                            )}
                                          </div>
                                          <div className="mt-2">
                                            <h1 className="text-lg font-semibold">
                                              {dataOffer.offer_title}
                                            </h1>
                                            <p className="text-sm">
                                              {review.text}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Error fetching depositor details:",
                                        error
                                      );
                                      return null; // or handle error display
                                    }
                                  }
                                )}
                              </div>
                            </DialogContent>
                          ) : (
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <p>{Content("NoReviews")}</p>
                            </DialogContent>
                          )}
                        </Dialog>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {new Date(bid.bid_Date).toLocaleDateString("en-CA")}
                        </TableCell>
                        <TableCell className="flex justify-center items-center">
                          <a
                            target="_blank"
                            href={`http://localhost:3001/uploads/${bid.bid_est}`}
                            className=" mt-2 text-primary hover:text-orange-600"
                          >
                            <Download
                              size={22}
                              className=" text-primary hover:text-orange-600"
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
                  }
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
