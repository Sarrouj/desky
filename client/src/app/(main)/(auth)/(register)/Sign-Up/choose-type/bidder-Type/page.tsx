import Image from "next/image";
import Link from "next/link";
import "./style.css";

const BidderType = () => {
  return (
    <div className="flex flex-col py-8 justify-between">
      <div className="w-10/12 mx-auto text-xs text-end">
        <p className="text-gray-400">STEP 01/03</p>
        <p className="font-semibold">Legal Info</p>
      </div>
      <div className="mx-auto grid w-7/12 gap-6 mb-10">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">
            Complete The Registration Process
          </h1>
          <p className="text-muted-foreground">Chose your Legal Status</p>
        </div>
        <div className="flex flex-col gap-5">
          <Link
            href={"/choose-type/Sign-Up"}
            className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg"
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
                src={"/icons/HoverBidderIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="hidden hoverDepositorIcon"
              />
              <div>
                <h3 className="font-semibold">Auto entrepreneur</h3>
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
          </Link>
          <Link
            href={"/choose-type/Sign-Up/bidder-Type/Company-Info"}
            className="flex justify-between items-center shadow border hover:border-primary p-5 rounded accounType hover:bg-neutralBg"
          >
            <div className="flex items-center gap-5">
              <Image
                src={"/icons/companyIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="depositorIcon"
              />
              <Image
                src={"/icons/HoverCompanyIcon.svg"}
                width={50}
                height={50}
                alt="shape"
                className="hidden hoverDepositorIcon"
              />
              <div>
                <h3 className="font-semibold">Company</h3>
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
          </Link>
        </div>
      </div>
      <p className="w-10/12 mx-auto text-sm">
        © 2024 Desky.ma. All Rights Reserved
      </p>
    </div>
  );
};

export default BidderType;
