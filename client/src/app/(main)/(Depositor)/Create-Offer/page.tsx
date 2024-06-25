"use client";
import Image from "next/image";
import Link from "next/link";
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
  PackagePlus,
} from "lucide-react";

import { Label } from "@/Components/ui/label";

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

import { Badge } from "@/Components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

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
  DropdownMenuSubTrigger,
} from "@/Components/ui/dropdown-menu";

import { Input } from "@/Components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/Components/ui/pagination";
import { Progress } from "@/Components/ui/progress";
import { Separator } from "@/Components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/Components/ui/tooltip";

import { Textarea } from "@/Components/ui/textarea";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useBoundStore } from "@/lib/store";
import { cn } from "@/lib/utils";

import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner"


const CreateOffer :   React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [categoryOpen, categorySetOpen] = React.useState<boolean>(false);
  const [CategoryValue, CategorySetValue] = React.useState<string>("");

  const Cities = useBoundStore((state) => state.Cities);
  const Categories = useBoundStore((state) => state.Categories);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session, status } = useSession();

  // User Data
  const userName: string | null = session ? session.user?.name : null;
  const userType: string | null = session ? session.user?.role : null;

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

  // Offers Value
  const id: string | null = session ? session.user?.id : null;
  const [title, setTtitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");

  const getOfferDataPosting = useBoundStore(
    (state) => state.getOfferDataPosting
  );
  const postOffer = useBoundStore((state) => state.postOffer);



  const postData = {
    "offer_title": title,
    "offer_description": desc,
    "offer_category": [category, "Your Offer Category2"],
    "offer_location": location,
    "offer_deadLine": deadline,
    "offer_budget": Number(budget),
    "id" : session?.user.id,
  };


  useEffect(() => {
    getOfferDataPosting(postData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postData]);

  function addOffer(e) {
    e.preventDefault();
    postOffer();
    setTtitle("");
    setDesc("");
    setLocation("");
    setCategory("");
    setBudget("");
    setDeadline("");
    toast("Offer Are Added Successfully.");
  }

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-white md:h-8 md:w-8 md:text-base"
          >
            <p className="transition-all group-hover:scale-110">D</p>
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/Dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 text-muted-foreground hover:text-foreground"
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
                  href="/Create-Offer"
                  className="flex h-9 w-9 items-center justify-center bg-primary text-white rounded-lg text-muted-foreground transition-colors  md:h-8 md:w-8"
                >
                  <PackagePlus className="h-5 w-5" />
                  <span className="sr-only">Create Offer</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Create Offer</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LayoutList className="h-5 w-5" />
                  <span className="sr-only">My Offers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">My Offers</TooltipContent>
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
                  <span className="sr-only">Manage Bids</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Manage Bids</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Bidders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Bidders</TooltipContent>
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
                  <Link href="/Dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/Create-Offer">Create-Offer</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {/* <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Recent Orders</BreadcrumbPage>
              </BreadcrumbItem> */}
            </BreadcrumbList>
          </Breadcrumb>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-0 flex bg-neutralBg items-center gap-2 hover:bg-neutralBg hover:text-primary "
              >
                <Avatar className="w-9 h-9 border">
                  <AvatarImage src={"/"} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-start items-start">
                  <h4 className="text-secondaryDarkBlue">{userName}</h4>
                  <p className="text-xs text-primary">{userType} Account</p>
                </div>
                <Image
                  src={"/icons/arrow-down.svg"}
                  width={18}
                  height={18}
                  alt="ArrowDown"
                />
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 mb-10">
            <Tabs>
              <h1 className="text-3xl font-semibold">Create New Offer</h1>
              <div className="w-full gap-16 bg-white rounded-lg border shadow p-10 mt-5">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-lg font-semibold">
                      Title
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Type your title here."
                      required
                      value={title}
                      onChange={(e) => setTtitle(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-lg font-semibold">
                      Description
                    </Label>
                    <Textarea
                      placeholder="Type your description here."
                      required
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-lg font-semibold">
                      Location
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[100%] justify-between"
                          onClick={() => setOpen(!open)}
                        >
                          {value
                            ? Cities.find((city) => city.value === value)?.label
                            : "Select your Offer Location ..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[450px] p-0">
                        <Command>
                          <CommandInput placeholder="Search..." />
                          <CommandEmpty>No City found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {Cities.map((city, index) => (
                                <CommandItem
                                  key={index}
                                  value={city.value}
                                  onSelect={(currentValue) => {
                                    setValue(
                                      currentValue === value ? "" : currentValue
                                    );
                                    setLocation(
                                      currentValue === value ? "" : currentValue
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === city.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.label}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="text-lg font-semibold">
                      Category
                    </Label>
                    <Popover open={categoryOpen} onOpenChange={categorySetOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={categoryOpen}
                          className="w-[100%] justify-between"
                          onClick={() => categorySetOpen(!categoryOpen)}
                        >
                          {CategoryValue
                            ? Categories.find(
                                (city) => city.value === CategoryValue
                              )?.label
                            : "Select your Offer Category..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[450px] p-0">
                        <Command>
                          <CommandInput placeholder="Search..." />
                          <CommandEmpty>No City found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {Categories.map((city, index) => (
                                <CommandItem
                                  key={index}
                                  value={city.value}
                                  onSelect={(currentValue) => {
                                    CategorySetValue(
                                      currentValue === CategoryValue
                                        ? ""
                                        : currentValue
                                    );
                                    setCategory(
                                      currentValue === CategoryValue
                                        ? ""
                                        : currentValue
                                    );
                                    categorySetOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      CategoryValue === city.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.label}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="Budget" className="text-lg font-semibold">
                      Budget
                    </Label>
                    <Input
                      id="Budget"
                      type="number"
                      placeholder="Type your Budget Here"
                      required
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="Deadline" className="text-lg font-semibold">
                      Deadline
                    </Label>
                    <Input
                      id="Deadline"
                      type="date"
                      placeholder="Type your Budget Here"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="Attachement"
                      className="text-lg font-semibold"
                    >
                      Attachement
                    </Label>
                    <Input
                      id="Attachement"
                      type="file"
                      className="cursor-pointer"
                      required
                    />
                  </div>
                  <Link href={""}>
                    <Button
                      type="submit"
                      className="w-full text-white"
                      onClick={(e) => addOffer(e)}
                    >
                      ADD
                    </Button>
                  </Link>
                </div>
              </div>
            </Tabs>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Top Bidders Recieved
                  </CardTitle>
                  <CardDescription>Date: June 12, 2024</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Ranking
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Offers Closed
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div>
                  <div className="flex items-center font-semibold">
                    <h6 className="w-1/2">Bidder</h6>
                    <h6 className="w-1/4 items-end text-end">Rank</h6>
                    <h6 className="w-1/4 text-end">T.O.C</h6>
                  </div>
                  <div className="mt-5">
                    <Link
                      href={"#"}
                      className="border-0 flex items-center gap-2 hover:bg-white hover:text-primary "
                    >
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={"/"} alt="@shadcn" />
                        <AvatarFallback>HB</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-start items-start w-1/2">
                        <h4 className="text-secondaryDarkBlue">
                          Houssame Brihi
                        </h4>
                        <p className="text-xs text-primary">S.A.R.L</p>
                      </div>
                      <div className="w-1/4 flex items-end justify-end">
                        <div className="mr-2 flex items-center justify-end">
                          <p className="">5</p>
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="w-1/4 text-end">
                        <p>65</p>
                      </div>
                    </Link>
                    <Separator className="my-4" />
                    <Link
                      href={"#"}
                      className="border-0 flex items-center gap-2 hover:bg-white hover:text-primary "
                    >
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={"/"} alt="@shadcn" />
                        <AvatarFallback>FS</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-start items-start w-1/2">
                        <h4 className="text-secondaryDarkBlue">
                          Fahd Souirita
                        </h4>
                        <p className="text-xs text-primary">S.A</p>
                      </div>
                      <div className="w-1/4 flex items-end justify-end">
                        <div className="mr-2 flex items-center justify-end">
                          <p className="">4.9</p>
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="w-1/4 text-end">
                        <p>320</p>
                      </div>
                    </Link>
                    <Separator className="my-4" />
                    <Link
                      href={"#"}
                      className="border-0 flex items-center gap-2 hover:bg-white hover:text-primary "
                    >
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={"/"} alt="@shadcn" />
                        <AvatarFallback>SZ</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-start items-start w-1/2">
                        <h4 className="text-secondaryDarkBlue">Sarrouj Zaid</h4>
                        <p className="text-xs text-primary">S.A.S</p>
                      </div>
                      <div className="w-1/4 flex items-end justify-end">
                        <div className="mr-2 flex items-center justify-end">
                          <p className="">4.5</p>
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="w-1/4 text-end">
                        <p>85</p>
                      </div>
                    </Link>
                    <Separator className="my-4" />
                    <Link
                      href={"#"}
                      className="border-0 flex items-center gap-2 hover:bg-white hover:text-primary "
                    >
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={"/"} alt="@shadcn" />
                        <AvatarFallback>AZ</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-start items-start w-1/2">
                        <h4 className="text-secondaryDarkBlue">
                          Azizi Zakaria
                        </h4>
                        <p className="text-xs text-primary">S.A.R.L</p>
                      </div>
                      <div className="w-1/4 flex items-end justify-end">
                        <div className="mr-2 flex items-center justify-end">
                          <p className="">4.5</p>
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="w-1/4 text-end">
                        <p>120</p>
                      </div>
                    </Link>
                    <Separator className="my-4" />
                    <Link
                      href={"#"}
                      className="border-0 flex items-center gap-2 hover:bg-white hover:text-primary "
                    >
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={"/"} alt="@shadcn" />
                        <AvatarFallback>TR</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-start items-start w-1/2">
                        <h4 className="text-secondaryDarkBlue">Touil Reda</h4>
                        <p className="text-xs text-primary">S.C.S</p>
                      </div>
                      <div className="w-1/4 flex items-end justify-end">
                        <div className="mr-2 flex items-center justify-end">
                          <p className="">4.5</p>
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="w-1/4 text-end">
                        <p>65</p>
                      </div>
                    </Link>
                    <Separator className="my-4" />
                    <Link
                      href={"#"}
                      className="border-0 flex items-center gap-2 hover:bg-white hover:text-primary "
                    >
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={"/"} alt="@shadcn" />
                        <AvatarFallback>TA</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-start items-start w-1/2">
                        <h4 className="text-secondaryDarkBlue">Tribak Ayoub</h4>
                        <p className="text-xs text-primary">S.C.A</p>
                      </div>
                      <div className="w-1/4 flex items-end justify-end">
                        <div className="mr-2 flex items-center justify-end">
                          <p className="">4</p>
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="w-1/4 text-end">
                        <p>210</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                  Updated Daily
                </div>
                <Pagination className="ml-auto mr-0 w-auto ">
                  <PaginationContent>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronLeft className="h-3.5 w-3.5" />
                        <span className="sr-only">Previous Order</span>
                      </Button>
                    </PaginationItem>
                    <PaginationItem>
                      <Button size="icon" variant="outline" className="h-6 w-6">
                        <ChevronRight className="h-3.5 w-3.5" />
                        <span className="sr-only">Next Order</span>
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </>
   
  );
};

export default CreateOffer;
