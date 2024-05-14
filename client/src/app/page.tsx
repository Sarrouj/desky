import CallToAction from "@/Components/common/CallToAction";
import Header from "@/Components/layout/Header";
import OfferCard from "@/Components/layout/OfferCard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header/>
      <main className="text-secondaryDarkBlue">
        <section className="border-b-2 pb-10">
          <div className="pl-20 flex">
            <div className="w-2/4 mt-28">
              <h2 className="text-xl text-neutralGray">Growth Solution in a Single Platform.</h2>
              <h1 className="text-6xl font-extrabold leading-tight mt-5">Desky, The First <br /> Platform <span className="text-primaryOrange">For Private </span><br /> Calls For Bids</h1>
              <p className="mt-5">Never at water me might. On formed merits hunted unable merely by mr whence or. Possession the unpleasing simplicity her uncommonly.</p>
              <div className="mt-20">
                <div className="mb-8">
                  <Link href={""} className="bg-primaryOrange text-white px-8 py-3 rounded-md mr-3">Submit an offer | +10</Link>
                  <Link href={""} className="px-7 py-2 rounded-md border-4 border-primaryOrange text-primaryOrange font-semibold">See Calls</Link>
                </div>
                <div className="flex gap-5">
                  <div className="flex gap-2">
                    <Image src={"/trustIcon.svg"} alt={""} width={18} height={18}/>
                    <p className="text-sm">Get started free</p>
                  </div>
                  <div className="flex gap-2">
                  <Image src={"/trustIcon.svg"} alt={""} width={18} height={18} className=""/>
                    <p className="text-sm">Submit an offer and get Connects credit</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/4 flex items-start">
            <Image src={"/herro2.svg"} alt={""} width={1000} height={1000} className=""/>
            </div>
          </div>
        </section>
        <section className="border-b-2">
          <div className="px-20 py-10 gap-10 flex flex-col justify-center items-center">
            <h2 className="text-lg font-medium">Over 1000 Businesses Growing With Desky</h2>
            <div className="flex gap-10 justify-center">
              <Image src={"/logos/logo1.svg"} alt={""} width={150} height={150} />
              <Image src={"/logos/logo2.svg"} alt={""} width={150} height={150} />
              <Image src={"/logos/logo3.svg"} alt={""} width={150} height={150} />
              <Image src={"/logos/logo7.svg"} alt={""} width={150} height={150} />
              <Image src={"/logos/logo4.svg"} alt={""} width={150} height={150} />
              <Image src={"/logos/logo5.svg"} alt={""} width={150} height={150} />
              <Image src={"/logos/logo6.svg"} alt={""} width={150} height={150} />
            </div>
          </div>
        </section>
        <section className="bg-neutralBg">
          <div className="px-20 py-20 flex flex-col items-center gap-5">
            <h1 className="text-4xl font-extrabold mb-10">The Latest Private Calls Published</h1>
            <div className="flex gap-5">
              <OfferCard />
              <OfferCard />
            </div>
            <CallToAction href={"/"} value={"See more"} />
          </div>
        </section>
      </main>
      <footer></footer> 
    </>
  );
}


