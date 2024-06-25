"use client";
import CallToAction from "@/Components/common/CallToAction";
import Footer from "@/Components/layout/footer";
import Header from "@/Components/layout/Header";
import OfferCard from "@/Components/layout/OfferCard";
import Image from "next/image";
import Link from "next/link";
import { useBoundStore } from "@/lib/store";
import { useEffect } from "react";
import OfferCardSkeleton from "@/Components/layout/OfferCardSkeleton";
import {useTranslations} from 'next-intl';


export default function Home() {
  const offersData = useBoundStore((state) => state.offersData);
  const fetchOffers = useBoundStore((state) => state.fetchOffers);
  const Content = useTranslations('Home');

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return (
    <>
      <Header />
        <main className="text-secondaryDarkBlue">
          <section className="border-b-2 pb-10">
            <div className="pl-20 flex">
              <div className="w-2/4 mt-28">
                <h2 className="text-xl text-neutralGray">
                  {Content('Hero.headlineAbove')}
                </h2>
                <p style={{ lineHeight: '1.30' }} className="text-4xl lg:text-5xl xl:text-[55px] font-extrabold mt-5">
                  {Content('Hero.mainHeadline1')}{" "}
                  <span className="text-primaryOrange">{Content('Hero.mainHeadline2')} </span>
                  {Content('Hero.mainHeadline3')}
                </p>
                <p className="mt-5">
                  {Content('Hero.heroDescription')}
                </p>
                <div className="mt-20">
                  <div className="mb-8">
                    <Link
                      href={""}
                      className="bg-primaryOrange text-white px-8 py-3 rounded-md mr-3"
                    >
                      {Content('Hero.SubmitCallToAction')} | +10
                    </Link>
                    <Link
                      href={"/offers"}
                      className="px-7 py-2 rounded-md border-4 border-primaryOrange text-primaryOrange font-semibold"
                    >
                       {Content('Hero.SeeCallsCallToAction')}
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
                      <p className="text-sm">{Content('Hero.trust1')}</p>
                    </div>
                    <div className="flex gap-2">
                      <Image
                        src={"/trustIcon.svg"}
                        alt={""}
                        width={18}
                        height={18}
                        className=""
                      />
                      <p className="text-sm">
                        {Content('Hero.trust2')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-2/4 flex items-start">
                <Image
                  src={"/herro2.svg"}
                  alt={""}
                  width={1000}
                  height={1000}
                  className=""
                />
              </div>
            </div>
          </section>
          <section className="border-b-2">
            <div className="px-20 py-10 gap-10 flex flex-col justify-center items-center">
              <h2 className="text-lg font-medium">
                {Content('CompaniesSection')}
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
          <section className="bg-neutralBg">
            <div className="px-16 py-20 flex flex-col items-center gap-16">
              <h1 className="text-4xl font-extrabold">
                {Content('LatestSection.title')}
              </h1>
              <div className="flex gap-5">
                { offersData.length !== 0  ? 
                  offersData.slice(0, 2).map((offer, index) => (
                    <OfferCard 
                      key={offer._id} 
                      title={offer.offer_title} 
                      date={offer.offer_deadLine} 
                      location={offer.offer_location}
                      budget={offer.offer_budget}
                      Category={offer.offer_category}
                      Desc={offer.offer_description}
                      offerNumber={index + 1}
                      id={offer._id}
                  /> )) :
                  <>
                    <OfferCardSkeleton/>
                    <OfferCardSkeleton/>
                  </>
                  }
              </div>
              <CallToAction href={"/offers"} value={Content('LatestSection.CallToAction')} />
            </div>
          </section>
          <section>
            <div className="px-32 py-10">
              <div className="py-20 flex flex-col justify-center items-center gap-8">
                <h1 className="text-4xl font-extrabold">
                  {Content('Credibility.title')}
                </h1>
                <p>
                  {Content('Credibility.description')}
                </p>
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
                  <div className="p-5 border rounded-lg cursor-pointer hover:bg-primaryOrange hover:text-white">
                    <div className="flex items-start justify-between">
                      <h2 className="font-bold text-2xl mb-5">{Content('Credibility.LegalStatus')}</h2>
                      <Image
                        src={"/icons/arrow.svg"}
                        alt={"icon"}
                        width={28}
                        height={28}
                      />
                    </div>
                    <p className="text-sm w-11/12	">
                      {Content('Credibility.LegalStatusDesc')}
                    </p>
                  </div>
                  <div className="p-5 border rounded-lg cursor-pointer hover:bg-primaryOrange hover:text-white">
                    <div className="flex items-start justify-between">
                      <h2 className="font-bold text-2xl mb-5">{Content('Credibility.RatingSystem')}</h2>
                      <Image
                        src={"/icons/arrow.svg"}
                        alt={"icon"}
                        width={28}
                        height={28}
                      />
                    </div>
                    <p className="text-sm w-11/12	">
                      {Content('Credibility.RatingSystemDesc')}
                    </p>
                  </div>
                  <div className="p-5 border rounded-lg cursor-pointer hover:bg-primaryOrange hover:text-white">
                    <div className="flex items-start justify-between">
                      <h2 className="font-bold text-2xl mb-5">{Content('Credibility.Statistic')}</h2>
                      <Image
                        src={"/icons/arrow.svg"}
                        alt={"icon"}
                        width={28}
                        height={28}
                      />
                    </div>
                    <p className="text-sm w-11/12">
                      {Content('Credibility.StatisticDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      <Footer />
    </>
  );
}
