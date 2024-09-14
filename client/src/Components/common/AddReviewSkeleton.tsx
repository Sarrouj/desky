"use client";

import { Skeleton } from "@/Components/ui/skeleton";
import { useState, useEffect } from "react";

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

const AddReviewSkeleton = ({
  Content,
  amount
}: {
  Content: any;
  amount: number;
}) => {
  const [Language, setLanguage] = useState("fr");

  // Language
  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "en"; 
    setLanguage(language);
  }, [Language]);

  let skeleton = [];

  for (let i = 0; i < amount; i++) {
    skeleton.push(
      <TableRow>
        <TableCell className="text-center">
          <Skeleton className="h-4 w-32" />
        </TableCell>
        <TableCell className="text-center">
          <Skeleton className="h-4 w-32 inline-block" />
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
      </TableRow>
    );
  }

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-secondaryDarkBlue text-lg lg:text-xl">
                {Content("Title")}
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {Content("Description")}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="">
                <TableRow className="hover:bg-white">
                  <TableHead>{Content("OfferName")}</TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {Content("DepositorName")}
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("DepositorNameDesc1")} <br />
                          {Content("DepositorNameDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("Date")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("DateTooltip")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>

                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("Estimate")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("Estimate")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("AddReview")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("AddReviewNameDesc1")} <br />
                          {Content("AddReviewNameDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{skeleton}</TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AddReviewSkeleton;
