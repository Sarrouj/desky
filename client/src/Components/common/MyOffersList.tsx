"use client";

import { useState, useEffect } from "react";
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

// Components
import StatusTooltipContent from "./statusTooltipContent";
import OfferStatusValue from "./offerStatusValue";

// Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";
import axios from "axios";

import { useBoundStore } from "@/lib/store";

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
  const getDeleteOfferID = useBoundStore((state) => state.getDeleteOfferID);
  const getDeleteDepositorID = useBoundStore(
    (state) => state.getDeleteDepositorID
  );
  const deleteOffer = useBoundStore((state) => state.deleteOffer);
  const getHandleCompleteOfferID = useBoundStore(
    (state) => state.getHandleCompleteOfferID
  );
  const getHandleCompleteDepositorID = useBoundStore(
    (state) => state.getHandleCompleteDepositorID
  );
  const putCompleteDepositorOffer = useBoundStore((state) => state.putCompleteDepositorOffer);

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  function handleDelete(e: any) {
    e.preventDefault();
    deleteOffer();
  }

  function handleComplete(e: any) {
    e.preventDefault();
    putCompleteDepositorOffer();
 
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

                    getDeleteOfferID(offer._id);
                    getDeleteDepositorID(offer.depositor_id);
                    getHandleCompleteOfferID(offer._id);
                    getHandleCompleteDepositorID(offer.depositor_id);

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
                                <OfferStatusValue
                                  data={offer.offer_state}
                                  Content={Content}
                                />
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="text-xs font-sm "
                              >
                                <StatusTooltipContent
                                  data={offer}
                                  Content={Content}
                                />
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              {offer.offer_state !== "inProgress" ? (
                                <>
                                  <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-gray-200 px-2 ">
                                    {Content("Done")}
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="text-xs font-sm "
                                  >
                                    {Content("freezeCompleted1")} <br />{" "}
                                    {Content("freezeCompleted2")}
                                  </TooltipContent>
                                </>
                              ) : (
                                <>
                                  <TooltipTrigger
                                    className="h-6 rounded-full text-white text-xs bg-green-600 hover:bg-green-500 px-2"
                                    onClick={handleComplete}
                                  >
                                    {Content("Done")}
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="text-xs font-sm "
                                  >
                                    {Content("DoneDesc1")} <br />{" "}
                                    {Content("DoneDesc2")}
                                  </TooltipContent>
                                </>
                              )}
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              {(offer.offer_state !== "pending" &&
                                offer.offer_state !== "open") ||
                              offer.offer_apply.length > 0 ? (
                                <>
                                  <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-gray-200 px-2">
                                    {Content("Delete")}
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="text-xs font-sm "
                                  >
                                    {Content("CantDeleteDesc")}
                                  </TooltipContent>
                                </>
                              ) : (
                                <>
                                  <TooltipTrigger
                                    className="h-6 rounded-full text-white text-xs bg-red-600 hover:bg-red-500 px-2"
                                    onClick={handleDelete}
                                  >
                                    {Content("Delete")}
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="text-xs font-sm "
                                  >
                                    {Content("DeleteDesc1")} <br />{" "}
                                    {Content("DeleteDesc2")}
                                  </TooltipContent>
                                </>
                              )}
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
