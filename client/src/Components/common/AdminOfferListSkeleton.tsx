"use client";

import { useState, useEffect } from "react";

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

import { Tabs, TabsContent } from "@/Components/ui/tabs";
import { Skeleton } from "../ui/skeleton";

// Tooltip
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";

const AdminOffersListSkeleton = ({ Content }: { Content: any }) => {
  const [Language, setLanguage] = useState("fr");
  // Language
  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; 
    setLanguage(language);
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
                          {Content("DepositorNameDesc1")} <br />{" "}
                          {Content("DepositorNameDesc2")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("datePost")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("datePostDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("Accept")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("AcceptDesc")}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>{Content("Refuse")}</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm ">
                          {Content("RefuseDesc1")} <br />{" "}
                          {Content("RefuseDesc2")}
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

export default AdminOffersListSkeleton;
