"use client";
import CallToAction from "@/Components/common/CallToAction";
import Footer from "@/Components/layout/footer";
import HomeNavbar from "@/Components/layout/HomeNavbar";
import OfferCard from "@/Components/layout/OfferCard";
import Image from "next/image";
import Link from "next/link";
import { useBoundStore } from "@/lib/store";
import { useEffect, useState } from "react";
import OfferCardSkeleton from "@/Components/layout/OfferCardSkeleton";
import { useTranslations } from "next-intl";
import { Button } from "@/Components/ui/Button";

// Icons
import { MoveUp, MoveDown } from "lucide-react";


export default function Home() {
  const [Language, setLanguage] = useState();

  const offersData = useBoundStore((state) => state.offersData);
  const fetchOffers = useBoundStore((state) => state.fetchOffers);
  const Content = useTranslations("Home");
  const NavbarContent = useTranslations("NavBar");
  const OfferContent = useTranslations("offer");

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  // Language
  useEffect(() => {
    let lg = JSON.parse(localStorage.getItem("lg"));
    setLanguage(lg);
  }, [Language]);

  // Determine if offersData is available and has at least two items
const hasOffers = offersData && offersData.length > 0;
const lastTwoOffers = hasOffers ? offersData.slice(-2) : [];


  return (
    <div className="relative">
      <Image
        src={"/WavyShape.svg"}
        alt={""}
        width={18}
        height={18}
        className="w-[60vw] h-[53vw]"
      />
      <div className="absolute top-0 left-0 right-0">
        <HomeNavbar NavbarContent={NavbarContent} />
        <main className="text-secondaryDarkBlue">
          <section className="border-b-2 pb-10 overflow-hidden">
            <div className="pl-20 flex">
              <div className="w-2/4 mt-28">
                <h2 className="text-xl text-neutralGray">
                  {Content("Hero.headlineAbove")}
                </h2>
                <p
                  style={{ lineHeight: "1.30" }}
                  className="text-4xl lg:text-5xl xl:text-[55px] font-extrabold mt-5"
                >
                  {Content("Hero.mainHeadline1")}{" "}
                  <span className="text-primaryOrange">
                    {Content("Hero.mainHeadline2")}{" "}
                  </span>
                  {Content("Hero.mainHeadline3")}
                </p>
                <p className="mt-5">{Content("Hero.heroDescription")}</p>
                <div className="mt-20">
                  <div className="mb-8">
                    <Link
                      href={""}
                      className="bg-primaryOrange text-white px-8 py-3 rounded-md mr-3"
                    >
                      {Content("Hero.SubmitCallToAction")}
                    </Link>
                    <Link
                      href={`${Language}/offers`}
                      className="px-7 py-2 rounded-md border-4 border-primaryOrange text-primaryOrange font-semibold"
                    >
                      {Content("Hero.SeeCallsCallToAction")}
                    </Link>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <Image
                        src={"/trustIcon.svg"}
                        alt={""}
                        width={18}
                        height={18}
                      />
                      <p className="text-sm">{Content("Hero.trust1")}</p>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        src={"/trustIcon.svg"}
                        alt={""}
                        width={18}
                        height={18}
                        className=""
                      />
                      <p className="text-sm">{Content("Hero.trust2")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/4 items-start flex flex-col gap-3 -rotate-45 ml-36">
                <div className="flex items-center gap-5">
                  <div className="p-3.5 bg-white w-52 shadow-lg">
                    <p className="text-xs mb-2">Offers Accepted</p>
                    <div className="w-full flex justify-between">
                      <h1 className="text-lg font-bold text-secondaryDarkBlue">
                        3600
                      </h1>
                      <div className="flex items-center">
                        <MoveUp
                          size={12}
                          className="text-orange-300 font-bold"
                        />
                        <p className="font-bold text-orange-300 text-sm">
                          8.46%
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 mt-2">
                      <div className="w-3/5 h-full bg-orange-300 text-[8px] text-orange-300">
                        r
                      </div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-white w-52 shadow-lg">
                    <p className="text-xs mb-2">Offers Rejected</p>
                    <div className="w-full flex justify-between">
                      <h1 className="text-lg font-bold text-secondaryDarkBlue">
                        30
                      </h1>
                      <div className="flex items-center">
                        <MoveDown
                          size={12}
                          className="text-primary font-bold"
                        />
                        <p className="font-bold text-primary text-sm">11.28%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 mt-2">
                      <div className="w-6/12 h-full bg-primary text-[8px] text-primary">
                        r
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex relative bg-slate-600 w-full">
                  <div className="bg-white shadow-lg py-2 px-5 rounded-lg -rotate-90 absolute top-12 left-[-35px]">
                    <p className="text-xs mb-1">Total of bids</p>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-xs">230</p>
                      <p className="text-primary text-xs">+14%</p>
                    </div>
                    <ul className="flex gap-1 items-end">
                      <li className="flex flex-col items-end text-primary text-[8px] gap-1 mb-4">
                        <p>10K</p>
                        <p>4K</p>
                        <p>2K</p>
                        <p>0</p>
                      </li>
                      <li className="flex flex-col items-center text-[8px]">
                        <div className="bg-gray-200 w-4 h-3 text-gray-200 rounded-t">
                          r
                        </div>
                        <p className="text-primary">S</p>
                      </li>
                      <li className="flex flex-col items-center text-[8px]">
                        <div className="bg-gray-200 w-4 h-5 text-gray-200 rounded-t">
                          r
                        </div>
                        <p className="text-primary">M</p>
                      </li>
                      <li className="flex flex-col items-center text-[8px]">
                        <div className="bg-gray-200 w-4 h-8 text-gray-200 rounded-t">
                          r
                        </div>
                        <p className="text-primary">T</p>
                      </li>
                      <li className="flex flex-col items-center text-[8px]">
                        <div className="bg-primary w-4 h-7 text-primary rounded-t">
                          r
                        </div>
                        <p className="text-primary">W</p>
                      </li>
                      <li className="flex flex-col items-center text-[8px]">
                        <div className="bg-primary w-4 h-14 text-primary rounded-t">
                          r
                        </div>
                        <p className="text-primary">T</p>
                      </li>
                      <li className="flex flex-col items-center text-[8px]">
                        <div className="bg-gray-200 w-4 h-3 text-gray-200 rounded-t">
                          r
                        </div>
                        <p className="text-primary">F</p>
                      </li>
                      <li className="flex flex-col items-center text-[8px]">
                        <div className="bg-primary w-4 h-7 text-primary rounded-t">
                          r
                        </div>
                        <p className="text-primary">S</p>
                      </li>
                      <li className="flex flex-col items-center text-[8px]">
                        <div className="bg-primary w-4 h-12 text-primary rounded-t">
                          r
                        </div>
                        <p className="text-primary">S</p>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-lg shadow-lg bg-white p-5 absolute left-40">
                    <div className="flex items-center justify-between pb-3">
                      <h2 className="font-semibold text-sm">
                        Account Performance
                      </h2>
                      <button className="rounded border border-secondaryDarkBlue text-[10px] px-2 py-[4px]">
                        See More
                      </button>
                    </div>
                    <div className="bg-gray-100 w-72 h-64 flex items-center justify-center">
                      <Image
                        src={"/HeroChartLine.svg"}
                        alt={""}
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                  <div className="mt-5 bg-white absolute flex items-center gap-3 pr-8 pl-3 py-2.5 shadow-lg rounded-lg top-40 left-80">
                    <div className="text-xs text-primary rounded-full bg-slate-100 w-12 h-12 text-center flex justify-center items-center">
                      <p>ZS</p>
                    </div>
                    <div>
                      <p className="text-primary rounded-full bg-gray-100 px-3 py-1 w-fit text-[9px] ">
                        new bid
                      </p>
                      <h1 className="text-xs mt-2 ">Received From Zaid</h1>
                    </div>
                  </div>
                  <div className="mt-5 bg-white absolute flex items-center gap-3 pr-8 pl-3 py-2.5 shadow-lg rounded-lg top-[235px] left-96">
                    <div className="text-xs text-primary rounded-full bg-slate-100 w-12 h-12 text-center flex justify-center items-center">
                      <p>FS</p>
                    </div>
                    <div>
                      <p className="text-primary rounded-full bg-gray-100 px-3 py-1 w-fit text-[9px] ">
                        new bid
                      </p>
                      <h1 className="text-xs mt-2 ">Received From Fahd</h1>
                    </div>
                  </div>
                </div>
                <div className="mt-[330px] ml-40 flex items-center gap-3">
                  <div className="bg-white shadow-lg p-3 w-52 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-300 rounded-md p-3"></div>
                        <p className="text-xs">Offer xxxx</p>
                      </div>
                      <div>
                        <p className="font-bold text-[10px] bg-orange-200 text-primary rounded p-1">
                          21.4%
                        </p>
                      </div>
                    </div>
                    <h2 className="font-bold text-3xl text-orange-300 mt-3">
                      Rejected
                    </h2>
                    <p className="font-bold text-xs mt-1">From Last 7 days</p>
                  </div>
                  <div className="bg-white shadow-lg p-3 w-52 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-300 rounded-md p-3"></div>
                        <p className="text-xs">Offer xxxx</p>
                      </div>
                      <div>
                        <p className="font-bold text-[10px] bg-orange-200 text-primary rounded p-1">
                          21.4%
                        </p>
                      </div>
                    </div>
                    <h2 className="font-bold text-3xl text-primary mt-3">
                      Approved
                    </h2>
                    <p className="font-bold text-xs mt-1">From Last 7 days</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="border-b-2 bg-white">
            <div className="px-20 py-10 gap-10 flex flex-col justify-center items-center">
              <h2 className="text-lg font-medium">
                {Content("CompaniesSection")}
              </h2>
              <div className="flex gap-10 justify-center">
                <Image
                  src={"/logos/logo1.svg"}
                  alt={""}
                  width={150}
                  height={150}
                />
                <Image
                  src={"/logos/logo2.svg"}
                  alt={""}
                  width={150}
                  height={150}
                />
                <Image
                  src={"/logos/logo3.svg"}
                  alt={""}
                  width={150}
                  height={150}
                />
                <Image
                  src={"/logos/logo7.svg"}
                  alt={""}
                  width={150}
                  height={150}
                />
                <Image
                  src={"/logos/logo4.svg"}
                  alt={""}
                  width={150}
                  height={150}
                />
                <Image
                  src={"/logos/logo5.svg"}
                  alt={""}
                  width={150}
                  height={150}
                />
                <Image
                  src={"/logos/logo6.svg"}
                  alt={""}
                  width={150}
                  height={150}
                />
              </div>
            </div>
          </section>
          <section className="py-36 border-b-2 relative overflow-hidden">
            <div className="bg-gray-100 w-[500px] h-[500px] rounded-full absolute -right-36 top-20"></div>
            <div></div>
            <div className="w-full px-20">
              <Image
                src={"/WavyLine.svg"}
                alt={""}
                width={1100}
                height={1100}
              />
              <h1 className="text-[200px] text-gray-200 absolute right-48 top-24 z-0	">
                3
              </h1>
              <h1 className="text-[200px] text-gray-200 absolute right-[530px] top-[330px] z-0	">
                2
              </h1>
              <h1 className="text-[200px] text-gray-200 absolute right-[990px] top-[460px] z-0	">
                1
              </h1>
              <div className="w-full flex gap-20 absolute top-20 z-50">
                <div className="flex flex-col gap-52">
                  <div className="w-[500px]">
                    <h6 className="text-primary">
                      {Content("ProcessSection.UpTitle")}
                    </h6>
                    <h1 className="font-extrabold	text-4xl ">
                      {Content("ProcessSection.Title")}
                    </h1>
                    <p className="mt-1">{Content("ProcessSection.Desc")}</p>
                    <Button className="text-white mt-3">
                      {Content("ProcessSection.CallToAction")}
                    </Button>
                  </div>
                  <div className="ml-36">
                    <div className="bg-white rounded-2xl w-14 h-14 ml-5 mb-5 flex items-center">
                      <div className="bg-gray-300 rounded-full w-5 h-5 mx-auto mh-auto"></div>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg">
                        {Content("ProcessSection.Process.SubmitAnOffer")}
                      </h3>
                      <p className="text-sm">
                        {Content("ProcessSection.Process.SubmitDesc")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-[295px] ml-5">
                  <div className="bg-white rounded-2xl w-14 h-14 ml-5 mb-5 flex items-center">
                    <div className="bg-gray-300 rounded-full w-5 h-5 mx-auto mh-auto"></div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg">
                      {Content("ProcessSection.Process.ReceiveBids")}
                    </h3>
                    <p className="text-sm">
                      {Content("ProcessSection.Process.ReceiveBidsDesc")}
                    </p>
                  </div>
                </div>
                <div className="mt-10 mr-52">
                  <div className="bg-white rounded-2xl w-14 h-14 ml-2 mb-5 flex items-center">
                    <div className="bg-gray-300 rounded-full w-5 h-5 mx-auto mh-auto"></div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg">
                      {Content("ProcessSection.Process.AcceptTheBest")}
                    </h3>
                    <p className="text-sm">
                      {Content("ProcessSection.Process.AcceptDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-neutralBg">
            <div className="px-16 py-20 flex flex-col items-center gap-16">
              <h1 className="text-4xl font-extrabold">
                {Content("LatestSection.title")}
              </h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row content-start gap-3 lg:gap-5 w-full">
                {lastTwoOffers && lastTwoOffers.length > 0 ? (
                  lastTwoOffers.map((offer: any, index: number) =>
                    offer.offer_state === "open" ? (
                      <OfferCard
                        key={offer._id}
                        title={offer.offer_title}
                        date={offer.offer_deadLine}
                        location={offer.offer_location}
                        budget={offer.offer_budget}
                        Category={offer.offer_category}
                        Desc={offer.offer_description}
                        offerNumber={index + 1}
                        Proposals={offer.offer_apply}
                        id={offer._id}
                        lg={Language}
                        Content={OfferContent}
                      />
                    ) : null
                  )
                ) : (
                  <>
                    <OfferCardSkeleton />
                    <OfferCardSkeleton />
                  </>
                )}
              </div>
              <CallToAction
                href={`${Language}/offers`}
                value={Content("LatestSection.CallToAction")}
              />
            </div>
          </section>
          <section>
            <div className="px-32 py-10">
              <div className="py-20 flex flex-col justify-center items-center gap-8">
                <h1 className="text-4xl font-extrabold">
                  {Content("Credibility.title")}
                </h1>
                <p>{Content("Credibility.description")}</p>
              </div>
              <div className="flex">
                <div className="w-2/4">
                  <Image
                    src={"/Credibility.svg"}
                    alt={""}
                    width={1000}
                    height={1000}
                  />
                </div>
                <div className="w-2/4 flex flex-col gap-8">
                  <div className="p-5 border rounded-lg cursor-pointer hover:bg-primaryOrange hover:text-white transition-colors ease-in-out delay-200">
                    <div className="flex items-start justify-between">
                      <h2 className="font-bold text-2xl mb-5">
                        {Content("Credibility.LegalStatus")}
                      </h2>
                      <Image
                        src={"/icons/arrow.svg"}
                        alt={"icon"}
                        width={28}
                        height={28}
                      />
                    </div>
                    <p className="text-sm w-11/12	">
                      {Content("Credibility.LegalStatusDesc")}
                    </p>
                  </div>
                  <div className="p-5 border rounded-lg cursor-pointer hover:bg-primaryOrange hover:text-white transition-colors ease-in-out delay-200">
                    <div className="flex items-start justify-between">
                      <h2 className="font-bold text-2xl mb-5">
                        {Content("Credibility.RatingSystem")}
                      </h2>
                      <Image
                        src={"/icons/arrow.svg"}
                        alt={"icon"}
                        width={28}
                        height={28}
                      />
                    </div>
                    <p className="text-sm w-11/12	">
                      {Content("Credibility.RatingSystemDesc")}
                    </p>
                  </div>
                  <div className="p-5 border rounded-lg cursor-pointer hover:bg-primaryOrange hover:text-white transition-colors ease-in-out delay-200">
                    <div className="flex items-start justify-between">
                      <h2 className="font-bold text-2xl mb-5">
                        {Content("Credibility.Statistic")}
                      </h2>
                      <Image
                        src={"/icons/arrow.svg"}
                        alt={"icon"}
                        width={28}
                        height={28}
                      />
                    </div>
                    <p className="text-sm w-11/12">
                      {Content("Credibility.StatisticDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
