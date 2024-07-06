"use client"

import { useState, useEffect } from "react"
import { Download } from "lucide-react"
  
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table"

import {
  Tabs,
  TabsContent,
} from "@/Components/ui/tabs"

import Link from "next/link"

// Tooltip
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
  } from "@/Components/ui/tooltip"


const MyOffersList = ({Content, seeMore} : {Content : any, seeMore:boolean}) => {

const [Language, setLanguage] = useState('fr');
// Language
useEffect(()=>{
    let lg = JSON.parse(localStorage.getItem('lg'));
    setLanguage(lg);
}, [Language])
    
  return (
    <Tabs defaultValue="week">
        <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7 flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <CardTitle>{Content("title")}</CardTitle>
                        <CardDescription>
                            {Content("Desc")}
                        </CardDescription>
                    </div>
                    {seeMore ? 
                        <Link href={`/${Language}/dashboard-d/manage-bids`}>
                            <Button size={"sm"} className="h-7 gap-1 text-xs text-white">
                                See more...
                            </Button>
                        </Link>
                    :
                        null
                    }
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader className="">
                    <TableRow className="hover:bg-white">
                        <TableHead >{Content("offerName")}</TableHead>
                        <TableHead className="text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {Content("TotalBids")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">{Content("TotalBidsDesc")} 
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableHead>
                        <TableHead className="text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {Content("Status")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">{Content("StatusDesc")} 
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableHead>
                        <TableHead className="text-center">{Content("finished")}</TableHead>
                        <TableHead className="text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {Content("DeleteTitle")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">{Content("DeleteHeaderDesc")} 
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="cursor-pointer">
                            <TableCell >
                                Buying 100 chaires
                            </TableCell>
                            <TableCell className="text-center">350</TableCell>
                            <TableCell className="text-center ">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="h-6 rounded-full border-2 text-xs  px-2">
                                            {Content("Done")}
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-xs font-sm ">
                                            {Content("DoneDesc1")} <br /> {Content("DoneDesc2")}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                            <TableCell className="text-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-green-600 hover:bg-green-500 px-2">
                                            {Content("Done")}
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-xs font-sm ">
                                            {Content("DoneDesc1")} <br /> {Content("DoneDesc2")}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                            <TableCell className="text-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger className="h-6 rounded-full text-white text-xs bg-red-600 hover:bg-red-500 px-2">
                                            {Content("Delete")}
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-xs font-sm ">
                                            {Content("DeleteDesc1")} <br />  {Content("DeleteDesc2")}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  )
}

export default MyOffersList
