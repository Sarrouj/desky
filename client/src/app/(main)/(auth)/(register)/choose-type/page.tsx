"use client";
import Image from "next/image";
import Link from "next/link";
import "./style.css";

const Type = () => {
  const handleTypeChoosing = (userType: string) => {
    const signUpUrl = `/choose-type/Sign-Up?userType=${userType}`;

    window.location.href = signUpUrl;
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
      <div className=" bg-muted lg:block rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange flex flex-col justify-end items-end ">
        <div className="h-2/4 p-8">
          <Link href={"/"}>
            <h1 className="text-white text-2xl font-bold">Desky</h1>
          </Link>
        </div>
        <div className="h-2/4 flex justify-start px-8">
          <Image
            src={"/authShape.svg"}
            width={400}
            height={400}
            alt="shape"
            className=""
          />
        </div>
      </div>
      <div className="flex flex-col py-8 justify-between">
        <div className="w-10/12 mx-auto text-sm text-end">
          Already have an account?{" "}
          <Link href="/login" className="underline text-primary">
            Sign In
          </Link>
        </div>
        <div className="mx-auto grid w-7/12 gap-6 ">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Join Us!</h1>
            <p className="text-muted-foreground">
              To begin this journey, tell us what type of account you&apos;d be
              opening.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div
              className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg cursor-pointer"
              onClick={() => handleTypeChoosing("Depositor")}
            >
              <div className="flex items-center gap-5">
                <Image
                  src={"/icons/DepositorIcon.svg"}
                  width={50}
                  height={50}
                  alt="shape"
                  className="depositorIcon"
                />
                <Image
                  src={"/icons/HoverDepositorIcon.svg"}
                  width={50}
                  height={50}
                  alt="shape"
                  className="hidden hoverDepositorIcon"
                />
                <div>
                  <h3 className="font-semibold">Depositor</h3>
                  <p className="text-xs">
                    Depose Offers and Manage Received Bids.
                  </p>
                </div>
              </div>
              <Image
                src={"/icons/arrow-right.svg"}
                width={25}
                height={25}
                alt="shape"
                className="arrowRight hidden"
              />
            </div>
            <div
              className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg cursor-pointer"
              onClick={() => handleTypeChoosing("Bidder")}
            >
              <div className="flex items-center gap-5">
                <Image
                  src={"/icons/bidderIcon.svg"}
                  width={50}
                  height={50}
                  alt="shape"
                  className="depositorIcon"
                />
                <Image
                  src={"/icons/HoverbidderIcon.svg"}
                  width={50}
                  height={50}
                  alt="shape"
                  className="hidden hoverDepositorIcon"
                />
                <div>
                  <h3 className="font-semibold">Bidder</h3>
                  <p className="text-xs">
                    Own or belong to a company, this is for you.
                  </p>
                </div>
              </div>
              <Image
                src={"/icons/arrow-right.svg"}
                width={25}
                height={25}
                alt="shape"
                className="arrowRight hidden"
              />
            </div>
          </div>
        </div>
        <p className="w-10/12 mx-auto text-sm">
          © 2024 Desky.ma. All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Type;
