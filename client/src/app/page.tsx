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

export default function Home() {
  const offersData = useBoundStore((state) => state.offersData);
  const fetchOffers = useBoundStore((state) => state.fetchOffers);
  const offersDataIsLoading = useBoundStore((state) => state.offersDataIsLoading);

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
                Growth Solution in a Single Platform.
              </h2>
              <h1 className="text-4xl lg:text-5xl xl:text-[55px]  font-extrabold leading-tight mt-5">
                Desky, The First Platform{" "}<span className="text-primaryOrange">For Private </span> Calls For Bids
              </h1>
              <p className="mt-5">
                Never at water me might. On formed merits hunted unable merely
                by mr whence or. Possession the unpleasing simplicity her
                uncommonly.
              </p>
              <div className="mt-20">
                <div className="mb-8">
                  <Link
                    href={""}
                    className="bg-primaryOrange text-white px-8 py-3 rounded-md mr-3"
                  >
                    Submit an offer | +10
                  </Link>
                  <Link
                    href={"/offers"}
                    className="px-7 py-2 rounded-md border-4 border-primaryOrange text-primaryOrange font-semibold"
                  >
                    See Calls
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
                    <p className="text-sm">Get started free</p>
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
                      Submit an offer and get Connects credit
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
              Over 1000 Businesses Growing With Desky
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
              The Latest Private Calls Published
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
            <CallToAction href={"/offers"} value={"See more"} />
          </div>
        </section>
        <section>
          <div className="px-32 py-10">
            <div className="py-20 flex flex-col justify-center items-center gap-8">
              <h1 className="text-4xl font-extrabold">
                Desky Crdibility System
              </h1>
              <p>
                We offer a variety of interesting features that you can help
                increase yor productivity at work and manage your projrct esaly
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
                    <h2 className="font-bold text-2xl mb-5">Legal Status</h2>
                    <Image
                      src={"/icons/arrow.svg"}
                      alt={"icon"}
                      width={28}
                      height={28}
                    />
                  </div>
                  <p className="text-sm w-11/12	">
                    Each bidder has a legal status: Desky connects you with
                    top-tier companies and skilled entrepreneurs, ensuring you
                    have access to the best options for your projects.
                  </p>
                </div>
                <div className="p-5 border rounded-lg cursor-pointer hover:bg-primaryOrange hover:text-white">
                  <div className="flex items-start justify-between">
                    <h2 className="font-bold text-2xl mb-5">Rating System</h2>
                    <Image
                      src={"/icons/arrow.svg"}
                      alt={"icon"}
                      width={28}
                      height={28}
                    />
                  </div>
                  <p className="text-sm w-11/12	">
                    Each bidder has a legal status: Desky connects you with
                    top-tier companies and skilled entrepreneurs, ensuring you
                    have access to the best options for your projects. ensuring
                    you have access to the best options for your projects.
                    ensuring you have access to the best options for your
                    projects.
                  </p>
                </div>
                <div className="p-5 border rounded-lg cursor-pointer hover:bg-primaryOrange hover:text-white">
                  <div className="flex items-start justify-between">
                    <h2 className="font-bold text-2xl mb-5">Statistic</h2>
                    <Image
                      src={"/icons/arrow.svg"}
                      alt={"icon"}
                      width={28}
                      height={28}
                    />
                  </div>
                  <p className="text-sm w-11/12">
                    Each bidder has a legal status: Desky connects you with
                    top-tier companies and skilled entrepreneurs, ensuring you
                    have access to the best options for your projects.
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
