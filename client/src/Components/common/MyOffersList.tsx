"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

import { Badge } from "@/Components/ui/badge";
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
import axios from "axios";

const MyOffersList = ({
  Content,
  seeMore,
  dOffers,
}: {
  Content: any;
  seeMore: boolean;
  dOffers: any;
}) => {
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
                  <TableHead>{Content("offerName")}</TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("TotalBids")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("TotalBidsDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("Status")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("StatusDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    {Content("finished")}
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {Content("DeleteTitle")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("DeleteHeaderDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dOffers &&
                  dOffers.map((offer: any, index: number) => {
                    const totalBidsReceived = offer.offer_apply
                      ? offer.offer_apply.length
                      : 0;

                    const handleComplete = async (e: any) => {
                      e.preventDefault();
                      try {
                        await axios.put(
                          `http://localhost:3001/edit/offer/state/${offer._id}`,
                          {
                            offer_state: "closed",
                            user_id: offer.depositor_id,
                          }
                        );
                        window.location.reload();
                      } catch (error) {
                        console.log(error);
                      }
                    };

                    const handleDelete = async (e: any) => {
                      e.preventDefault();
                      try {
                        await axios.delete(
                          `http://localhost:3001/delete/offer/${offer._id}`,
                          {
                            data: {
                              user_id: offer.depositor_id,
                            },
                          }
                        );
                        window.location.reload();
                      } catch (error) {
                      }
                    };
                    return (
                      <TableRow
                        className="cursor-pointer"
                        key={`${offer.offer_title}-${index}`}
                      >
                        <TableCell>{offer.offer_title}</TableCell>
                        <TableCell className="text-center">
                          {totalBidsReceived}
                        </TableCell>
                        <TableCell className="text-center ">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="h-6 rounded-full border-2 text-xs  px-2">
                                {offer.offer_state}
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="text-xs font-sm "
                              >
                                {Content("DoneDesc1")} <br />{" "}
                                {Content("DoneDesc2")}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              {offer.offer_state !== "inProgress" ? (
                                <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-gray-300 px-2 ">
                                  {Content("Done")}
                                </TooltipTrigger>
                              ) : (
                                <TooltipTrigger
                                  className="h-6 rounded-full text-white text-xs bg-green-600 hover:bg-green-500 px-2"
                                  onClick={handleComplete}
                                >
                                  {Content("Done")}
                                </TooltipTrigger>
                              )}
                              <TooltipContent
                                side="top"
                                className="text-xs font-sm "
                              >
                                {Content("DoneDesc1")} <br />{" "}
                                {Content("DoneDesc2")}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              {(offer.offer_state !== "pending" &&
                                offer.offer_state !== "open") ||
                              offer.offer_apply.length > 0 ? (
                                <TooltipTrigger className="h-6 rounded-full text-white text-decoration-line: line-through text-xs bg-gray-400 hover:bg-gray-500 px-2">
                                  {Content("Delete")}
                                </TooltipTrigger>
                              ) : (
                                <TooltipTrigger
                                  className="h-6 rounded-full text-white text-xs bg-red-600 hover:bg-red-500 px-2"
                                  onClick={handleDelete}
                                >
                                  {Content("Delete")}
                                </TooltipTrigger>
                              )}
                              <TooltipContent
                                side="top"
                                className="text-xs font-sm "
                              >
                                {Content("DeleteDesc1")} <br />{" "}
                                {Content("DeleteDesc2")}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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

export default MyOffersList;
