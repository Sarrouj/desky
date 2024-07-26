"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CategoryBtn from "@/Components/common/CategoryBtn";
import Image from "next/image";
import Link from "next/link";
import { useBoundStore } from "@/lib/store";
import { timeSince } from "@/Components/common/timeSince";
import Header from "@/Components/layout/Header";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

const Details = ({ params }: { params: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session, status } = useSession();
  const [language, setLanguage] = useState<string | null>(null);
  const [success, setSuccess] = useState<[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    if (lg) {
      setLanguage(JSON.parse(lg));
    }
  }, []);

  useEffect(() => {
    setIsLoggedIn(status === "authenticated");
  }, [status]);

  const { details } = params;
  const detailsData = useBoundStore((state) => state.offerData);
  const getOfferID = useBoundStore((state) => state.getOfferID);
  const fetchDetails = useBoundStore((state) => state.fetchOfferDetails);

  const CategoriesElement =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.offer_category
      : null;
  const OfferAttachment =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.offer_attachment
      : null;
  const DepositorId =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.depositor_id
      : null;
  const OfferTitle =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.offer_title
      : null;
  const OfferDateOfPosting =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.offer_DoP
      : null;
  const OfferLocation =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.offer_location
      : null;
  const OfferDescription =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.offer_description
      : null;
  const OfferBudget =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.offer_budget
      : null;
  const offerDeadline =
    detailsData && !(detailsData instanceof Array)
      ? detailsData.offer_deadline
      : null;

  const getDepositorID = useBoundStore((state) => state.getDepositorID);
  const fetchDepositorData = useBoundStore((state) => state.fetchDepositorData);
  const DepositorData = useBoundStore((state) => state.DespositorData);

  const fullName = DepositorData ? DepositorData.depositor_name : "Loading...";
  const [firstName, lastName] = fullName.split(" ");

  const getDepositorLegalDataID = useBoundStore(
    (state) => state.getDepositorLegalDataID
  );
  const fetchDepositorLegalData = useBoundStore(
    (state) => state.fetchDepositorLegalData
  );
  const DepositorLegalData = useBoundStore(
    (state) => state.DespositorLegalData
  );
  const CompanyType = DepositorLegalData ? DepositorLegalData.company_type : "";
  const CompanyName = DepositorLegalData
    ? DepositorLegalData.company_name
    : "Loading...";
  const CompanyAddress = DepositorLegalData
    ? DepositorLegalData.company_address
    : "Loading...";
  const CompanyCity = DepositorLegalData
    ? DepositorLegalData.company_location
    : "Loading...";
  const CompanyIndustry = DepositorLegalData
    ? DepositorLegalData.company_DoA
    : "Loading...";

  const offerApply = Array.isArray(detailsData)
    ? detailsData.find((data) => data !== null)?.offer_apply ?? []
    : detailsData?.offer_apply ?? [];

  const Ind1 = CompanyIndustry[0];
  const Ind2 = CompanyIndustry[1] ? ` & ${CompanyIndustry[1]}` : null;

  const getDepositorReviews = async (DepositorId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/depositor/reviews/${DepositorId}`
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
        `http://localhost:3001/apply/offer/${details}`,
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

  return (
    <>
      <div className="bg-white border-b-2">
        <Header
          NavbarContent={NavbarContent}
          Home={"hover:text-primary"}
          Offers={"text-primary font-bold "}
          FAQ={"hover:text-primary"}
          AboutUS={"hover:text-primary"}
        />
      </div>
      <main className="py-16 px-20 bg-neutralBg text-secondaryDarkBlue">
        <section className="flex">
          <div className="w-9/12 border-r-2">
            <div className="border-b-2 pb-12 pr-12">
              <h1 className="text-3xl font-bold mb-2">{OfferTitle}</h1>
              <div className="flex gap-10 text-neutralGray">
                <p>
                  {Content("Posted")} {timeSince(OfferDateOfPosting)}
                </p>
                <div className="flex gap-2">
                  <p>{Content("Location")} </p>
                  <ul className="flex gap-1.5">
                    <li>{OfferLocation}</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-3 items-center mt-8">
                <h6 className="font-semibold">{Content("Category")} </h6>
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
                  {Content("EstBudget")}{" "}
                  <span className="font-medium">{OfferBudget} DH</span>
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
                  {Content("Deadline")}{" "}
                  <span className="font-medium">{offerDeadline}</span>
                </h6>
              </div>
            </div>
            <div className="py-10 pr-20">
              <h3 className="font-bold text-lg mb-8">
                {Content("Attachments")}{" "}
              </h3>
              <Image
                src={"/icons/file.svg"}
                width={13}
                height={13}
                alt="shape"
              />
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
                <h4 className="font-semibold">
                  {CompanyName} {CompanyType}
                </h4>
              </div>
            </div>
            <div className="mt-16 flex flex-col gap-5">
              <div>
                <div className="flex gap-1 items-center">
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
                  <p>4.97</p>
                </div>
                <p>
                  4.97 {Content("of")} 25 {Content("reviews")}
                </p>
              </div>
              <div>
                <p className="font-bold">
                  {Ind1}
                  {Ind2}
                </p>
                <p>Small Company (2-9 people)</p>
              </div>
              <div>
                <p className="font-bold">{CompanyCity}</p>
                <p>{CompanyAddress}</p>
              </div>
              <div>
                <p className="font-bold">9 Offers posted</p>
                <p>2 active Offers</p>
              </div>
              <div>
                <p className="font-bold">{Content("OfferActivity")}</p>
                <p>
                  {Content("Proposals")} <span>Less than 5</span>
                </p>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center">
              {isLoggedIn && session?.user.role === "bidder" ? (
                offerApply &&
                offerApply.length > 0 &&
                offerApply.some(
                  (apply: any) => apply.bidder_id === session?.user.id
                ) ? (
                  <div>You already applied to this offer</div>
                ) : (
                  <Dialog>
                    <DialogTrigger>
                      <Button className="text-white rounded-full w-10/12 py-2">
                        {Content("CallToAction")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="text-2xl font-bold text-primary">
                        Add The Estimate
                      </DialogHeader>
                      <Input
                        id="Attachment"
                        type="file"
                        className="cursor-pointer text-xs lg:text-sm"
                        required
                        onChange={(e) =>
                          setAttachment(e.target.files ? e.target.files[0] : "")
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
                <div>
                  <button
                    disabled
                    className="text-white bg-gray-400 rounded-full w-10/12 py-2"
                  >
                    {Content("CallToAction")}
                  </button>
                  <p className="text-gray-500 my-2">
                    {Content("loggedToApply")}
                    <Link
                      href={`/${language}/login`}
                      className="text-blue-600 underline"
                    >
                      {Content("login")}
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="mt-20 border-2 rounded-lg py-10">
          {success?.length > 0 ? (
            <>
              <div className="border-b-2 px-10">
                <h3 className="font-bold text-lg mb-8">
                  {Content("ReviewsHistory")}{" "}
                  <span className="text-primary font-medium">
                    {success?.length}
                  </span>
                </h3>
              </div>
              <div className="px-10 py-10 flex flex-col gap-12">
                {success?.map((review: any, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-slate-200 text-blue-400 w-10 h-10 flex items-center justify-center">
                        {review.bidder_name
                          .split(" ")
                          .map((n: any) => n[0].toUpperCase())
                          .join("")}
                      </div>
                      <h6 className="font-semibold">{review.bidder_name}</h6>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <h3 className="text-lg font-semibold">
                        {review.offer_title}
                      </h3>
                      <p className="text-neutralGray">
                        {new Date(review.reviews[0].date).toLocaleDateString(
                          "en-CA"
                        )}
                      </p>
                    </div>
                    <div className="mt-3">
                      <div className="flex gap-1 items-center">
                        <Image
                          src={"/icons/ReviewStart.svg"}
                          width={20}
                          height={20}
                          alt="shape"
                        />
                        <Image
                          src={"/icons/ReviewStart.svg"}
                          width={20}
                          height={20}
                          alt="shape"
                        />
                        <Image
                          src={"/icons/ReviewStart.svg"}
                          width={20}
                          height={20}
                          alt="shape"
                        />
                        <Image
                          src={"/icons/ReviewStart.svg"}
                          width={20}
                          height={20}
                          alt="shape"
                        />
                        <Image
                          src={"/icons/ReviewStart.svg"}
                          width={20}
                          height={20}
                          alt="shape"
                        />
                        <p>{review.reviews[0].rating}</p>
                      </div>
                      <p className="text-sm mt-1 w-10/12">
                        {review.reviews[0].text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>{error}</div>
          )}
        </section>
      </main>
    </>
  );
};

export default Details;
