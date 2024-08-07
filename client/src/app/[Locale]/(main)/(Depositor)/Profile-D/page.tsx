"use client";

import Link from "next/link";
import Aside from "@/Components/common/Aside";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import NotFoundProfileDepositor from "@/Components/common/NotFoundProfileDepositor";
import ProfileCard from "@/Components/common/ProfileCard";
import CompanyProfile from "@/Components/common/CompanyProfile";
import AEProfile from "@/Components/common/AEProfile";
import { Button } from "@/Components/ui/Button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Clock4 } from "lucide-react";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import axios from "axios";
import DepositorSheet from "@/Components/common/DepositorSheet";

function Profile() {
  const [Language, setLanguage] = useState("fr");
  let SideBarContent = useTranslations("DepositorDashboard.SideBar");
  let DropDownMenuContent = useTranslations("DepositorDashboard.DropDownMenu");
  let BreadcrumbListContent = useTranslations(
    "DepositorDashboard.BreadcrumbList"
  );
  const AEContent = useTranslations("BidderDashboard.Profile.AE");
  const CompanyContent = useTranslations("BidderDashboard.Profile.Company");
  const NotFoundProfile = useTranslations("BidderDashboard.Profile.NotFound");
  const VerificationContent = useTranslations(
    "BidderDashboard.Profile.Verification"
  );

  const { data: session } = useSession();
  const user_id = session ? session.user?.id : null;
  const user_role = session ? session.user?.role : null;
  const [user, setUser] = useState<any>(null);
  const [legal, setLegal] = useState<any>(null);

  useEffect(() => {
    const lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, []);

  useEffect(() => {
    if (user_role !== "depositor" && user_role !== null) {
      window.location.href = `/${Language}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_role]);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id !== null) {
        try {
          const info = await axios.post(
            `http://localhost:3001/profile/${user_id}`,
            {
              user_role,
            }
          );
          setUser(info.data.success);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const fetchLegalData = async () => {
      if (user_id !== null) {
        try {
          const info = await axios.get(
            `http://localhost:3001/depositor/info/${user_id}`
          );
          if (info.data.success) {
            setLegal(info.data.success);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchLegalData();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  const userName: string | null = session ? session.user?.name : null;
  const LetterFullName = userName
    ?.split(" ")
    .map((n: any) => n[0].toUpperCase())
    .join("");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-secondaryDarkBlue">
      <Aside
        Language={Language}
        Dashboard={"bg-primary text-white hover:text-white"}
        CreateOffer={""}
        MyOffers={""}
        ManageBids={""}
        Content={SideBarContent}
      />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
        <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <DepositorSheet
            Dashboard={"dashboard-d"}
            Profile={"Profile-D"}
            ManageBids={"dashboard-d/manage-bids"}
            MyOffers={"dashboard-d/my-offers"}
            Reviews={"Reviews-D"}
            Offers={"offers"}
            Support={"Contact-Us"}
          />
          <Breadcrumb className="hidden sm:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${Language}/dashboard-d`}>
                    {BreadcrumbListContent("Dashboard")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </BreadcrumbList>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${Language}/Profile-D`}>
                    {BreadcrumbListContent("Profile")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="hidden md:block">
            <DropDownDepositor
              content={DropDownMenuContent}
              Language={Language}
            />
          </div>
        </header>
        <div className="mx-5 md:mx-10 lg:mx-18">
          <ProfileCard
            language={Language}
            LetterFullName={LetterFullName}
            user_role={user_role}
            user={user}
          />
          <div className="mt-2">
            {user?.company ? (
              <CompanyProfile user={user} content={CompanyContent} />
            ) : user?.ae ? (
              <AEProfile user={user} content={AEContent} />
            ) : legal ? (
              <div className="w-full flex flex-col items-center justify-center gap-2 text-center md:pr-5 lg:pr-10 xl:pr-20 pt-16">
                <Clock4 size={64} className="text-primary" />
                <div>
                  <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-1">
                    {VerificationContent("Title")}
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
                    {VerificationContent("Description")}
                  </p>
                </div>
              </div>
            ) : (
              <NotFoundProfileDepositor
                Language={Language}
                content={NotFoundProfile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
