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
import AEDetails from "@/Components/common/AEDetails";
import CompanyDetails from "@/Components/common/CompanyDetails";
import { Tabs, TabsContent } from "@/Components/ui/tabs";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";
import axios from "axios";

const NewUsers = ({
  AE,
  Company,
  user_id,
}: {
  AE: any;
  Company: any;
  user_id: any;
}) => {
  const [Language, setLanguage] = useState("fr");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg") as string);
    if (lg) {
      setLanguage(lg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = async (type: string, id: string) => {
    try {
      await axios.put(`http://localhost:3001/admin/verify/${type}/${id}`, {
        user_id,
      });
      window.location.reload();
    } catch (Error) {
      console.log(Error);
    }
  };

  const handleRefuse = async (type: string, id: string) => {
    try {
      await axios.put(`http://localhost:3001/admin/refuse/${type}/${id}`, {
        user_id,
        message,
      });
      window.location.reload();
    } catch (Error) {
      console.log(Error);
    }
  };

  return (
    <Tabs defaultValue="week">
      <TabsContent value="week">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-4 md:px-7 flex flex-row justify-between">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-base lg:text-lg text-secondaryDarkBlue">
                Verify New User
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow className="hover:bg-white">
                  <TableHead>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm lg:text-base">User Name</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          The name of the user
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm lg:text-base">Phone Number</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          the phone number of the user
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm lg:text-base">AEC or RC</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          Auto Entrepreneur Card or Company RC
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm lg:text-base">Accept</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          Accept the offer as a valid offer
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm lg:text-base">Refuse</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          Refuse the offer, <br />
                          and add a message of the reason
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                  <TableHead className="text-start">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-xs md:text-sm lg:text-base">See Details</TooltipTrigger>
                        <TooltipContent side="top" className="text-xs font-sm">
                          See User Details
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AE &&
                  AE.map((ae: any, index: number) => (
                    <TableRow
                      className="cursor-pointer"
                      key={`${ae.bidder_name}-${index}`}
                    >
                      <TableCell className="text-xs md:text-sm lg:text-base">
                        {ae.bidder_name || ae.depositor_name}
                      </TableCell>

                      <TableCell className="text-center text-xs md:text-sm lg:text-base">
                        {ae.aeInfo.AE_phoneNumber}
                      </TableCell>
                      <TableCell className="text-center text-xs md:text-sm lg:text-base">
                        <a
                          target="_blank"
                          href={`http://localhost:3001/uploads/${ae.aeInfo.AE_CIN}`}
                          className="font-extralight mt-2 text-primary hover:text-orange-600"
                        >
                          <Download
                            size={22}
                            className="font-extralight mt-2 text-primary hover:text-orange-600 inline-block"
                          />
                        </a>
                      </TableCell>
                      <TableCell className="text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger
                              onClick={() => handleAccept(ae.userType, ae._id)}
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
                                <DialogTitle className="text-secondaryDarkBlue">
                                  Refuse Message
                                </DialogTitle>
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
                                  className="text-white bg-red-600 hover:bg-red-500 "
                                  onClick={() =>
                                    handleRefuse(ae.userType, ae._id)
                                  }
                                  type="submit"
                                >
                                  Confirm
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TooltipProvider>
                      </TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-orange-600 hover:bg-orange-500 px-2 inline-block">
                                  See Details
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="text-xs font-sm"
                                >
                                  See User Details
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              <h1 className="font-bold text-lg lg:text-xl xl:text-2xl text-primary">
                                Auto Entrepreneur Details
                              </h1>
                            </DialogTitle>
                          </DialogHeader>
                          <AEDetails ae={ae} />
                        </DialogContent>
                      </Dialog>
                    </TableRow>
                  ))}
                {Company &&
                  Company.map((company: any, index: number) => (
                    <TableRow
                      className="cursor-pointer"
                      key={`${company.bidder_name}-${index}`}
                    >
                      <TableCell className="text-xs md:text-sm lg:text-base">
                        {company.bidder_name || company.depositor_name}
                      </TableCell>
                      <TableCell className="text-center text-xs md:text-sm lg:text-base">
                        {company.companyInfo.company_phoneNumber}
                      </TableCell>
                      <TableCell className="text-center text-xs md:text-sm lg:text-base">
                        {company.companyInfo.company_CR}
                      </TableCell>
                      <TableCell className="text-center ">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger
                              onClick={() =>
                                handleAccept(company.userType, company._id)
                              }
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
                                <DialogTitle className="text-secondaryDarkBlue">
                                  Refuse Message
                                </DialogTitle>
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
                                  onClick={() =>
                                    handleRefuse(company.userType, company._id)
                                  }
                                  type="submit"
                                >
                                  Confirm
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TooltipProvider>
                      </TableCell>
                      <Dialog>
                        <DialogTrigger>
                          <TableCell>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-orange-600 hover:bg-orange-500 px-2">
                                  See Details
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="text-xs font-sm"
                                >
                                  See User Details
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              <h1 className="font-bold text-lg lg:text-xl xl:text-2xl text-primary">
                                Company Details
                              </h1>
                            </DialogTitle>
                          </DialogHeader>
                          <CompanyDetails company={company} />
                        </DialogContent>
                      </Dialog>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default NewUsers;
