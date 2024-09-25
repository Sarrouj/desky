"use client";

import { Download } from "lucide-react";
import { Button } from "@/Components/ui/button";
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
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const BidderBidsList = ({
  seeMore,
  limit,
  bids,
  content,
}: {
  seeMore: boolean;
  limit: boolean;
  bids: any;
  content: any;
}) => {
  const { data: session } = useSession();
  const [Language, setLanguage] = useState("fr");
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
              <CardTitle>{content("Title")}</CardTitle>
              <CardDescription>{content("Description")}</CardDescription>
            </div>
            {seeMore ? (
              <Link href={`/${Language}/bidder-dashboard/my-bids`}>
                <Button size={"sm"} className="h-7 gap-1 text-xs text-white">
                  {content("SeeMore")}
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
                        <TooltipTrigger>{content("OfferName")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {content("OfferNameTooltip")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {content("DepositorName")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {content("DepositorNameTooltip1")} <br />{" "}
                          {content("DepositorNameTooltip2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{content("Date")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {content("DateTooltip")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{content("Estimate")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {content("Estimate")}
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
                            href={`${process.env.NEXT_PUBLIC_BackendURL}/uploads/${bid[0].bid.estimate}`}
                            className=" mt-2 text-primary hover:text-orange-600"
                          >
                            <Download
                              size={22}
                              className="inline-block text-primary hover:text-orange-600"
                            />
                          </a>
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

export default BidderBidsList;
