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
import DropDownAdmin from "@/Components/common/DropDownAdmin";
import Link from "next/link";
import { MapPin, StarIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Button } from "@/Components/ui/Button";

import AdminAside from "@/Components/common/AdminAside";
import { Skeleton } from "@/Components/ui/skeleton";

import axios from "axios";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DetailsInfoSkeleton from "@/Components/common/DetailsInfoSkeleton";
import AdminSheet from "@/Components/common/AdminSheet";

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
  const [AutoEntrepreneur, SetAutoEntrepreneur] = useState(false);
  const [Company, setCompany] = useState(false);

  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

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

  const fullName = depositorDetails ? depositorDetails.depositor_name : null;
  const LetterFullName = fullName
    ?.split(" ")
    .map((n: any) => n[0].toUpperCase())
    .join("");

  const averageRating: any = depositorLegalDetails
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

  // Company Info
  const CompanyName = depositorLegalDetails
    ? depositorLegalDetails.company_name
    : "";
  const CompanyType = depositorLegalDetails
    ? depositorLegalDetails.company_type
    : "";
  const CompanyIndustry = depositorLegalDetails
    ? depositorLegalDetails.company_DoA
    : "";
  const Ind1 = CompanyIndustry ? CompanyIndustry[0] : null;
  const Ind2 = CompanyIndustry ? CompanyIndustry[1] : null;
  const companySize = depositorLegalDetails
    ? depositorLegalDetails.company_size
    : "";
  const CompanyAddress = depositorLegalDetails
    ? depositorLegalDetails.company_address
    : "";
  const CompanyCity = depositorLegalDetails
    ? depositorLegalDetails.company_location
    : "";
  const CompanyPhoneNumber = depositorLegalDetails
    ? depositorLegalDetails.company_phoneNumber
    : null;
  const totalReviews = depositorDetails
    ? depositorDetails.depositor_review.length
    : 0;

  // Auto-Entrepreneur Info
  const AutoCity = depositorLegalDetails
    ? depositorLegalDetails.AE_location
    : "";
  const AutoAddress = depositorLegalDetails
    ? depositorLegalDetails.AE_address
    : "";
  const AutoPhoneNumber = depositorLegalDetails
    ? depositorLegalDetails.AE_phoneNumber
    : null;
  const AutoIndustry = depositorLegalDetails
    ? depositorLegalDetails.AE_DoA
    : "";
  const AutoIndustryParse = AutoIndustry ? JSON.parse(AutoIndustry) : null;
  const AutoInd1 = AutoIndustryParse ? AutoIndustryParse[0] : null;
  const AutoInd2 = AutoIndustryParse ? AutoIndustryParse[1] : null;

  useEffect(() => {
    if (depositorLegalDetails) {
      let Auto = depositorLegalDetails.AE_CIN
        ? depositorLegalDetails.AE_CIN
        : null;
      if (Auto) {
        SetAutoEntrepreneur(true);
      } else {
        setCompany(true);
      }
    }
  }, [depositorLegalDetails]);

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
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 bg-neutralBg min-h-screen">
      <AdminAside
        Language={Language}
        OffersVerification={"hover:bg-primary hover:text-white"}
        UsersVerification={"hover:bg-primary hover:text-white"}
      />
      <header className="sticky top-0 z-30 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <AdminSheet />
        <Breadcrumb className="hidden sm:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${Language}/Dashboard-A/Offers-verification`}>
                  New-Offers
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
                  Offer-Detail
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="hidden sm:flex">
          <DropDownAdmin content={DropDownMenuContent} Language={Language} />
        </div>
      </header>
      <section className="ml-5 mt-2 flex flex-col md:flex-row border-2 p-4 md:p-6 lg:p-8 mr-5 rounded-lg text-secondaryDarkBlue">
        <div className="w-full md:w-9/12 md:border-r-2">
          <div className="border-b-2 pb-5 lg:pb-10 xl:pb-12 pr-12">
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
              {OfferTitle ? (
                OfferTitle
              ) : (
                <Skeleton className="w-3/4 h-8 rounded-full bg-gray-200" />
              )}
            </h1>
            <div className="hidden sm:flex pag-2 gap-4 md:gap-6 lg:gap-8 xl:gap-10 text-neutralGray text-xs sm:text-sm lg:text-base">
              {OfferDateOfPosting ? (
                <p>
                  Posted
                  {timeSince(OfferDateOfPosting)}
                </p>
              ) : (
                <Skeleton className="w-32 h-4 rounded-full bg-gray-200" />
              )}
              <div className="flex gap-2 items-center">
                {OfferLocation ? (
                  <>
                    <MapPin
                      size={20}
                      className="text-primary w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                    />
                    <p>Location :</p>
                    <ul className="flex gap-1.5">
                      <li>{OfferLocation}</li>
                    </ul>
                  </>
                ) : (
                  <Skeleton className="w-52 h-4 rounded-full bg-gray-200" />
                )}
              </div>
            </div>
            <div className="flex gap-3 items-center mt-4 lg:mt-6 xl:mt-8">
              {CategoriesElement ? (
                <>
                  <h6 className="font-semibold hidden md:block text-sm lg:text-base">
                    Category :
                  </h6>
                  <ul className="md:flex gap-2 hidden">
                    {CategoriesElement.map((c: any, index: any) => (
                      <CategoryBtn value={c} key={index} />
                    ))}
                  </ul>
                </>
              ) : (
                <div className="md:flex gap-2 hidden">
                  <Skeleton className="w-32 h-4 rounded-full bg-gray-200" />
                  <Skeleton className="w-48 h-4 rounded-full bg-gray-200" />
                </div>
              )}
            </div>
          </div>
          <div className="py-5 md:py-8 lg:py-10 xl:py-12 pr-12 border-b-2">
            {OfferDescription ? (
              <p className="text-xs sm:text-md lg:text-base">
                {OfferDescription}
              </p>
            ) : (
              <div className="flex flex-col gap-1">
                <Skeleton className="w-full h-4 rounded-full bg-gray-200" />
                <Skeleton className="w-full h-4 rounded-full bg-gray-200" />
                <Skeleton className="w-3/4 h-4 rounded-full bg-gray-200" />
              </div>
            )}
          </div>
          <div className="py-4 md:py-8 lg:py-14 xl:py-16 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5 md:gap-10 lg:gap-40 border-b-2">
            <div className="flex items-center gap-2 text-xs md:text-sm lg:text-base">
              {OfferBudget ? (
                <>
                  <Image
                    src={"/icons/coin.svg"}
                    width={22}
                    height={22}
                    alt="shape"
                    className="w-4 h-4 lg:w-5 lg:h-5 hidden sm:block"
                  />
                  <h6 className="font-bold">
                    <span>Est.Budget : </span>
                    <span className="font-medium"> {OfferBudget} DH</span>
                  </h6>
                </>
              ) : (
                <Skeleton className="w-48 h-4 rounded-full bg-gray-200" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm lg:text-base">
              {offerDeadline ? (
                <>
                  <Image
                    src={"/icons/clock.svg"}
                    width={20}
                    height={20}
                    alt="shape"
                    className="w-4 h-4 lg:w-5 lg:h-5 hidden sm:block"
                  />
                  <h6 className="font-bold">
                    Deadline :
                    <span className="font-medium"> {offerDeadline}</span>
                  </h6>
                </>
              ) : (
                <Skeleton className="w-48 h-4 rounded-full bg-gray-200" />
              )}
            </div>
          </div>
          <div className="py-4 md:py-6 lg:py-8 xl:py-10 pr-20 border-b-2 md:border-none">
            {OfferAttachment || depositorDetails ? (
              <h3 className="font-bold text-xs sm:text-sm lg:text-lg mb-4 lg:mb-6 xl:mb-8">
                Attachments
              </h3>
            ) : (
              <Skeleton className="w-48 h-6 rounded-full bg-gray-200 mb-8" />
            )}
            <div className="flex items-center gap-2">
              {OfferAttachment || depositorDetails ? (
                <>
                  {OfferAttachment ? (
                    <>
                      <Image
                        src={"/icons/file.svg"}
                        width={13}
                        height={13}
                        alt="shape"
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                      />
                      <a
                        target="_blank"
                        href={`http://localhost:3001/uploads/${OfferAttachment}`}
                      >
                        <p className="text-primary underline underline-offset-1 text-xs lg:text-base hidden md:block">
                          {OfferAttachment}
                        </p>
                        <p className="text-primary underline underline-offset-1 text-xs lg:text-base md:hidden">
                          Attachment.file.pdf
                        </p>
                      </a>
                    </>
                  ) : (
                    <p>No Attachments Found</p>
                  )}
                </>
              ) : (
                <Skeleton className="w-96 h-4 rounded-full bg-gray-200" />
              )}
            </div>
          </div>
        </div>
        {depositorLegalDetails && depositorLegalDetails.length !== 0 ? (
          !AutoEntrepreneur && Company ? (
            <div className="pl-0 md:pl-6 lg:pl-8 xl:pl-12 w-full md:w-3/12 mt-5 md:mt-0">
              <div className="flex-col items-center gap-3 hidden md:flex">
                <div className="hidden rounded-full bg-slate-200 text-blue-400 w-16 h-16 lg:w-20	lg:h-20 xl:w-24 xl:h-24  md:flex items-center justify-center text-2xl lg:text-3xl xl:text-4xl">
                  {LetterFullName}
                </div>
                <div className="md:text-center">
                  <h2 className="font-bold text-xs md:text-base lg:text-xl xl:text-2xl">
                    {fullName == null ? (
                      <div className="flex gap-1 items-center">
                        <Skeleton className="w-14 h-5 rounded-full bg-gray-200" />
                        <Skeleton className="w-24 h-5 rounded-full bg-gray-200" />
                      </div>
                    ) : (
                      <>
                        {fullName.split(" ")[0].charAt(0).toUpperCase() +
                          fullName.split(" ")[0].slice(1)}{" "}
                        <span className="text-primary">
                          {fullName.split(" ")[1].charAt(0).toUpperCase() +
                            fullName.split(" ")[1].slice(1)}
                        </span>
                      </>
                    )}
                  </h2>
                  {!CompanyName && !CompanyType ? null : (
                    <h4 className="text-xs lg:text-sm xl:text-base font-semibold">
                      {CompanyName.charAt(0).toUpperCase() +
                        CompanyName.slice(1)}{" "}
                      {CompanyType}
                    </h4>
                  )}
                </div>
              </div>
              <div className="mt-0 lg:mt-4 xl:mt-5 md:flex flex-col gap-4 hidden">
                {averageRating == "N/A" ? (
                  <div className="md:mt-5 flex flex-col gap-5">
                    <div className="flex gap-1">
                      <p className="text-xs lg:text-sm xl:text-base">
                        <span className="text-secondaryDarkBlue font-semibold">
                          Rating:
                        </span>{" "}
                        {averageRating}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-1 text-xs lg:text-sm xl:text-base">
                      {
                        <>
                          {Array.from({
                            length: Math.floor(averageRating),
                          }).map((_, index) => (
                            <StarIcon
                              key={index}
                              className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 stroke-yellow-500"
                            />
                          ))}
                          {averageRating % 1 !== 0 &&
                            averageRating % 1 >= 0.5 && (
                              <StarIcon
                                key="half-star"
                                className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 stroke-yellow-500"
                              />
                            )}
                          {Array.from({
                            length: 5 - Math.ceil(averageRating),
                          }).map((_, index) => (
                            <StarIcon
                              key={`empty-${index}`}
                              className="w-4 h-4 md:w-5 md:h-5 fill-gray-100 stroke-yellow-500"
                            />
                          ))}
                        </>
                      }
                      <p>{averageRating}</p>
                    </div>
                    <p className="text-xs lg:text-sm xl:text-base">
                      {averageRating} of {totalReviews} reviews
                    </p>
                  </div>
                )}
                <div className="text-xs lg:text-sm xl:text-base">
                  {!CompanyIndustry ? null : (
                    <p className="font-bold">
                      {Ind1
                        ? Ind1.charAt(0).toUpperCase() + Ind1.slice(1)
                        : null}{" "}
                      &{" "}
                      {Ind2
                        ? Ind2.charAt(0).toUpperCase() + Ind2.slice(1)
                        : null}
                    </p>
                  )}
                  {!companySize ? null : <p>{companySize} Company</p>}
                </div>
                <div className="text-xs lg:text-sm xl:text-base">
                  {CompanyCity ? (
                    <p className="font-bold">
                      {CompanyCity.charAt(0).toUpperCase() +
                        CompanyCity.slice(1)}
                    </p>
                  ) : null}
                  <p>{CompanyAddress}</p>
                </div>
                <div className="text-xs lg:text-sm xl:text-base">
                  <p className="font-bold text-xs lg:text-sm xl:text-base">
                    Offer posted: {postedOffers}
                  </p>

                  {activeOffers == 0 ? (
                    <p>No active offers</p>
                  ) : (
                    <p>Active Offers: {activeOffers}</p>
                  )}
                </div>
              </div>
              <div className="mt-2 md:mt-12 flex flex-row md:flex-col lg:flex-row items-center gap-2">
                <button className="bg-green-600 text-white px-4 py-2 hover:bg-green-500 w-full rounded-full text-xs lg:text-sm transition duration-500 ease-in-out">
                  Accept
                </button>
                <Dialog>
                  <DialogTrigger className="bg-red-600 text-white px-4 py-2 hover:bg-red-500 w-full rounded-full text-xs lg:text-sm transition duration-500 ease-in-out">
                    Refuse
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
          ) : (
            <div className="pl-0 md:pl-6 lg:pl-8 xl:pl-12 w-full md:w-3/12 mt-5 md:mt-0">
              <div className="flex-col items-center gap-3 hidden md:flex">
                <div className="hidden rounded-full bg-slate-200 text-blue-400 w-16 h-16 lg:w-20	lg:h-20 xl:w-24 xl:h-24  md:flex items-center justify-center text-2xl lg:text-3xl xl:text-4xl">
                  {LetterFullName}
                </div>
                <div className="md:text-center">
                  <h2 className="font-bold text-xs md:text-base lg:text-xl xl:text-2xl">
                    {fullName == null ? (
                      <div className="flex gap-1 items-center">
                        <Skeleton className="w-14 h-5 rounded-full bg-gray-200" />
                        <Skeleton className="w-24 h-5 rounded-full bg-gray-200" />
                      </div>
                    ) : (
                      <>
                        <div>
                          {fullName.split(" ")[0].charAt(0).toUpperCase() +
                            fullName.split(" ")[0].slice(1)}{" "}
                          <span className="text-primary">
                            {fullName.split(" ")[1].charAt(0).toUpperCase() +
                              fullName.split(" ")[1].slice(1)}
                          </span>
                        </div>
                        <h4 className="text-xs lg:text-sm xl:text-base font-semibold">
                          Auto-Entrepreneur
                        </h4>
                      </>
                    )}
                  </h2>
                </div>
              </div>
              <div className="mt-0 lg:mt-4 xl:mt-5 md:flex flex-col gap-2 lg:gap-4 hidden">
                {averageRating == "N/A" ? (
                  <div className="mt-5 flex flex-col  gap-5">
                    <div className="flex gap-1">
                      <p className="text-xs lg:text-sm xl:text-base">
                        <span className="text-secondaryDarkBlue font-semibold">
                          Rating:
                        </span>{" "}
                        {averageRating}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-1 text-xs lg:text-sm xl:text-base">
                      {
                        <>
                          {Array.from({
                            length: Math.floor(averageRating),
                          }).map((_, index) => (
                            <StarIcon
                              key={index}
                              className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 stroke-yellow-500"
                            />
                          ))}

                          {averageRating % 1 !== 0 &&
                            averageRating % 1 >= 0.5 && (
                              <StarIcon
                                key="half-star"
                                className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 stroke-yellow-500"
                              />
                            )}

                          {Array.from({
                            length: 5 - Math.ceil(averageRating),
                          }).map((_, index) => (
                            <StarIcon
                              key={`empty-${index}`}
                              className="w-4 h-4 md:w-5 md:h-5 fill-gray-100 stroke-yellow-500"
                            />
                          ))}
                        </>
                      }

                      <p className="text-xs lg:text-sm xl:text-base">
                        {averageRating}
                      </p>
                    </div>
                    <p className="text-xs lg:text-sm xl:text-base">
                      {averageRating} of {totalReviews} reviews
                    </p>
                  </div>
                )}
                <div>
                  {!AutoIndustry ? null : (
                    <p className="font-bold text-xs lg:text-sm xl:text-base">
                      {AutoInd1
                        ? AutoInd1.charAt(0).toUpperCase() + AutoInd1.slice(1)
                        : null}{" "}
                      &{" "}
                      {AutoInd2
                        ? AutoInd2.charAt(0).toUpperCase() + AutoInd2.slice(1)
                        : null}
                    </p>
                  )}
                </div>
                <div>
                  <p className="font-bold text-xs lg:text-sm xl:text-base">
                    {AutoCity
                      ? AutoCity.charAt(0).toUpperCase() + AutoCity.slice(1)
                      : null}
                  </p>
                  <p className="text-xs lg:text-sm xl:text-base">
                    {AutoAddress}
                  </p>
                </div>
                <div className="text-xs lg:text-sm xl:text-base">
                  <p className="font-bold text-xs lg:text-sm xl:text-base">
                    Offer posted: {postedOffers}
                  </p>

                  {activeOffers == 0 ? (
                    <p>No active offers</p>
                  ) : (
                    <p>Active Offers: {activeOffers}</p>
                  )}
                </div>
              </div>
              <div className="mt-2 md:mt-12 flex flex-row md:flex-col lg:flex-row items-center gap-2">
                <button className="bg-green-600 text-white px-4 py-2 hover:bg-green-500 w-full rounded-full text-xs lg:text-sm transition duration-500 ease-in-out">
                  Accept
                </button>
                <Dialog>
                  <DialogTrigger className="bg-red-600 text-white px-4 py-2 hover:bg-red-500 w-full rounded-full text-xs lg:text-sm transition duration-500 ease-in-out">
                    Refuse
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
          )
        ) : depositorLegalDetails == null && depositorDetails ? (
          <div className="pl-0 md:pl-6 lg:pl-8 xl:pl-12 w-full md:w-3/12 mt-5 md:mt-0">
            <div className="md:flex flex-col md:items-center gap-3 hidden">
              <div className="hidden rounded-full bg-slate-200 text-blue-400 w-16 h-16 lg:w-20	lg:h-20 xl:w-24 xl:h-24  md:flex items-center justify-center text-2xl lg:text-3xl xl:text-4xl">
                {LetterFullName}
              </div>
              <div className="md:text-center">
                <div className="font-bold text-xs md:text-base lg:text-xl xl:text-2xl">
                  {fullName == null ? (
                    <div className="flex gap-1 items-center">
                      <Skeleton className="w-14 h-5 rounded-full bg-gray-200" />
                      <Skeleton className="w-24 h-5 rounded-full bg-gray-200" />
                    </div>
                  ) : (
                    <div className="">
                      <div>
                        {fullName.split(" ")[0].charAt(0).toUpperCase() +
                          fullName.split(" ")[0].slice(1)}{" "}
                        <span className="text-primary">
                          {fullName.split(" ")[1].charAt(0).toUpperCase() +
                            fullName.split(" ")[1].slice(1)}
                        </span>
                      </div>
                      <h4 className="text-xs lg:text-sm xl:text-base font-semibold">
                        Auto-Entrepreneur
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-0 lg:mt-4 xl:mt-5 md:flex flex-col gap-4 hidden">
              {averageRating == "N/A" ? (
                <div className="md:mt-5 flex flex-col gap-5">
                  <div className="flex gap-1">
                    <p className="text-xs lg:text-sm xl:text-base">
                      <span className="text-secondaryDarkBlue font-semibold">
                        Rating:
                      </span>{" "}
                      {averageRating}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex gap-1 ">
                    {
                      <>
                        {Array.from({
                          length: Math.floor(averageRating),
                        }).map((_, index) => (
                          <StarIcon
                            key={index}
                            className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 stroke-yellow-500"
                          />
                        ))}

                        {averageRating % 1 !== 0 &&
                          averageRating % 1 >= 0.5 && (
                            <StarIcon
                              key="half-star"
                              className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 stroke-yellow-500"
                            />
                          )}

                        {Array.from({
                          length: 5 - Math.ceil(averageRating),
                        }).map((_, index) => (
                          <StarIcon
                            key={`empty-${index}`}
                            className="w-4 h-4 md:w-5 md:h-5 fill-gray-100 stroke-yellow-500"
                          />
                        ))}
                      </>
                    }
                    <p className="text-xs lg:text-sm xl:text-base">
                      {averageRating}
                    </p>
                  </div>
                  <p className="text-xs lg:text-sm xl:text-base">
                    {averageRating} of {totalReviews} reviews
                  </p>
                </div>
              )}
              <div className="text-xs lg:text-sm xl:text-base">
                <p className="font-bold">Offer posted: {postedOffers}</p>
                {activeOffers == 0 ? (
                  <p>No active offers</p>
                ) : (
                  <p>Active Offers: {activeOffers}</p>
                )}
              </div>
              <div className="py-10 lg:py-16 xl:py-20 w-full flex justify-center items-center">
                <p className="text-xs xl:text-sm">No Data Found</p>
              </div>
            </div>
            <div className="mt-2 md:mt-12 flex flex-row md:flex-col lg:flex-row items-center gap-2">
              <button className="bg-green-600 text-white px-4 py-2 hover:bg-green-500 w-full rounded-full text-xs lg:text-sm transition duration-500 ease-in-out">
                Accept
              </button>
              <Dialog>
                <DialogTrigger className="bg-red-600 text-white px-4 py-2 hover:bg-red-500 w-full rounded-full text-xs lg:text-sm transition duration-500 ease-in-out">
                  Refuse
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
        ) : (
          <DetailsInfoSkeleton />
        )}
      </section>
    </div>
  );
};

export default AdminDetails;
