
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { timeSince } from "../common/timeSince";
import CategoryBtnCard from "../common/CategoryBtnCard";
import { MapPin, Banknote } from "lucide-react";

interface OfferCardProps {
  title: string & Number;
  date: Date & String & Number;
  location: string & Number;
  budget: number;
  Category: string[];
  Desc: string & Number;
  Proposals : any;
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
  Proposals,
  id,
  lg,
  Content
}) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  let OfferContent = Content ? Content : null;
  let ProposalsNumber = Proposals ? Proposals.length : null;

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
    <Link href={`/${lg}/offers/${id}`}>
      <div className="bg-white transition-colors duration-300 hover:bg-gray-50 rounded-lg p-4 lg:p-6 xl:p-8 shadow">
        <h2 className="text-md md:text-lg xl:text-xl font-bold">{title}</h2>
        <div className="flex text-xs xl:text-sm gap-5 mt-1 text-neutralGray">
          <p className="hidden md:block">{OfferContent('Posted')} {timeSince(date)}</p>
          <div className="flex gap-1 items-center">
            <MapPin size={15} className="text-primary"/>
            <p>{location}</p>
          </div>
          <p >
            {OfferContent('EstBudget')}: <span>{budget}</span> DH
          </p>
        </div>
        <p className="text-xs lg:text-sm mt-5 h-[40px]" ref={pRef}>
          {Desc}
        </p>
        <div className="mt-3">
          <div className="flex gap-8 text-xs xl:text-sm items-center">
            <div className="flex gap-2 items-center justify-center">
              <p className="text-neutralGray hidden md:block">{OfferContent('Cat')} :</p>
              <ul className="flex gap-2 items-center">
                {Category.map((c, index) => (
                  <CategoryBtnCard key={index} value={c}/>
                ))}
              </ul>
            </div>
            <p className="text-neutralGray hidden md:block">
            {OfferContent('Proposals')} :{" "}
              <span className="font-semibold text-secondary">{ProposalsNumber}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
