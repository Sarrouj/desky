"use client"

import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    ShoppingCart,
    Users2,
} from "lucide-react"


import {
Breadcrumb,
BreadcrumbItem,
BreadcrumbLink,
BreadcrumbList,
BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Button } from "@/Components/ui/Button"

import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet"

import Link from "next/link"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"

// Contnet
import { useTranslations } from "next-intl"

// Components
import BidsList from "@/Components/common/BidsList"
import NotFoundDataDepositor from "@/Components/common/NotFoundDataDepositor"
import DropDownDepositor from "@/Components/common/DropDownDepositor"
import Aside from "@/Components/common/Aside"

const MyOffers = () => {

// Content
let Content = useTranslations("DepositorDashboard.bidsListAll");
let notFoundContent = useTranslations("DepositorDashboard.NoAvailableDate");
let DropDownMenu = useTranslations("DepositorDashboard.DropDownMenu");

// Language
const [Language, setLanguage] = useState('fr');

useEffect(()=>{
    let lg = JSON.parse(localStorage.getItem('lg'));
    setLanguage(lg);
}, [Language])

// Data
let [Biddata, setBidDate] = useState(false);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
      <Aside Language={Language} />
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
        </BreadcrumbList>
      </Breadcrumb>
      <DropDownDepositor content={DropDownMenu} Language={Language}/>
    </header>
    <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        { Biddata ?
            <BidsList Content={Content} seeMore={false}/> :
            <NotFoundDataDepositor Language={Language} Content={notFoundContent}/>
        }
        
    </main >
  </div>
  )
}

export default MyOffers
