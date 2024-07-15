"use client";

import Image from "next/image";
import { StarFill } from "react-bootstrap-icons";
import { Download, Star } from "lucide-react";
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const ClosedBidderBidsList = ({
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
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Add Review</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          Submit a review for the depositor <br />
                          after the completion of the work.
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
                        <TableCell className="text-center">
                          {bid[0].offer_state == "closed" ? (
                            <TooltipProvider>
                              <Dialog>
                                <DialogTrigger>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Button className="h-6 rounded-full text-white text-xs bg-green-600 hover:bg-green-500">
                                        Review
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="top"
                                      className="text-xs font-sm "
                                    >
                                      add a review
                                    </TooltipContent>
                                  </Tooltip>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="font-bold text-2xl text-primary text-center">
                                      Review
                                    </DialogTitle>
                                    <DialogDescription className="text-center">
                                      This action cannot be undone. This will
                                      permanently delete your account and remove
                                      your data from our servers.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {/* rating */}
                                  <div className="flex align-middle justify-center gap-5 relative mb-5">
                                    <div className="relative">
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={1}
                                        className="opacity-0 absolute inset-0 w-full h-full"
                                      />
                                      <StarFill className="text-yellow-400 absolute inset-0" />
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={2}
                                        className="opacity-0 absolute inset-0 w-full h-full"
                                      />
                                      <StarFill className="text-yellow-400 absolute inset-0" />
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={3}
                                        className="opacity-0 absolute inset-0 w-full h-full"
                                      />
                                      <StarFill className="absolute inset-0" />
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={4}
                                        className="opacity-0 absolute inset-0 w-full h-full"
                                      />
                                      <StarFill className="absolute inset-0" />
                                    </div>
                                    <div className="relative">
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={5}
                                        className="opacity-0 absolute inset-0 w-full h-full"
                                      />
                                      <StarFill className="absolute inset-0" />
                                    </div>
                                  </div>
                                  <textarea
                                    name="message"
                                    id="message"
                                    className="border border-gray-400 rounded-md p-2 w-full"
                                  ></textarea>
                                  <DialogFooter>
                                    <Button
                                      className="text-white  bg-red-600 hover:bg-red-500 "
                                      type="submit"
                                    >
                                      Confirm
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TooltipProvider>
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button className="h-6 rounded-full text-white text-xs bg-gray-300 hover:bg-gray-200">
                                    Review
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="text-xs font-sm"
                                >
                                  you can add a review <br /> if the offer is
                                  closed
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
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

export default ClosedBidderBidsList;
