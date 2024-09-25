"use client";

import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import AdminAside from "@/Components/common/AdminAside";

// Components
import NotFoundDataUser from "@/Components/common/NotFoundDataUser";
import AEList from "@/Components/common/AEList";
import AdminSheet from "@/Components/common/AdminSheet";
import DropDownAdmin from "@/Components/common/DropDownAdmin";

// Content
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import axios from "axios";
import CompanyList from "@/Components/common/CompanyList";
import NewUsers from "@/Components/common/NewUsers";

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
  const [type, setType] = useState<any>(null);

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; 
    setLanguage(language);
  }, [Language]);

  useEffect(() => {
    if (user_role !== "admin" && user_role !== null) {
      window.location.href = `/${Language}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_role]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/admin/users`);
        setAE(result.data.data.unverifiedAE);
        setCompany(result.data.data.unverifiedCompany);
       
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
      <AdminAside
        Language={Language}
        OffersVerification={"hover:text-secondaryDarkBlue"}
        UsersVerification={" bg-primary text-white"}
      />
      <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <AdminSheet />
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${Language}/dashboard-admin/users-verification`}>
                  New-Users
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
        </Breadcrumb>
        <div className="hidden md:block">
          <DropDownAdmin content={DropDownMenuContent} Language={Language} />
        </div>
      </header>
      <main className="gap-4 p-2 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="mb-4">
          <Select onValueChange={(value) => setType(value)}>
            <SelectTrigger className="w-full mxd:w-[180px] text-xs md:text-sm">
              <SelectValue placeholder="Users" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="ae" className="text-xs md:text-sm">Auto entrepreneur</SelectItem>
              <SelectItem value="companies" className="text-xs md:text-sm">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {AE && !type || Company && !type ? 
          <NewUsers AE={AE} Company={Company} user_id={user_id} />
        : ( type == "ae" && AE && AE.length > 0 ? 
          <AEList AE={AE} user_id={user_id} />
          :type == "companies" && Company && Company.length > 0 ? 
          <CompanyList Company={Company} user_id={user_id} />
          : <NotFoundDataUser />
        )
         }
      </main>
    </div>
  );
}

export default UsersVerification;
// Routing to Lower Case