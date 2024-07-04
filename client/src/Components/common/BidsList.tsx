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


const BidsList = ({Content, seeMore} : {Content : any, seeMore:boolean}) => {

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
                        <Link href={`/${Language}/dashboard-d/my-offers`}>
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
                        <TableHead >{Content("OfferName")}</TableHead>
                        <TableHead className="text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {Content("BidderName")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">{Content("BidderNameDesc1")} <br /> {Content("BidderNameDesc2")}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableHead>
                        <TableHead className="text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {Content("Rate")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">
                                        {Content("RateDesc1")} <br /> {Content("RateDesc2")}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableHead>
                        <TableHead className="text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {Content("Date")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">
                                        {Content("DateDesc1")} <br /> {Content("DateDesc2")}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableHead>
                        <TableHead className="text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {Content("Devi")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">
                                        {Content("DeviDesc1")} 
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </TableHead>
                        <TableHead className="text-center">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        {Content("AcceptBid")}
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="text-xs font-sm ">
                                        {Content("AcceptBidDesc1")} <br /> {Content("AcceptBidDesc2")}
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
                            <TableCell className="text-center">
                                <div className="font-medium">Liam Johnson</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    Nike S.A.R.L
                                </div>
                            </TableCell>
                            <TableCell className="text-center">350</TableCell>
                            <TableCell className="text-center">2024-06-12</TableCell>
                            <TableCell className="flex justify-center items-center">
                               <Download size={22}  className="font-extralight mt-2 text-primary hover:text-orange-600"/>
                            </TableCell>
                            <TableCell className="text-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button className="h-6 rounded-full text-white text-xs bg-green-600 hover:bg-green-500">{Content("Accept")}</Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-xs font-sm ">
                                            {Content("AcceptDesc1")} <br /> {Content("AcceptDesc2")}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            
                            </TableCell>
                        </TableRow>
                        <TableRow className="cursor-pointer">
                            <TableCell >
                                Buying 100 chaires
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="font-medium">Liam Johnson</div>
                                <div className="hidden text-sm text-muted-foreground md:inline">
                                    Nike S.A.R.L
                                </div>
                            </TableCell>
                            <TableCell className="text-center">350</TableCell>
                            <TableCell className="text-center">2024-06-12</TableCell>
                            <TableCell className="flex justify-center items-center">
                               <Download size={22}  className="font-extralight mt-2 text-primary hover:text-orange-600"/>
                            </TableCell>
                            <TableCell className="text-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button className="h-6 rounded-full text-white text-xs bg-green-600 hover:bg-green-500">{Content("Accept")}</Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-xs font-sm ">
                                            {Content("AcceptDesc1")} <br /> {Content("AcceptDesc2")}
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

export default BidsList
