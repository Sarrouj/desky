"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import CategoryBtn from "@/Components/common/CategoryBtn";
import Image from "next/image";
import Link from "next/link";
import { useBoundStore } from "@/lib/store";
import { timeSince } from "@/Components/common/timeSince";
import Header from "@/Components/layout/Header";
// Internationalization
import {useTranslations} from 'next-intl';

const Details = ({ params }: { params: any }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage isLoggedIn state using useState
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState();

  // Language
  useEffect(()=>{
    let lg = JSON.parse(localStorage.getItem('lg'));
    setLanguage(lg);
  }, [Language])

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoggedIn(true); // Update isLoggedIn state using useState setter function
    } else {
      setIsLoggedIn(false); // Reset isLoggedIn state if not authenticated
    }
  }, [status]);

  // Offer Data fetching
  const { details } = params;
  const detailsData = useBoundStore((state) => state.offerData);
  const getOfferID = useBoundStore((state) => state.getOfferID);
  const fetchDetails = useBoundStore((state) => state.fetchOfferDetails);
  const CategoriesElement = detailsData && !(detailsData instanceof Array) ? detailsData.offer_category : null;
  const OfferAttachements = detailsData && !(detailsData instanceof Array) ?  detailsData.offer_attachments : null;
  const DepositorId = detailsData && !(detailsData instanceof Array) ? detailsData.depositor_id : null;
  const OfferTitle = detailsData && !(detailsData instanceof Array) ? detailsData.offer_title : null ;
  const OfferDateOfPosting = detailsData && !(detailsData instanceof Array) ? detailsData.offer_DoP : null;
  const OfferLocation = detailsData && !(detailsData instanceof Array) ?  detailsData.offer_location : null;
  const OfferDescription = detailsData && !(detailsData instanceof Array) ? detailsData.offer_description : null;
  const OfferBudget = detailsData && !(detailsData instanceof Array) ?  detailsData.offer_budget : null;
  
  // Depositor Info fetching
  const getDespositorID = useBoundStore((state) => state.getDepositorID);
  const fetchDepositorData = useBoundStore((state) => state.fetchDepositorData);
  const DespositorData = useBoundStore((state) => state.DespositorData);

  // Despositor Info
  const fullName = DespositorData? DespositorData.depositor_name : "Loading...";
  const SeparateName = fullName.split(" ");
  const FirstName = SeparateName[0];
  const LastName = SeparateName[1];

  // Depositor Legal Info
  const getDepositorLegalDataID = useBoundStore((state) => state.getDepositorLegalDataID);
  const fetchDepositorLegalData = useBoundStore((state) => state.fetchDepositorLegalData);
  const DespositorLegalData = useBoundStore((state) => state.DespositorLegalData);
  const CompanyType = DespositorLegalData ? DespositorLegalData.company_type : "";
  const CompanyName = DespositorLegalData ? DespositorLegalData.company_name : "Loading...";
  const CompanyAdress = DespositorLegalData ?  DespositorLegalData.company_address : "Loading...";
  const CompanyCity = DespositorLegalData  ?  DespositorLegalData.company_location : "Loading...";
  const CompanyIndustry =  DespositorLegalData ?  DespositorLegalData.company_DoA : "Loading...";
  const Ind1 = CompanyIndustry[0];
  const Ind2 = CompanyIndustry[1] ? ` & ${CompanyIndustry[1]}` : null;


  useEffect(()=> {
    if(details){
      getOfferID(details);
      fetchDetails();
      if (DepositorId) {
        getDespositorID(DepositorId);
        getDepositorLegalDataID(DepositorId);
        fetchDepositorData();
        fetchDepositorLegalData();
        DespositorData;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DepositorId , details])

  // Content
  const NavbarContent = useTranslations('NavBar');
  const Content =  useTranslations('OffersDetail');

  return (
    <>
      <div className="bg-white border-b-2 ">
            <Header NavbarContent={NavbarContent}/>
      </div>
      <main className="py-16 px-20 bg-neutralBg text-secondaryDarkBlue">
        <section className="flex">
          <div className=" w-9/12 border-r-2">
            <div className="border-b-2 pb-12 pr-12">
              <h1 className="text-3xl font-bold mb-2">
                {OfferTitle}
              </h1>
              <div className="flex gap-10 text-neutralGray">
                <p>{Content("Posted")} {timeSince(OfferDateOfPosting)}</p>
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
            <div className="py-16 flex items-center justify-between	pr-72	border-b-2">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/coin.svg"}
                  width={22}
                  height={22}
                  alt="shape"
                  className=""
                />
                <h6 className="font-bold">
                  {Content("Estbudget")}{" "}
                  <span className="font-medium">
                    {OfferBudget} DH
                  </span>
                </h6>
              </div>
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/clock.svg"}
                  width={20}
                  height={20}
                  alt="shape"
                  className=""
                />
                <h6 className="font-bold">
                  {Content("Deadline")} <span className="font-medium">Jan 20, 2024</span>
                </h6>
              </div>
            </div>
            <div className="py-10 pr-20">
              <h3 className="font-bold text-lg mb-8">
                {Content("Attachements")}{" "}
                <span className="text-primary font-medium">
                  ({OfferAttachements ? OfferAttachements.length : "Loading..."})
                </span>
              </h3>
              {OfferAttachements ? (
                OfferAttachements.map((attachement, index) => (
                  <div
                    className="flex items-center gap-2 cursor-pointer mb-2"
                    key={index}
                  >
                    <Image
                      src={"/icons/file.svg"}
                      width={13}
                      height={13}
                      alt="shape"
                      className=""
                    />
                    <p className="text-primary underline underline-offset-1">
                      {attachement["file_name"]}
                      <span>({attachement["file_size"]})</span>
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2 cursor-pointer mb-2">
                  <Image
                    src={"/icons/file.svg"}
                    width={13}
                    height={13}
                    alt="shape"
                    className=""
                  />
                  <p className="text-primary underline underline-offset-1">
                    Loading...
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="pl-12 w-3/12 ">
            <div className="flex flex-col items-center gap-3">
              <div
                className="rounded-full
              bg-slate-200 text-blue-400
              w-24 h-24 flex items-center
              justify-center text-4xl"
              >
                SZ
              </div>
              <div className="text-center">
                <h2 className="font-bold text-2xl">
                  {LastName} <span className="text-primary">{FirstName}</span>
                </h2>
                <h4 className="font-semibold">{CompanyName} {CompanyType}</h4>
              </div>
            </div>
            <div className="mt-16 flex flex-col gap-5">
              <div className="">
                <div className="flex gap-1 items-center">
                  <Image
                    src={"/icons/star.svg"}
                    width={20}
                    height={20}
                    alt="shape"
                    className=""
                  />
                  <Image
                    src={"/icons/star.svg"}
                    width={20}
                    height={20}
                    alt="shape"
                    className=""
                  />
                  <Image
                    src={"/icons/star.svg"}
                    width={20}
                    height={20}
                    alt="shape"
                    className=""
                  />
                  <Image
                    src={"/icons/star.svg"}
                    width={20}
                    height={20}
                    alt="shape"
                    className=""
                  />
                  <Image
                    src={"/icons/star.svg"}
                    width={20}
                    height={20}
                    alt="shape"
                    className=""
                  />
                  <p>4.97</p>
                </div>
                <p>4.97 {Content("of")} 25 {Content("reviews")}</p>
              </div>
              <div>
                <p className="font-bold" >{Ind1}{Ind2}</p>
                <p>Small Company (2-9 people) </p>
              </div>
              <div>
                <p className="font-bold">{CompanyCity}</p>
                <p>{CompanyAdress}</p>
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
              {isLoggedIn ? (
                <button className="text-white bg-primary rounded-full w-10/12 py-2">
                  {Content("CallToAction")}
                </button>
              ) : (
                <>
                  <button
                    disabled
                    className="text-white bg-gray-400 rounded-full w-10/12 py-2"
                  >
                    {Content("CallToAction")}
                  </button>
                  <p className="text-gray-500 my-2">
                    {Content("loggedToApply")}
                    <Link href={`/${Language}/login`} className="text-blue-600 underline ">
                      {Content("login")}
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="mt-20 border-2 rounded-lg py-10">
          <div className="border-b-2 px-10">
            <h3 className="font-bold text-lg mb-8">
              {Content("ReviewsHistory")}{" "}
              <span className="text-primary font-medium">(2)</span>
            </h3>
          </div>
          <div className="px-10 py-10 flex flex-col gap-12">
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full
                  bg-slate-200 text-blue-400
                    w-10 h-10 flex items-center
                    justify-center"
                >
                  AK
                </div>
                <h6 className="font-semibold">Alex k.</h6>
              </div>
              <div className="flex justify-between items-center mt-3">
                <h3 className="text-lg font-semibold">
                  Digital Marketing Expert - Google and Facebook Ads
                </h3>
                <p className="text-neutralGray">Jan 20, 2024</p>
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
                  <p>5</p>
                </div>
                <p className="text-sm mt-1 w-10/12	">
                  Working at Sam.AI has been an incredible journey so far. The
                  technology were building is truly cutting-edge, and being a part
                  of a team thats revolutionizing how people achhieve their goals
                  is immensely fulfilling.{" "}
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full
              bg-slate-200 text-blue-400
              w-10 h-10 flex items-center
              justify-center"
                >
                  AK
                </div>
                <h6 className="font-semibold">Alex k.</h6>
              </div>
              <div className="flex justify-between items-center mt-3">
                <h3 className="text-lg font-semibold">
                  Digital Marketing Expert - Google and Facebook Ads
                </h3>
                <p className="text-neutralGray">Jan 20, 2024</p>
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
                  <p>5</p>
                </div>
                <p className="text-sm mt-1 w-10/12	">
                  Working at Sam.AI has been an incredible journey so far. The
                  technology were building is truly cutting-edge, and being a part
                  of a team thats revolutionizing how people achhieve their goals
                  is immensely fulfilling.{" "}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Details;
