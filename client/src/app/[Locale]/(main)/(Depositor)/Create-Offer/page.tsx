"use client";

import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
  Clock4
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useBoundStore } from "@/lib/store";


// Components
import Aside from "@/Components/common/Aside";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import AddOfferForm from "@/Components/layout/AddOfferForm";


const CreateOffer: React.FC = () => {
  const [Language, setLanguage] = useState();
  const [firstComponent, setFirstComponents] = useState(true);

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  // Language
  let SideBarContent = useTranslations("DepositorDashboard.SideBar");
  let BreadcrumbListContent = useTranslations("DepositorDashboard.BreadcrumbList");
  let DropDownMenu = useTranslations("DepositorDashboard.DropDownMenu");

  // Global State Manager
  const waiting = useBoundStore((state) => state.waitingMsg);
  const changeWitingMsg = useBoundStore((state) => state.getWaitingMsg);

  function addMoreOffers(){
    setFirstComponents(false);
    changeWitingMsg(false);
  }

  return (
    <>
       <Aside Language={Language} Dashboard={''} CreateOffer={'bg-primary text-white hover:text-white'} MyOffers={''} ManageBids={''}  Content={SideBarContent}/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
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
                  <Link href={`/${Language}/Dashboard/`}>{BreadcrumbListContent('Dashboard')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${Language}/Create-Offer`}>{BreadcrumbListContent('CreateOffer')}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <DropDownDepositor content={DropDownMenu} Language={Language}/>
        </header>
        <main className="flex items-start gap-4 p-4 sm:px-6 relative ">
          {firstComponent ? 
            <div className="w-full flex flex-col items-center justify-center h-full mt-16 mr-16">
                <Package size={72} className="text-primary"/>
                <h2 className="text-3xl font-bold mb-1">Create New Offer</h2>
                <p className="text-gray-600 ">Create an Offer and Receive Bids from Top Companies in the Region </p>
                <Button className="text-white mt-5" onClick={() => setFirstComponents(false)}>Create Offer</Button>
            </div>
          : waiting ? 
          <div className="w-full flex flex-col items-center justify-center h-full mt-16 mr-16">
            <Clock4 size={82} className="text-primary"/>
            <h2 className="text-3xl font-bold mb-1">Verification in Progress</h2>
            <p className="text-gray-600 ">Your offer will be verified within 24 hours and will be published in the marketplace.</p>
            <div className="flex gap-2">
              <Button className="text-white mt-5" onClick={addMoreOffers}>Add More Offers</Button>
              <Link href={`/${Language}/dashboard-d/my-offers`}>
                <Button className="text-white mt-5">My Offers</Button>  
              </Link>
            </div>
          </div>
          :
          <AddOfferForm Language={Language}/> 
        }
        </main>
      </div>
    </>
  );
};

export default CreateOffer;
