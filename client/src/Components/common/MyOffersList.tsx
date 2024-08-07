"use client";

import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { StarFill } from "react-bootstrap-icons";
import { Textarea } from "@/Components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/Components/ui/dialog";

import axios from "axios";
import { useBoundStore } from "@/lib/store";
import { useSession } from "next-auth/react";

const MyOffersList = ({ Content, dOffers }: { Content: any; dOffers: any }) => {
  const { data: session } = useSession();
  const [Language, setLanguage] = useState("fr");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [error, setError] = useState<string>("");

  const getDeleteOfferID = useBoundStore((state) => state.getDeleteOfferID);
  const getDeleteDepositorID = useBoundStore((state) => state.getDeleteDepositorID);
  const deleteOffer = useBoundStore((state) => state.deleteOffer);
  const getHandleCompleteOfferID = useBoundStore((state) => state.getHandleCompleteOfferID);
  const getHandleCompleteDepositorID = useBoundStore((state) => state.getHandleCompleteDepositorID);
  const putCompleteDepositorOffer = useBoundStore((state) => state.putCompleteDepositorOffer);

  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg") || '"fr"');
    setLanguage(lg);
  }, []);

  const handleDelete = (offerId: any, depositorId: any) => {
    getDeleteOfferID(offerId);
    getDeleteDepositorID(depositorId);
    deleteOffer();
  };

  const handleComplete = async (
    e: React.FormEvent<HTMLFormElement>,
    offerId: any,
    bidderId: any,
    depositorId: any
  ) => {
    e.preventDefault();
    getHandleCompleteOfferID(offerId);
    getHandleCompleteDepositorID(depositorId);
    putCompleteDepositorOffer();
    if (rating === 0) {
      setError("Please give at least a 1-star rating.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3001/rate/depositor/${bidderId}/${offerId}`,
        {
          rating,
          text: review,
          user_id: session?.user.id,
        }
      );
      if (response.status === 200) {
        setRating(0);
        setReview("");
        setError("");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit the review. Please try again.");
    }
  };


  const handleCompleteOffer = (offerId: any, depositorId: any) => {
    getHandleCompleteOfferID(offerId);
    getHandleCompleteDepositorID(depositorId);
    putCompleteDepositorOffer();
  };

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-secondaryDarkBlue text-xl">
                {Content("title")}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {Content("Desc")}
              </CardDescription>
            </div>
            <Link href={`/${Language}/Create-Offer`}>
              <Button size="sm" className="text-xs text-white">
                {Content("AddOffer")}
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <Table className="min-w-[750px]">
              <TableHeader>
                <TableRow className="hover:bg-white">
                  <TableHead className="text-xs sm:text-sm">
                    {Content("offerName")}
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs sm:text-sm">
                          {Content("TotalBids")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("TotalBidsDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs sm:text-sm">
                          {Content("Status")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("StatusDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">
                    {Content("finished")}
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs sm:text-sm">
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
                    const totalBidsReceived = offer.offer_apply ? offer.offer_apply.length : 0;

                    return (
                      <TableRow className="cursor-pointer" key={`${offer.offer_title}-${index}`}>
                        <TableCell className="text-xs sm:text-sm">
                          {offer.offer_title}
                        </TableCell>
                        <TableCell className="text-center text-xs sm:text-sm">
                          {totalBidsReceived}
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="h-6 rounded-full border-2 text-xs px-2">
                                <OfferStatusValue
                                  data={offer.offer_state}
                                  Content={Content}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="text-xs font-sm ">
                                <StatusTooltipContent
                                  data={offer}
                                  Content={Content}
                                />
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          {offer.offer_state !== "inProgress" ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-gray-200 px-2 ">
                                  {Content("Done")}
                                </TooltipTrigger>
                                <TooltipContent side="top" className="text-xs font-sm ">
                                  {Content("freezeCompleted1")} <br />
                                  {Content("freezeCompleted2")}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <TooltipProvider>
                              <Dialog>
                                <DialogTrigger>
                                  <Tooltip>
                                    <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-green-600 hover:bg-green-500 px-2">
                                      {Content("Done")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">
                                      {Content("DoneDesc1")} <br />
                                      {Content("DoneDesc2")}
                                    </TooltipContent>
                                  </Tooltip>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="font-bold text-2xl text-primary text-center">
                                      Review
                                    </DialogTitle>
                                    <DialogDescription className="text-center">
                                      Add a review for the depositor after the
                                      completion of the work.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form
                                    onSubmit={(e) =>
                                      handleComplete(
                                        e,
                                        offer._id,
                                        offer.offer_apply[0].bidder_id,
                                        offer.depositor_id
                                      )
                                    }
                                  >
                                    <div className="flex align-middle justify-center gap-14 relative mb-12 mr-8">
                                      {[1, 2, 3, 4, 5].map((value) => (
                                        <label key={value} className="relative">
                                          <input
                                            type="radio"
                                            name="rating"
                                            value={value}
                                            className="opacity-0 absolute inset-0 w-full h-full hover:cursor-pointer"
                                            onChange={(e) => setRating(parseInt(e.target.value))}
                                          />
                                          <StarFill
                                            width={30}
                                            height={30}
                                            className={`hover:cursor-pointer absolute inset-0 ${
                                              value <= rating ? "text-yellow-400" : "text-gray-400"
                                            }`}
                                          />
                                        </label>
                                      ))}
                                    </div>
                                    {error && (
                                      <p className="text-red-500 text-center">
                                        {error}
                                      </p>
                                    )}
                                    <Textarea
                                      onChange={(e) => setReview(e.target.value)}
                                      value={review}
                                      className="ring-0 border-input focus:ring-0 focus-visible:ring-white focus-visible:ring-1"
                                      id="message"
                                      placeholder="review"
                                      maxLength={2000}
                                      required
                                    />
                                    <DialogFooter>
                                      <Button
                                        type="submit"
                                        className="text-white bg-green-600 hover:bg-green-500 mt-4"
                                      >
                                        Confirm
                                      </Button>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>
                            </TooltipProvider>
                          )}
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
                                  <TooltipContent side="top" className="text-xs font-sm ">
                                    {Content("CantDeleteDesc")}
                                  </TooltipContent>
                                </>
                              ) : (
                                <>
                                  <TooltipTrigger
                                    className="h-6 rounded-full text-white text-xs bg-red-600 hover:bg-red-500 px-2"
                                    onClick={() =>
                                      handleDelete(
                                        offer._id,
                                        offer.depositor_id
                                      )
                                    }
                                  >
                                    {Content("Delete")}
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="text-xs font-sm ">
                                    {Content("DeleteDesc1")} <br />
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
