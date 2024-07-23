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
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

// Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";

const OffersListSkeleton = ({
  Content,
  seeMore,
}: {
  Content: any;
  seeMore: boolean;
}) => {
  const [Language, setLanguage] = useState("fr");
  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  let arr = [];

  for (let i = 0; i < 9; i++) {
    arr.push(
      <TableRow>
        <TableCell className="text-center">
          <Skeleton className="h-4 w-72" />
        </TableCell>
        <TableCell className="text-center">
          <Skeleton className="h-4 w-32 inline-block" />
        </TableCell>
        <TableCell className="text-center">
          <Skeleton className="h-4 w-14 inline-block" />
        </TableCell>
        <TableCell className="text-center  ">
          <Skeleton className="h-4 w-14 inline-block" />
        </TableCell>
        <TableCell className="text-center ">
          <Skeleton className="h-4 w-14 inline-block" />
        </TableCell>
      </TableRow>
    );
  }

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
              <Button size={"sm"} className="text-xs text-white">
                {Content("AddOffer")}
              </Button>
            </Link>
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
              <TableBody>{arr}</TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default OffersListSkeleton;
