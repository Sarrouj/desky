"use client";

import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
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
import AdminAside from "@/Components/common/AdminAside";

// Components
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import NotFoundDataUser from "@/Components/common/NotFoundDataUser";
import AEList from "@/Components/common/AEList";

// Content
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import axios from "axios";
import CompanyList from "@/Components/common/CompanyList";

function UsersVerification() {
  // Content
  let DropDownMenuContent = useTranslations("DepositorDashboard.DropDownMenu");

  // Language
  const [Language, setLanguage] = useState("en");

  // Data
  const { data: session } = useSession();
  const user_id = session ? session.user.id : null;
  const user_role = session ? session.user.role : null;
  const [AE, setAE] = useState<any>(null);
  const [Company, setCompany] = useState<any>(null);
  const [type, setType] = useState<any>("ae");

  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, []);

  useEffect(() => {
    if (user_role !== "admin" && user_role !== null) {
      //   window.location.href = `/${Language}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:3001/admin/users");
        setAE(result.data.data.unverifiedAE);
        setCompany(result.data.data.unverifiedCompany);
        console.log(result.data.data.unverifiedAE);
        console.log(result.data.data.unverifiedCompany);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
      <AdminAside Language={Language} />
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
                <Link href={`/${Language}/Dashboard-A/users-verification`}>
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${Language}/Dashboard-A/Users-verification`}>
                  Users-verification
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <DropDownDepositor content={DropDownMenuContent} Language={Language} />
      </header>
      <main className="gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="mb-4">
          <Select onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ae">auto entrepreneur</SelectItem>
              <SelectItem value="companies">company</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {type == "ae" ? (
          AE && AE.length > 0 ? (
            <AEList AE={AE} user_id={user_id} />
          ) : (
            <NotFoundDataUser />
          )
        ) : Company && Company.length > 0 ? (
          <CompanyList Company={Company} user_id={user_id} />
        ) : (
          <NotFoundDataUser />
        )}
      </main>
    </div>
  );
}

export default UsersVerification;
