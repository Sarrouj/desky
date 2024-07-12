"use client";

import Image from "next/image";
import CategoryBtn from "@/Components/common/CategoryBtn";
import { timeSince } from "@/Components/common/timeSince";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DropDownDepositor from "@/Components/common/DropDownDepositor";
import Link from "next/link";
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
  Blocks,
  CopyPlus,
  CircleCheckBig,
  Star,
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

import axios from "axios";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AdminDetails = ({ params }: { params: any }) => {
  // Content
  let SideBarContent = useTranslations("DepositorDashboard.SideBar");
  let DropDownMenuContent = useTranslations("DepositorDashboard.DropDownMenu");
  let BreadcrumbListContent = useTranslations(
    "DepositorDashboard.BreadcrumbList"
  );

  // Language
  const [Language, setLanguage] = useState<string | null>(null);

  // Data
  const { data: session } = useSession();
  const user_id = session ? session.user?.id : null;
  const [offerDetails, setOfferDetails] = useState<any>(null);
  const [depositorDetails, setDepositorDetails] = useState<any>(null);
  const [depositorOffers, setDepositorOffers] = useState<any>(null);
  const [depositorLegalDetails, setDepositorLegalDetails] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    if (lg) {
      setLanguage(JSON.parse(lg));
    }
  }, []);

  const offer_id = params.adminDetail;
  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const offer = await axios.get(
          `http://localhost:3001/offer/${offer_id}`
        );
        setOfferDetails(offer.data.success);
      } catch (error) {
        console.error("Error fetching offer data:", error);
      }
    };

    fetchOfferData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer_id]);

  useEffect(() => {
    const fetchDepositorData = async () => {
      if (offerDetails && offerDetails.depositor_id) {
        try {
          const [depositor, offers, legal] = await Promise.all([
            axios.get(
              `http://localhost:3001/depositor/${offerDetails.depositor_id}`
            ),
            axios.post("http://localhost:3001/depositor/offers", {
              user_id: offerDetails.depositor_id,
            }),
            axios
              .get(
                `http://localhost:3001/depositor/info/${offerDetails.depositor_id}`
              )
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  return { data: { success: null } };
                }
                throw error;
              }),
          ]);

          setDepositorDetails(depositor.data.success);
          setDepositorOffers(offers.data.success);
          if (legal.data.success) {
            setDepositorLegalDetails(legal.data.success);
          }
        } catch (error) {
          console.error("Error fetching depositor data:", error);
        }
      }
    };

    fetchDepositorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerDetails]);

  const CategoriesElement =
    offerDetails && !(offerDetails instanceof Array)
      ? offerDetails.offer_category
      : null;
  const OfferAttachment =
    offerDetails && !(offerDetails instanceof Array)
      ? offerDetails.offer_attachment
      : null;
  const OfferTitle =
    offerDetails && !(offerDetails instanceof Array)
      ? offerDetails.offer_title
      : null;
  const OfferDateOfPosting =
    offerDetails && !(offerDetails instanceof Array)
      ? offerDetails.offer_DoP
      : null;
  const OfferLocation =
    offerDetails && !(offerDetails instanceof Array)
      ? offerDetails.offer_location
      : null;
  const OfferDescription =
    offerDetails && !(offerDetails instanceof Array)
      ? offerDetails.offer_description
      : null;
  const OfferBudget =
    offerDetails && !(offerDetails instanceof Array)
      ? offerDetails.offer_budget
      : null;
  const offerDeadline =
    offerDetails && !(offerDetails instanceof Array)
      ? new Date(offerDetails.offer_deadline).toLocaleDateString("en-CA")
      : null;

  const fullName = depositorDetails
    ? depositorDetails.depositor_name
    : "Loading...";
  const [firstName, lastName] = fullName.split(" ");
  const averageRating = depositorLegalDetails
    ? depositorDetails.depositor_review &&
      depositorDetails.depositor_review.length > 0
      ? (
          depositorDetails.depositor_review.reduce(
            (acc: number, review: any) => acc + review.rating,
            0
          ) / depositorDetails.depositor_review.length
        ).toFixed(1)
      : "N/A"
    : "N/A";
  const postedOffers = depositorOffers ? depositorOffers.length : 0;
  const activeOffers = depositorOffers
    ? depositorOffers.filter((offer: any) => offer.offer_state === "open")
        .length
    : 0;

  const CompanyName = depositorLegalDetails
    ? depositorLegalDetails.company_name
    : "";
  const CompanyType = depositorLegalDetails
    ? depositorLegalDetails.company_type
    : "";
  const CompanyIndustry = depositorLegalDetails
    ? depositorLegalDetails.company_DoA
    : "";
  const Ind1 = CompanyIndustry[0];
  const Ind2 = CompanyIndustry[1] ? ` & ${CompanyIndustry[1]}` : null;
  const companySize = depositorLegalDetails
    ? depositorLegalDetails.company_size
    : "";
  const CompanyAddress = depositorLegalDetails
    ? depositorLegalDetails.company_address
    : "";
  const CompanyCity = depositorLegalDetails
    ? depositorLegalDetails.company_location
    : "";

  const handleAccept = async () => {
    await axios.put(`http://localhost:3001/admin/offer/verify/${offer_id}`, {
      user_id,
    });
  };
  const handleRefuse = () => {
    axios.put(`http://localhost:3001/admin/offer/refuse/${offer_id}`, {
      user_id,
      message,
    });
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg h-screen">
      <AdminAside
        Language={Language}
      />
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
                <Link href={`/${Language}/Dashboard-A`}>
                  {BreadcrumbListContent("Dashboard")}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${Language}/Dashboard-A/Offers-verification`}>
                  Offers-verification
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </BreadcrumbList>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${Language}/Dashboard-A/Offers-verification/${offer_id}`}
                >
                  Offers-Details
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <DropDownDepositor content={DropDownMenuContent} Language={Language} />
      </header>
      <section className="ml-5 mt-2 flex">
        <div className="w-9/12 border-r-2">
          <div className="border-b-2 pb-12 pr-12">
            <h1 className="text-3xl font-bold mb-2">{OfferTitle}</h1>
            <div className="flex gap-10 text-neutralGray">
              <p>
                Posted
                {timeSince(OfferDateOfPosting)}
              </p>
              <div className="flex gap-2">
                <p>Location</p>
                <ul className="flex gap-1.5">
                  <li>{OfferLocation}</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3 items-center mt-8">
              <h6 className="font-semibold">Category</h6>
              <ul className="flex gap-2">
                {CategoriesElement ? (
                  CategoriesElement.map((c, index) => (
                    <CategoryBtn value={c} key={index} />
                  ))
                ) : (
                  <CategoryBtn value={"Loading ..."} />
                )}
              </ul>
            </div>
          </div>
          <div className="py-12 pr-12 border-b-2">
            <p className="">{OfferDescription}</p>
          </div>
          <div className="py-16 flex items-center justify-between pr-72 border-b-2">
            <div className="flex items-center gap-2">
              <Image
                src={"/icons/coin.svg"}
                width={22}
                height={22}
                alt="shape"
              />
              <h6 className="font-bold">
                EstBudget
                <span className="font-medium"> {OfferBudget} DH</span>
              </h6>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/icons/clock.svg"}
                width={20}
                height={20}
                alt="shape"
              />
              <h6 className="font-bold">
                Deadline
                <span className="font-medium"> {offerDeadline}</span>
              </h6>
            </div>
          </div>
          <div className="py-10 pr-20">
            <h3 className="font-bold text-lg mb-8">Attachments</h3>
            <Image src={"/icons/file.svg"} width={13} height={13} alt="shape" />
            <a
              target="_blank"
              href={`http://localhost:3001/uploads/${OfferAttachment}`}
            >
              <p className="text-primary underline underline-offset-1">
                {OfferAttachment}
              </p>
            </a>
          </div>
        </div>
        <div className="pl-12 w-3/12">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-slate-200 text-blue-400 w-24 h-24 flex items-center justify-center text-4xl">
              SZ
            </div>
            <div className="text-center">
              <h2 className="font-bold text-2xl">
                {lastName} <span className="text-primary">{firstName}</span>
              </h2>
              {!CompanyName && !CompanyType ? null : (
                <h4 className="font-semibold">
                  {CompanyName} {CompanyType}
                </h4>
              )}
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-4">
            {averageRating == "N/A" ? (
              <div className="mt-5 flex flex-col items-center gap-5">
                <div className="flex gap-1 items-center">
                  <p>Rating: {averageRating}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <p>Rating: {averageRating}</p>
                <Image
                  src={"/icons/star.svg"}
                  width={20}
                  height={20}
                  alt="shape"
                />
                <Image
                  src={"/icons/star.svg"}
                  width={20}
                  height={20}
                  alt="shape"
                />
                <Image
                  src={"/icons/star.svg"}
                  width={20}
                  height={20}
                  alt="shape"
                />
                <Image
                  src={"/icons/star.svg"}
                  width={20}
                  height={20}
                  alt="shape"
                />
                <Image
                  src={"/icons/star.svg"}
                  width={20}
                  height={20}
                  alt="shape"
                />
              </div>
            )}
            <div>
              {!CompanyIndustry ? null : (
                <p className="font-bold">
                  {Ind1}
                  {Ind2}
                </p>
              )}
              {!companySize ? null : <p>{companySize} Company</p>}
            </div>
            <div>
              <p className="font-bold">{CompanyCity}</p>
              <p>{CompanyAddress}</p>
            </div>
            <div>
              <p className="font-bold">Offer posted: {postedOffers}</p>

              {activeOffers == 0 ? (
                <p>No active offers</p>
              ) : (
                <p>active offers: {activeOffers}</p>
              )}
            </div>
          </div>
          <div className="mt-12 flex flex-row items-center gap-5">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">
              accept
            </button>

            <Dialog>
              <DialogTrigger>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">
                  refuse
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Refuse Message</DialogTitle>
                  <DialogDescription>
                    Write a message describing the reason for refusing the
                    offer.
                  </DialogDescription>
                </DialogHeader>
                <textarea
                  name="message"
                  id="message"
                  className="border border-gray-400 rounded-md p-2 w-full"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <DialogFooter>
                  <Button
                    className="text-white  bg-red-600 hover:bg-red-500 "
                    onClick={handleRefuse}
                    type="submit"
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDetails;
