import CategoryBtn from "@/Components/common/CategoryBtn";
import Image from "next/image";

interface OfferCardProps {
  title: string & Number;
  date: Number;
  location: string & Number;
  budget: number;
  Category: string[];
}

const OfferCard : React.FC<OfferCardProps> = ({title, date, location, budget , Category}) => {
    console.log(Category)
  return (
    <div className="bg-white rounded-lg p-8" style={{width : "49%"}}>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="flex text-sm gap-5 mt-1 text-neutralGray">
            <p>Posted {date}</p>
            <div className="flex gap-1">
            <Image src={"/icons/Subtract.svg"} alt={"Location"} width={15} height={15}/>
            <p>{location}</p>
            </div>
            <p>Est.Budget: <span>{budget}</span>DH</p>
        </div>
        <p className="text-sm mt-5">Dear, We are contacting you as part of our search for a high quality resin 3D printer to meet our growing production needs...</p>
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
  )
}

export default OfferCard
