"use client";

import Image from "next/image";
import { StarFill } from "react-bootstrap-icons";
import { Download, Star } from "lucide-react";
import { Textarea } from "@/Components/ui/textarea";
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
import axios from "axios";

const ClosedBidderBidsList = ({ bids }: { bids: any }) => {
  const { data: session } = useSession();
  const [Language, setLanguage] = useState("fr");
  // Language
  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg") || '"fr"');
    setLanguage(lg);
  }, []);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    offer_id: string,
    depositor_id: string
  ) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please give at least a 1-star rating.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3001/rate/bidder/${depositor_id}/${offer_id}`,
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

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Bids List</CardTitle>
              <CardDescription>Your bids list</CardDescription>
            </div>
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
                    if (
                      bid[0].offer_state == "closed" &&
                      bid[0].depositor_review.filter(
                        (review: any) =>
                          review.bidder_id === session?.user.id &&
                          review.offer_id === bid[0].offer_id
                      )
                    ) {
                      return null;
                    }
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
                                      Add a review for the depositor after the
                                      completion of the work.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {/* rating */}
                                  <form
                                    onSubmit={(e) =>
                                      handleSubmit(
                                        e,
                                        bid[0].offer_id,
                                        bid[0].depositor_id
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
                                            onChange={(e) =>
                                              setRating(
                                                parseInt(e.target.value)
                                              )
                                            }
                                          />
                                          <StarFill
                                            width={30}
                                            height={30}
                                            className={`hover:cursor-pointer absolute inset-0 ${
                                              value <= rating
                                                ? "text-yellow-400"
                                                : "text-gray-400"
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
                                      onChange={(e) =>
                                        setReview(e.target.value)
                                      }
                                      value={review}
                                      className="ring-0 border-input focus:ring-0 focus-visible:ring-white focus-visible:ring-1"
                                      id="message"
                                      placeholder={"review"}
                                      maxLength={2000}
                                      required
                                    />
                                    <DialogFooter>
                                      <Button
                                        className="text-white bg-green-600 hover:bg-green-500 mt-4"
                                        type="submit"
                                      >
                                        Confirm
                                      </Button>
                                    </DialogFooter>
                                  </form>
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
