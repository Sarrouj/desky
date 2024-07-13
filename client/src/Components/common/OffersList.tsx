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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

const OffersList = ({ offers, user_id }: { offers: any; user_id: any }) => {
  const [Language, setLanguage] = useState("fr");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg"));
    if (lg) {
      setLanguage(lg);
    }
  }, []);

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle>Offers Verification</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-white">
                  <TableHead>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Offer Name</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          The name of the offers
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Depositor Name</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          The name of the depositor <br />
                          that posted that offer
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>date of post</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          The date that the offer was posted
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Accept</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          Accept the offer as a valid offer
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>Refuse</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          Refuse the offer, <br />
                          and add a message of the reason
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offers &&
                  offers.map((offer: any, index: number) => {
                    const handleAccept = async () => {
                      await axios.put(
                        `http://localhost:3001/admin/offer/verify/${offer._id}`,
                        {
                          user_id,
                        }
                      );
                      window.location.reload();
                    };
                    const handleRefuse = () => {
                      axios.put(
                        `http://localhost:3001/admin/offer/refuse/${offer._id}`,
                        {
                          user_id,
                          message,
                        }
                      );
                    };
                    return (
                      <TableRow
                        className="cursor-pointer"
                        key={`${offer.offer_title}-${index}`}
                      >
                        <TableCell
                          onClick={() => {
                            window.location.href = `/${Language}/Dashboard-A/Offers-verification/${offer._id}`;
                          }}
                        >
                          {offer.offer_title}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            window.location.href = `/${Language}/Dashboard-A/Offers-verification/${offer._id}`;
                          }}
                          className="text-center"
                        >
                          {offer.depositor_name}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            window.location.href = `/${Language}/Dashboard-A/Offers-verification/${offer._id}`;
                          }}
                          className="text-center"
                        >
                          {new Date(offer.offer_DoP).toLocaleDateString(
                            "en-CA"
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger
                                onClick={handleAccept}
                                className="h-6 rounded-full text-white text-xs px-2 bg-green-600 hover:bg-green-500"
                              >
                                accept
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="text-xs font-sm"
                              >
                                Accept the offer
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-center">
                          <TooltipProvider>
                            <Dialog>
                              <DialogTrigger>
                                <Tooltip>
                                  <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-red-600 hover:bg-red-500 px-2">
                                    Refuse
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="text-xs font-sm"
                                  >
                                    Refuse the offer
                                  </TooltipContent>
                                </Tooltip>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Refuse Message</DialogTitle>
                                  <DialogDescription>
                                    Write a message describing the reason for
                                    refusing the offer.
                                  </DialogDescription>
                                </DialogHeader>
                                <textarea
                                  name="message"
                                  id="message"
                                  className="border border-gray-400 rounded-md p-2 w-full"
                                  onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <DialogFooter>
                                  <Button
                                    className="text-white  bg-red-600 hover:bg-red-500 "
                                    onClick={handleRefuse}
                                    type="submit"
                                  >
                                    Confirm
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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

export default OffersList;
