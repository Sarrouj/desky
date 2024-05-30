import CategoryBtn from "@/Components/common/CategoryBtn";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { timeSince } from "../common/timeSince";

interface OfferCardProps {
  title: string & Number;
  date: Date & String & Number;
  location: string & Number;
  budget: number;
  Category: string[];
  Desc: string & Number;
  key : number
  offerNumber : number;
  id: string & Number;
  // index : Number;
}

const OfferCard : React.FC<OfferCardProps> = ({ title, date, location, budget , Category, Desc, offerNumber, id}) => {

  const pRef = useRef<HTMLParagraphElement>(null);
  useEffect(()=>{
    if(pRef.current){
      const value = pRef.current.innerHTML ;
      const maxLength : number = 100;
      const length : number = value.length;
      if(length > maxLength) {
        const trimmedText = value.substring(0, maxLength) + '....';
        pRef.current.innerHTML = trimmedText;
      }
    }
  },[])
  return (
    <Link href={`./offers/${id}`}  style={{width : "49%"}}>
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex text-sm gap-5 mt-1 text-neutralGray">
            <p>Posted {timeSince(date)}</p>
            <div className="flex gap-1">
            <Image src={"/icons/Subtract.svg"} alt={"Location"} width={15} height={15}/>
            <p>{location}</p>
            </div>
            <p>Est.Budget: <span>{budget}</span>DH</p>
        </div>
        <p className="text-sm mt-5" ref={pRef}>{Desc}</p>
        <div className="mt-3">
            <div className="flex gap-8 text-sm items-center">
            <div className="flex gap-2 items-center justify-center">
                <p className="text-neutralGray">Category :</p>
                <ul className="flex gap-2 items-center ">
                {Category.map((c, index) => (
                  <CategoryBtn key={index} value={c} />
                ))}
                </ul>
            </div>
            <p className="text-neutralGray">Proposals : <span className="font-semibold text-secondary">Less than 5</span></p>
            </div>
        </div>
    </div>
    </Link>

  )
}

export default OfferCard
