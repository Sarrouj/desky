"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CategoryBtn from "@/Components/common/CategoryBtn";
import Image from "next/image";
import { useBoundStore } from "@/lib/store";
import { timeSince } from "@/Components/common/timeSince";
import Header from "@/Components/layout/Header";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Input } from "@/Components/ui/input";
import DetailsInfoSkeleton from "@/Components/common/DetailsInfoSkeleton";

import { Button } from "@/Components/ui/button";
import { Skeleton } from "@/Components/ui/skeleton";
import { MapPin, StarIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/Components/ui/dialog";

const Details = ({ params }: { params: any }) => {
  const DetailContent = useTranslations("OffersDetail");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session, status } = useSession();
  const user_id = session ? session.user?.id : null;
  const [offerDetails, setOfferDetails] = useState<any>(null);
  const [depositorDetails, setDepositorDetails] = useState<any>(null);
  const [depositorOffers, setDepositorOffers] = useState<any>(null);
  const [depositorLegalDetails, setDepositorLegalDetails] = useState<any>(null);
  const [success, setSuccess] = useState<[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [AutoEntrepreneur, SetAutoEntrepreneur] = useState(false);
  const [Company, setCompany] = useState(false);
  // Language
  const [Language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    if (lg) {
      setLanguage(JSON.parse(lg));
    }
  }, []);

  const { details } = params;
  const detailsData : any = useBoundStore((state) => state.offerData);
  const getOfferID = useBoundStore((state) => state.getOfferID);
  const fetchDetails = useBoundStore((state) => state.fetchOfferDetails);

  const DepositorId =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.depositor_id
      : null;

  const getDepositorID = useBoundStore((state) => state.getDepositorID);
  const fetchDepositorData = useBoundStore((state) => state.fetchDepositorData);

  const getDepositorLegalDataID = useBoundStore(
    (state) => state.getDepositorLegalDataID
  );
  const fetchDepositorLegalData = useBoundStore(
    (state) => state.fetchDepositorLegalData
  );
  const DepositorLegalData = useBoundStore(
    (state) => state.DespositorLegalData
  );

  const offerApply : any = Array.isArray(detailsData)
    ? detailsData.find((data: any) => data !== null)?.offer_apply ?? []
    : detailsData?.offer_apply ?? [];

  const getDepositorReviews = async (DepositorId: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BackendURL}/depositor/reviews/${DepositorId}`
      );
      if (response && response.data && response.data.success) {
        setSuccess(response.data.success);
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (details) {
      getOfferID(details);
      fetchDetails();
      if (DepositorId) {
        getDepositorID(DepositorId);
        getDepositorLegalDataID(DepositorId);
        fetchDepositorData();
        fetchDepositorLegalData();
        getDepositorReviews(DepositorId);
      }
    }
  }, [
    DepositorId,
    details,
    fetchDetails,
    getDepositorID,
    getOfferID,
    getDepositorLegalDataID,
    fetchDepositorData,
    fetchDepositorLegalData,
  ]);

  const NavbarContent = useTranslations("NavBar");
  const Content = useTranslations("OffersDetail");

  const [attachment, setAttachment] = useState<File | null | string | Blob>("");

  const handleApply = async () => {
    const formData = new FormData();
    if (attachment) {
      if (typeof attachment === "string" || attachment instanceof Blob) {
        formData.append("estimate", attachment);
      }
    }
    formData.append("user_id", session?.user.id || "");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BackendURL}/apply/offer/${details}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const offer_id = params.adminDetail;
  useEffect(() => {
    const fetchOfferData = async () => {
      try {
        const offer = await axios.get(`${process.env.NEXT_PUBLIC_BackendURL}/offer/${details}`);
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
              `${process.env.NEXT_PUBLIC_BackendURL}/depositor/${offerDetails.depositor_id}`
            ),
            axios.post(`${process.env.NEXT_PUBLIC_BackendURL}/depositor/offers`, {
              user_id: offerDetails.depositor_id,
            }),
            axios
              .get(
                `${process.env.NEXT_PUBLIC_BackendURL}/depositor/info/${offerDetails.depositor_id}`
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

  useEffect(() => {
    if (status == "authenticated") {
      setIsLoggedIn(true);
    }
  }, [status]);

  return (
    <>
      <div className="bg-white border-b-2">
        <Header
          NavbarContent={NavbarContent}
          HomePage={"hover:text-primary"}
          Offers={"hover:text-primary"}
          FAQ={"hover:text-primary"}
          AboutUS={"hover:text-primary"}
          Contact={"hover:text-primary"}
        />
      </div>
      <main className="py-4 px-6 sm:py-6 sm:px-8 md:py-12 md:px-14 lg:py-14 lg:px-16 xl:pl-20 xl:pr-16  bg-neutralBg text-secondaryDarkBlue">
        <section className="flex flex-col md:flex-row  text-secondaryDarkBlue">
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
                    {DetailContent("Posted")}
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
                      <p>{DetailContent("Location")}</p>
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
                      {DetailContent("Category")}
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
                      <span>{DetailContent("EstBudget")}</span>
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
                      {DetailContent("Deadline")}
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
                  {DetailContent("Attachements")}
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
                          href={`${process.env.NEXT_PUBLIC_BackendURL}/uploads/${OfferAttachment}`}
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
                      <p>{DetailContent("NoAttachments")}</p>
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
                <div className="md:mt-2 lg:mt-4 xl:mt-5 md:flex flex-col gap-4 hidden">
                  {averageRating == "N/A" ? (
                    <div className="md:mt-5 flex flex-col gap-5">
                      <div className="flex gap-1">
                        <p className="text-xs lg:text-sm xl:text-base">
                          <span className="text-secondaryDarkBlue font-semibold">
                            {DetailContent("Rating")}
                          </span>
                          {averageRating}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-1 text-xs lg:text-sm xl:text-base items-center">
                        {
                          <>
                            {Array.from({
                              length: Math.floor(averageRating),
                            }).map((_, index) => (
                              <StarIcon
                                key={index}
                                className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-500 stroke-yellow-500"
                              />
                            ))}
                            {averageRating % 1 !== 0 &&
                              averageRating % 1 >= 0.5 && (
                                <StarIcon
                                  key="half-star"
                                  className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-500 stroke-yellow-500"
                                />
                              )}
                            {Array.from({
                              length: 5 - Math.ceil(averageRating),
                            }).map((_, index) => (
                              <StarIcon
                                key={`empty-${index}`}
                                className="w-4 h-4 lg:w-5 lg:h-5 fill-gray-100 stroke-yellow-500"
                              />
                            ))}
                          </>
                        }
                        <p className="text-xs lg:text-sm xl:text-base">
                          {averageRating}
                        </p>
                      </div>
                      <p className="text-xs lg:text-sm xl:text-base">
                        {averageRating} {DetailContent("of")} {totalReviews}{" "}
                        {DetailContent("reviews")}
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
                    {!companySize ? null : (
                      <p>
                        {companySize} {DetailContent("Company")}
                      </p>
                    )}
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
                      {DetailContent("OfferPosted")} {postedOffers}
                    </p>

                    {activeOffers == 0 ? (
                      <p>{DetailContent("NoActiveOffers")} </p>
                    ) : (
                      <p>
                        {DetailContent("ActiveOffers")} {activeOffers}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-2 md:mt-8 xl:mt-12 flex flex-col items-center">
                  {isLoggedIn && session?.user.role === "bidder" ? (
                    offerApply &&
                    offerApply.length > 0 &&
                    offerApply.some(
                      (apply: any) => apply.bidder_id === session?.user.id
                    ) ? (
                      <button
                        disabled
                        className="text-white bg-gray-200 rounded-full w-full py-2 text-xs lg:text-sm"
                      >
                        {Content("CallToAction")}
                      </button>
                    ) : (
                      <Dialog>
                        <DialogTrigger className="w-full bg-primary py-2 text-white rounded-full font-semibold text-sm hover:bg-orange-400 transition ease-in-out duration-250">
                          {Content("CallToAction")}
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader className="text-lg font-bold text-secondaryDarkBlue">
                            {Content("AddEstimate")}
                          </DialogHeader>
                          <Input
                            id="Attachment"
                            type="file"
                            className="cursor-pointer text-xs lg:text-sm"
                            required
                            onChange={(e) =>
                              setAttachment(
                                e.target.files ? e.target.files[0] : ""
                              )
                            }
                          />
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={handleApply}
                              className="text-white rounded-md py-2 text-xs lg:text-sm"
                            >
                              {Content("CallToAction")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )
                  ) : (
                    <button
                      disabled
                      className="text-white bg-slate-200 rounded-full w-full py-2 text-xs lg:text-sm"
                    >
                      {Content("CallToAction")}
                    </button>
                  )}
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
                <div className="md:mt-2 lg:mt-4 xl:mt-5 md:flex flex-col gap-2 lg:gap-4 hidden">
                  {averageRating == "N/A" ? (
                    <div className="mt-5 flex flex-col  gap-5">
                      <div className="flex gap-1">
                        <p className="text-xs lg:text-sm xl:text-base">
                          <span className="text-secondaryDarkBlue font-semibold">
                            {Content("Rating")}
                          </span>{" "}
                          {averageRating}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-1 text-xs lg:text-sm xl:text-base items-center">
                        {
                          <>
                            {Array.from({
                              length: Math.floor(averageRating),
                            }).map((_, index) => (
                              <StarIcon
                                key={index}
                                className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-500 stroke-yellow-500"
                              />
                            ))}

                            {averageRating % 1 !== 0 &&
                              averageRating % 1 >= 0.5 && (
                                <StarIcon
                                  key="half-star"
                                  className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-500 stroke-yellow-500"
                                />
                              )}

                            {Array.from({
                              length: 5 - Math.ceil(averageRating),
                            }).map((_, index) => (
                              <StarIcon
                                key={`empty-${index}`}
                                className="w-4 h-4 lg:w-5 lg:h-5 fill-gray-100 stroke-yellow-500"
                              />
                            ))}
                          </>
                        }

                        <p className="text-xs lg:text-sm xl:text-base">
                          {averageRating}
                        </p>
                      </div>
                      <p className="text-xs lg:text-sm xl:text-base">
                        {averageRating} {Content("of")} {totalReviews}{" "}
                        {Content("reviews")}
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
                      {Content("NoActiveOffers")} {postedOffers}
                    </p>

                    {activeOffers == 0 ? (
                      <p>{Content("CallToAction")}</p>
                    ) : (
                      <p>
                        {Content("ActiveOffers")} {activeOffers}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-2 md:mt-8 xl:mt-12 flex flex-col items-center">
                  {isLoggedIn && session?.user.role === "bidder" ? (
                    offerApply &&
                    offerApply.length > 0 &&
                    offerApply.some(
                      (apply: any) => apply.bidder_id === session?.user.id
                    ) ? (
                      <button
                        disabled
                        className="text-white bg-gray-200 rounded-full w-full py-2 text-xs lg:text-sm"
                      >
                        {Content("CallToAction")}
                      </button>
                    ) : (
                      <Dialog>
                        <DialogTrigger className="w-full bg-primary py-2 text-white rounded-full font-semibold text-sm hover:bg-orange-400 transition ease-in-out duration-250">
                          {Content("CallToAction")}
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader className="text-lg font-bold text-secondaryDarkBlue">
                            {Content("AddEstimate")}
                          </DialogHeader>
                          <Input
                            id="Attachment"
                            type="file"
                            className="cursor-pointer text-xs lg:text-sm"
                            required
                            onChange={(e) =>
                              setAttachment(
                                e.target.files ? e.target.files[0] : ""
                              )
                            }
                          />
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={handleApply}
                              className="text-white rounded-md py-2 text-xs lg:text-sm"
                            >
                              {Content("CallToAction")}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )
                  ) : (
                    <button
                      disabled
                      className="text-white bg-slate-200 rounded-full w-full py-2 text-xs lg:text-sm"
                    >
                      {Content("CallToAction")}
                    </button>
                  )}
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
                          Individual
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:mt-2 lg:mt-4 xl:mt-5 md:flex flex-col gap-4 hidden">
                {averageRating == "N/A" ? (
                  <div className="md:mt-5 flex flex-col gap-5">
                    <div className="flex gap-1">
                      <p className="text-xs lg:text-sm xl:text-base">
                        <span className="text-secondaryDarkBlue font-semibold">
                          {Content("Rating")}
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
                              className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-500 stroke-yellow-500"
                            />
                          ))}

                          {averageRating % 1 !== 0 &&
                            averageRating % 1 >= 0.5 && (
                              <StarIcon
                                key="half-star"
                                className="w-4 h-4 lg:w-5 lg:h-5 fill-yellow-500 stroke-yellow-500"
                              />
                            )}

                          {Array.from({
                            length: 5 - Math.ceil(averageRating),
                          }).map((_, index) => (
                            <StarIcon
                              key={`empty-${index}`}
                              className="w-4 h-4 lg:w-5 lg:h-5 fill-gray-100 stroke-yellow-500"
                            />
                          ))}
                        </>
                      }
                      <p className="text-xs lg:text-sm xl:text-base">
                        {averageRating}
                      </p>
                    </div>
                    <p className="text-xs lg:text-sm xl:text-base">
                      {averageRating} {Content("of")} {totalReviews}{" "}
                      {Content("reviews")}
                    </p>
                  </div>
                )}
                <div className="text-xs lg:text-sm xl:text-base">
                  <p className="font-bold">
                    {Content("OfferPosted")} {postedOffers}
                  </p>
                  {activeOffers == 0 ? (
                    <p>{Content("NoActiveOffers")}</p>
                  ) : (
                    <p>
                      {Content("ActiveOffers")} {activeOffers}
                    </p>
                  )}
                </div>
                <div className="py-10 lg:py-16 xl:py-20 w-full flex justify-center items-center">
                  <p className="text-xs xl:text-sm">{Content("NoData")}</p>
                </div>
              </div>
              <div className="mt-2 md:mt-8 xl:mt-12 flex flex-col items-center">
                {isLoggedIn && session?.user.role === "bidder" ? (
                  offerApply &&
                  offerApply.length > 0 &&
                  offerApply.some(
                    (apply: any) => apply.bidder_id === session?.user.id
                  ) ? (
                    <button
                      disabled
                      className="text-white bg-slate-200 rounded-full w-full py-2 text-xs lg:text-sm"
                    >
                      {Content("CallToAction")}
                    </button>
                  ) : (
                    <Dialog>
                      <DialogTrigger className="w-full bg-primary py-2 text-white rounded-full font-semibold text-sm hover:bg-orange-400 transition ease-in-out duration-250">
                        {Content("CallToAction")}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="text-lg font-bold text-secondaryDarkBlue">
                          {Content("AddEstimate")}
                        </DialogHeader>
                        <Input
                          id="Attachment"
                          type="file"
                          className="text-white rounded-md py-2 text-xs lg:text-sm"
                          required
                          onChange={(e) =>
                            setAttachment(
                              e.target.files ? e.target.files[0] : ""
                            )
                          }
                        />
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={handleApply}
                            className="text-white rounded-full py-2"
                          >
                            {Content("CallToAction")}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )
                ) : (
                  <button
                    disabled
                    className="text-white bg-slate-200 rounded-full w-full py-2 text-xs lg:text-sm"
                  >
                    {Content("CallToAction")}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <DetailsInfoSkeleton />
          )}
        </section>
        {success && success.length > 0 ? (
          <section className="mt-5 md:mt-10 lg:mt-16 xl:mt-20 border-2 rounded-lg py-4 md:py-6 lg:py-8 xl:py-10 ">
            <div className="border-b-2 px-4 md:px-6 lg:px-8 xl:px-10">
              <h3 className="font-bold text-sm md:text-base lg:text-lg mb-2 md:mb-4 lg:mb-6 xl:mb-8">
                {Content("ReviewsHistory")}{" "}
                <span className="text-primary font-medium">
                  {success?.length}
                </span>
              </h3>
            </div>
            <div className="px-4 md:px-6 lg:px-8 xl:px-10 py-4 md:py-6 lg:py-8 xl:py-10 flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12">
              {success?.map((review: any, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-slate-200 text-blue-400 w-8 h-8 lg:w-10 lg:h-10 text-xs md:text-sm lg:text-base  flex items-center justify-center">
                      {review.bidder_name
                        .split(" ")
                        .map((n: any) => n[0].toUpperCase())
                        .join("")}
                    </div>
                    <h6 className="font-semibold text-xs md:text-sm lg:text-base">
                      {review.bidder_name}
                    </h6>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <h3 className="text-sm md:text-base lg:text-lg font-semibold">
                      {review.offer_title}
                    </h3>
                    <p className="text-neutralGray text-xs md:text-sm lg:text-base">
                      {new Date(review.reviews[0].date).toLocaleDateString(
                        "en-CA"
                      )}
                    </p>
                  </div>
                  <div className="mt-3">
                    <div className="flex gap-1 items-center">
                      {
                        <>
                          {Array.from({
                            length: Math.floor(review.reviews[0].rating),
                          }).map((_, index) => (
                            <StarIcon
                              key={index}
                              className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 stroke-yellow-500"
                            />
                          ))}

                          {review.reviews[0].rating % 1 !== 0 &&
                            review.reviews[0].rating % 1 >= 0.5 && (
                              <StarIcon
                                key="half-star"
                                className="w-4 h-4 md:w-5 md:h-5 fill-yellow-500 stroke-yellow-500"
                              />
                            )}

                          {Array.from({
                            length: 5 - Math.ceil(review.reviews[0].rating),
                          }).map((_, index) => (
                            <StarIcon
                              key={`empty-${index}`}
                              className="w-4 h-4 md:w-5 md:h-5 fill-gray-100 stroke-yellow-500"
                            />
                          ))}
                        </>
                      }
                      <p className="text-sm lg:text-base">
                        {review.reviews[0].rating}
                      </p>
                    </div>
                    <p className="text-xs lg:text-sm mt-1 w-10/12">
                      {review.reviews[0].text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
};

export default Details;
