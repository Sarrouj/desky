"use client";

import { useState, useEffect } from "react";

import { Button } from "@/Components/ui/Button";
import {
  Card,
  CardContent,
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
} from "@/Components/ui/dialog";

import { Tabs, TabsContent } from "@/Components/ui/tabs";


// Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";
import axios from "axios";

const OffersList = ({Content, offers, user_id }: {Content:any, offers: any, user_id: any }) => {
  const [Language, setLanguage] = useState("fr");
  const [message, setMessage] = useState("");

 // Language
 useEffect(() => {
  const lg = localStorage.getItem("lg");
  const language = lg ? JSON.parse(lg) : "fr"; 
  setLanguage(language);
}, [Language]);

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-secondaryDarkBlue text-lg lg:text-xl">{Content("title")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="min-w-[800px]">
            <TableHeader className="">
                <TableRow className="hover:bg-white">
                  <TableHead className="text-xs md:text-sm ">{Content("OfferName")}</TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm ">{Content("DepositorName")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("DepositorNameDesc1")} <br /> {Content("DepositorNameDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm ">{Content("datePost")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("datePostDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm ">
                          {Content("Accept")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("AcceptDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm ">
                          {Content("Refuse")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("RefuseDesc1")} <br />  {Content("RefuseDesc2")}
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
                        `https://desky-2.onrender.com/admin/offer/verify/${offer._id}`,
                        {
                          user_id,
                        }
                      );
                      window.location.reload();
                    };

                    const handleRefuse = async () => {
                       await axios.put(
                        `https://desky-2.onrender.com/admin/offer/refuse/${offer._id}`,
                        {
                          user_id,
                          message,
                        }
                      );
                      window.location.reload();
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
                          className="text-xs md:text-sm "
                        >
                          {offer.offer_title}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            window.location.href = `/${Language}/Dashboard-A/Offers-verification/${offer._id}`;
                          }}
                          className="text-center text-xs md:text-sm "
                        >
                          {offer.depositor_name}
                        </TableCell>
                        <TableCell
                          onClick={() => {
                            window.location.href = `/${Language}/Dashboard-A/Offers-verification/${offer._id}`;
                          }}
                          className="text-center text-xs md:text-sm "
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
                                 {Content("AcceptCallToAction")}
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="text-xs font-sm"
                              >
                                 {Content("AcceptCallToActionDesc")}
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
                                    {Content("RefuseCalToAction")}
                                  </TooltipTrigger>
                                  <TooltipContent
                                    side="top"
                                    className="text-xs font-sm"
                                  >
                                    {Content("RefuseCalToActionDesc")}
                                  </TooltipContent>
                                </Tooltip>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle className="text-secondaryDarkBlue">{Content("RefuseMessage")}</DialogTitle>
                                  <DialogDescription className="text-xs lg:text-sm ">
                                  {Content("RefuseMessageDesc")}
                                  </DialogDescription>
                                </DialogHeader>
                                <textarea
                                  name="message"
                                  id="message"
                                  className="border border-gray-400 rounded-md p-2 w-full text-xs lg:text-sm "
                                  onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <DialogFooter>
                                  <Button
                                    className="text-white text-xs bg-primary hover:bg-orange-400 "
                                    onClick={handleRefuse}
                                    type="submit"
                                  >
                                    {Content("Send")}
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
