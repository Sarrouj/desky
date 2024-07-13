"use client";

import { useState, useEffect } from "react";
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

import { StarIcon } from "lucide-react";

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

  const getBidID = useBoundStore((state) => state.getBidID);
  const getUserID = useBoundStore((state) => state.getUserID);
  const putCompleteOffer = useBoundStore((state) => state.putCompleteOffer);

  function handleAccept(e: any){
    e.preventDefault();
    putCompleteOffer();
  };

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
                {dBids && Object.keys(dBids).map((offerTitle: string) => {
                    const bidsToDisplay = limit ? dBids[offerTitle].slice(0, 4) : dBids[offerTitle];
                    return bidsToDisplay.map((bid: any, index: number) => {
                      const averageRating = bid.bidder.bidder_review && bid.bidder.bidder_review.length > 0
                          ? ( bid.bidder.bidder_review.reduce((acc: number, review: any) => acc + review.rating, 0) / bid.bidder.bidder_review.length
                            ).toFixed(1)
                          : "N/A";
                      getBidID(bid.bid_id);
                      getUserID(user_id);                         
 
                      return (
                        <TableRow
                          className="cursor-pointer"
                          key={`${offerTitle}-${index}`}
                        >
                          <Dialog>
                            <DialogTrigger asChild>
                              <TableCell>{offerTitle}</TableCell>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <DialogHeader>
                                <DialogTitle className="pb-6 border-b text-lg">Reviews History <span className="text-primary">(3)</span></DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col gap-10 h-72  pr-5 overflow-y-auto">
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <TableCell className="text-center">
                              <div className="font-medium">
                                {bid.bidder.bidder_name}
                              </div>
                              <div className="hidden text-sm text-muted-foreground md:inline">
                                {bid.bidder.bidder_email}
                              </div>
                            </TableCell>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <DialogHeader>
                                <DialogTitle className="pb-6 border-b text-lg">Reviews History <span className="text-primary">(3)</span></DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col gap-10 h-72  pr-5 overflow-y-auto">
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Dialog>
                            <DialogTrigger asChild>
                              <TableCell className="text-center">
                              {averageRating}
                              </TableCell>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[900px] p-8 ">
                              <DialogHeader>
                                <DialogTitle className="pb-6 border-b text-lg">Reviews History <span className="text-primary">(3)</span></DialogTitle>
                              </DialogHeader>
                              <div className="flex flex-col gap-10 h-72  pr-5 overflow-y-auto">
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center">
                                    <h3 className="font-semibold">Sarrouj Zaid</h3>
                                    <h3 className="text-neutral-500 text-sm">Jan, 11</h3>
                                  </div>
                                  <div className="flex items-center gap-[2px]">
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                    <StarIcon className="text-primary" size={18}/>
                                  </div>
                                  <div className="mt-2">
                                    <h1 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h1>
                                    <p className="text-sm">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, deserunt facilis placeat eveniet nam officia itaque ut excepturi non nostrum.</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <TableCell className="text-center">
                            {new Date(bid.applyDate).toLocaleDateString(
                              "en-CA"
                            )}
                          </TableCell>
                          <TableCell className="flex justify-center items-center">
                            <a
                              target="_blank"
                              href={`http://localhost:3001/uploads/${bid.estimate}`}
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
