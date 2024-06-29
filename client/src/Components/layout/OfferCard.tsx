
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { timeSince } from "../common/timeSince";
import CategoryBtnCard from "../common/CategoryBtnCard";

interface OfferCardProps {
  title: string & Number;
  date: Date & String & Number;
  location: string & Number;
  budget: number;
  Category: string[];
  Desc: string & Number;
  key: number;
  offerNumber: number;
  id: string & Number;
  lg : string | undefined;
  Content : any
}

const OfferCard: React.FC<OfferCardProps> = ({
  title,
  date,
  location,
  budget,
  Category,
  Desc,
  id,
  lg,
  Content
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  let OfferContent = Content ? Content : null;

  useEffect(() => {
    if (pRef.current) {
      const value = pRef.current.innerHTML;
      const maxLength: number = 100;
      const length: number = value.length;
      if (length > maxLength) {
        const trimmedText = value.substring(0, maxLength) + "....";
        pRef.current.innerHTML = trimmedText;
      }
    }
  }, []);
  return (
    <Link href={`/${lg}/offers/${id}`}  className="min-w-[300px] w-full md:w-full lg:w-[45vw]  xl:w-[46vw] shadow h-[210px]" >
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-md md:text-xl lg:text-xl xl:text-xl  font-bold">{title}</h2>
        <div className="flex text-xs xl:text-sm gap-5 mt-1 text-neutralGray">
          <p>{OfferContent('Posted')} {timeSince(date)}</p>
          <div className="flex gap-1">
            <Image
              src={"/icons/Subtract.svg"}
              alt={"Location"}
              width={15}
              height={15}
            />
            <p>{location}</p>
          </div>
          <p>
            {OfferContent('EstBudget')}: <span>{budget}</span>DH
          </p>
        </div>
        <p className="text-xs lg:text-sm mt-5 h-[40px]" ref={pRef}>
          {Desc}
        </p>
        <div className="mt-3">
          <div className="flex gap-8 text-xs xl:text-sm items-center">
            <div className="flex gap-2 items-center justify-center">
              <p className="text-neutralGray">{OfferContent('Cat')} :</p>
              <ul className="flex gap-2 items-center">
                {Category.map((c, index) => (
                  <CategoryBtnCard key={index} value={c}/>
                ))}
              </ul>
            </div>
            <p className="text-neutralGray">
            {OfferContent('Proposals')} :{" "}
              <span className="font-semibold text-secondary">Less than 5</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
