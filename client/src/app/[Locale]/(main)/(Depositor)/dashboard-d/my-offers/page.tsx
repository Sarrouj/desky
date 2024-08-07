"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
// Content
import { useTranslations } from "next-intl";

// Components
import NotFoundDataDepositor from "@/Components/common/NotFoundDataDepositor";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import Aside from "@/Components/common/Aside";
import MyOffersList from "@/Components/common/MyOffersList";
import OffersListSkeleton from "@/Components/common/offerListSkeleton";
import DepositorSheet from "@/Components/common/DepositorSheet";

// zustand
import { useBoundStore } from "@/lib/store";

const MyOffers = () => {
  // Content
  let Content = useTranslations("DepositorDashboard.MyOffers");
  let notFoundContent = useTranslations("DepositorDashboard.NoAvailableDate");
  let DropDownMenu = useTranslations("DepositorDashboard.DropDownMenu");
  let BreadcrumbListContent = useTranslations(
    "DepositorDashboard.BreadcrumbList"
  );
  let SideBarContent = useTranslations("DepositorDashboard.SideBar");

  // Language
  const [Language, setLanguage] = useState("fr");
  const { data: session } = useSession();
  const user_id = session ? session.user?.id : null;
  const user_role = session ? session.user?.role : null;

  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  useEffect(() => {
    if (user_role !== "depositor" && user_role !== null) {
      window.location.href = `/${Language}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_role]);

  // Data
  const [dOffers, setDOffers] = useState<any>(null);
  const geOffersUserID = useBoundStore((state) => state.geOffersUserID);
  const putCompleteOffer = useBoundStore((state) => state.putCompleteOffer);
  const DepositorResponse = useBoundStore((state) => state.DepositorResponse);

  useEffect(() => {
    geOffersUserID(user_id);
    if (user_id !== null) {
      putCompleteOffer();
    }
  }, [user_id, geOffersUserID, putCompleteOffer]);

  useEffect(() => {
    if (DepositorResponse) {
      setDOffers(DepositorResponse);
    }
  }, [DepositorResponse]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
      <Aside
        Language={Language}
        Dashboard={""}
        CreateOffer={""}
        MyOffers={"bg-primary text-white hover:text-white"}
        ManageBids={""}
        Content={SideBarContent}
      />
      <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <DepositorSheet
          Dashboard={"dashboard-d"}
          Profile={""}
          ManageBids={"dashboard-d/manage-bids"}
          MyOffers={"dashboard-d/my-offers"}
          Reviews={"dashboard-d/my-reviews"}
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
                <Link href={`/${Language}/dashboard-d/my-offers`}>
                  {BreadcrumbListContent("MyOffers")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="hidden sm:block">
          <DropDownDepositor content={DropDownMenu} Language={Language} />
        </div>
      </header>
      <main className="gap-4 p-4 lg:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        {dOffers !== null ? (
          dOffers.length !== 0 ? (
            <MyOffersList Content={Content} dOffers={dOffers} />
          ) : (
            <NotFoundDataDepositor
              Language={Language}
              Content={notFoundContent}
            />
          )
        ) : (
          <OffersListSkeleton Content={Content} seeMore={false} />
        )}
      </main>
    </div>
  );
};

export default MyOffers;
