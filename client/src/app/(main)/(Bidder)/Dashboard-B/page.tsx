"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Home,
  LineChart,
  ListFilter,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  Waypoints,
  LayoutList,
  GanttChart,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  User,
  UserPlus,
  ArrowLeftRight,
  Star,
  ChevronRight,
  PackagePlus
} from "lucide-react"


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/Components/ui/avatar"

  
import { Badge } from "@/Components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Button } from "@/Components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSubContent,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubTrigger
} from "@/Components/ui/dropdown-menu"

import { Input } from "@/Components/ui/input"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/Components/ui/pagination"
import { Progress } from "@/Components/ui/progress"
import { Separator } from "@/Components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"
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
  TabsList,
  TabsTrigger,
} from "@/Components/ui/tabs"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/Components/ui/tooltip"

import React, { useEffect, useState} from "react";
import { useSession, signOut } from "next-auth/react";


const DespoeitorDashboard = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const { data: session, status } = useSession();

  // User Data
  const userName : string | null = session ? session.user?.name : null;
  const userType : string | null = session ? session.user?.role : null;

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true); // Update isLoggedIn state using useState setter function
    } else {
      setIsLoggedIn(false); // Reset isLoggedIn state if not authenticated
    }
  }, [status]);

  const handleLogout = () => {
    signOut();
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-secondaryDarkBlue">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-white md:h-8 md:w-8 md:text-base"
          >
            <p className="transition-all group-hover:scale-110" >D</p>
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors md:h-8 md:w-8"
                >
                    <Home className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="/offers"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                    <Package className="h-5 w-5" />
                    <span className="sr-only">Offers</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Offers</TooltipContent>
            </Tooltip> 
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                    <GanttChart className="h-5 w-5" />
                    <span className="sr-only">Manage My Bids</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Manage My Bids</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                    <Waypoints className="h-5 w-5" />
                    <span className="sr-only">Connects</span>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Manage Connects</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg">
        <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {/* <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Orders</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-0 flex bg-neutralBg items-center gap-2 hover:bg-neutralBg hover:text-primary ">
                  <Avatar className="w-9 h-9 border">
                    <AvatarImage src={"/"} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-start items-start">
                    <h4 className="text-secondaryDarkBlue">{userName}</h4>
                    <p className="text-xs text-primary">{userType} Account</p>
                  </div>
                  <Image src={'/icons/arrow-down.svg'} width={18} height={18} alt="ArrowDown"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <ArrowLeftRight className="mr-2 h-4 w-4" />
                    <span>Switch Account</span>
                    <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </header>
        <main className=" items-start gap-4 p-4 sm:px-6 sm:py-0">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
                <Card
                className="sm:col-span-2 " x-chunk="dashboard-05-chunk-0"
                >
                <CardHeader className="pb-3">
                    <CardTitle>Bidder</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Bidding Dashboard for Seamless
                    Management and Insightful Analysis.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button className="text-white">
                        <Link href={"/offers"}>Find The Best Offers</Link>
                    </Button>
                </CardFooter>
                </Card>
                <Card className="flex flex-col justify-between">
                <CardHeader className="flex flex-col ">
                    <CardDescription>Total of Bids Received</CardDescription>
                    <CardTitle className="flex items-end justify-between ">
                    <p className="text-4xl">120</p>
                    <CardDescription className="">.Today</CardDescription>
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                    <div className="text-xs text-muted-foreground mb-2">
                    60 Recieved  Yesterday
                    </div>
                </CardContent>
                <CardFooter className="">
                    <Progress value={100} aria-label="25% increase" />
                </CardFooter>
                </Card>
                <Card className="flex flex-col justify-between">
                <CardHeader className="flex flex-col ">
                    <CardDescription>Total of Bids Received</CardDescription>
                    <CardTitle className="flex items-end justify-between ">
                    <p className="text-4xl">3000</p>
                    <CardDescription className="">.Month</CardDescription>
                    </CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                    <div className="text-xs text-muted-foreground mb-2">
                    2500 Recieved Last Month
                    </div>
                </CardContent>
                <CardFooter className="">
                    <Progress value={100} aria-label="25% increase" />
                </CardFooter>
                </Card>
            </div>
        </main>
        <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Today</TabsTrigger>
                  <TabsTrigger value="month">Yesterday</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <span className="sr-only sm:not-sr-only">See More ...</span>
                    {/* <ChevronRight className="h-3.5 w-3.5" /> */}
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Bids</CardTitle>
                    <CardDescription>
                      Recent Bids from your Offers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader className="">
                        <TableRow className="hover:bg-white">
                          <TableHead>Bidder</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Rank
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            T.O.C
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              Nike S.A.R.L
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center">
                                <p>3.5</p>
                                <Star className="h-4 w-4 text-primary"/>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            350
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2024-06-12
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className="text-xs" variant="outline">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              Nike S.A.R.L
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center">
                                <p>3.5</p>
                                <Star className="h-4 w-4 text-primary"/>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            350
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2024-06-12
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className="text-xs" variant="outline">
                              Deactive
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              Nike S.A.R.L
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center">
                                <p>3.5</p>
                                <Star className="h-4 w-4 text-primary"/>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            350
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2024-06-12
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className="text-xs" variant="outline">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              Nike S.A.R.L
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center">
                                <p>3.5</p>
                                <Star className="h-4 w-4 text-primary"/>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            350
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2024-06-12
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className="text-xs" variant="outline">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <div className="font-medium">Liam Johnson</div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              Nike S.A.R.L
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center">
                                <p>3.5</p>
                                <Star className="h-4 w-4 text-primary"/>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            350
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2024-06-12
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge className="text-xs" variant="outline">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
      </div>
    </div>
  )
}

export default  DespoeitorDashboard
