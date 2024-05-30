'use client'
import CategoryBtn from "@/Components/common/CategoryBtn"
import Image from "next/image"
import { useBoundStore } from "@/lib/store"
import { useEffect } from "react"
import { timeSince } from "@/Components/common/timeSince"

const Details= ({ params } : { params : any}) => {
  const { details } = params;
  const detailsData = useBoundStore((state) => state.offerData);
  const getOfferID = useBoundStore((state) => state.getOfferID);
  const fetchDetails = useBoundStore((state)=> state.fetchOfferDetails);
  const CategoriesElement = detailsData.offer_category;
  
  useEffect(()=> {
    if(details){
      getOfferID(details);
      fetchDetails();
    }
  }, [details, fetchDetails, getOfferID])

  

  return (
    <main className='py-16 px-20 bg-neutralBg text-secondaryDarkBlue'>
      <section className='flex'>
        <div className=' w-9/12 border-r-2'>
          <div className="border-b-2 pb-12 pr-12">
            <h1 className='text-3xl font-bold mb-2'>{detailsData.offer_title}</h1>
            <div className='flex gap-10 text-neutralGray'>
              <p>{timeSince(detailsData.offer_DoP)}</p>
              <div className='flex gap-2'>
                <p>Targetd Location: </p>
                <ul className='flex gap-1.5'>
                  <li >{detailsData.offer_location}</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-3 items-center mt-8">
              <h6 className="font-semibold">Category : </h6>
              <ul className="flex gap-2">
                {CategoriesElement ? CategoriesElement.map((c, index)=>(
                  <CategoryBtn value={c} key={index}/>
                )) : <CategoryBtn value={"Loading ..."}/>}
              </ul>
            </div>
          </div>
          <div className="py-12 pr-12 border-b-2">
            <p className="">{detailsData.offer_description}</p>
            </div>
            <div className="py-16 flex items-center justify-between	pr-72	border-b-2">
              <div className="flex items-center gap-2">
                <Image src={"/icons/coin.svg"} width={22} height={22} alt="shape" className=""/>
                <h6 className="font-bold">Est.budget: <span className="font-medium">{detailsData.offer_budget} DH</span></h6>
              </div>
              <div className="flex items-center gap-2">
                <Image src={"/icons/clock.svg"} width={20} height={20} alt="shape" className=""/>
                <h6 className="font-bold">Deadline: <span className="font-medium">Jan 20, 2024</span></h6>
              </div>
            </div>
            <div className="py-10 pr-20">
              <h3 className="font-bold text-lg mb-8">Attachements <span className="text-primary font-medium">(2)</span></h3>
              <div className="flex items-center gap-2 cursor-pointer mb-2">
                <Image src={"/icons/file.svg"} width={13} height={13} alt="shape" className=""/>
                <p className="text-primary underline underline-offset-1">Screenshot 2567-04-25 at 13.38.59.png <span>(2.1MB)</span></p>
              </div>
              <div className="flex items-center gap-2 cursor-pointer mb-2">
                <Image src={"/icons/file.svg"} width={13} height={13} alt="shape" className=""/>
                <p className="text-primary underline underline-offset-1">files.pdf <span>(1KB)</span></p>
              </div>
            </div>
        </div>
        <div className='pl-12 w-3/12 '>
          <div className="flex flex-col items-center gap-3" >
            <div className="rounded-full
            bg-slate-200 text-blue-400
             w-24 h-24 flex items-center
             justify-center text-4xl">SZ</div>
            <div className="text-center">
              <h2 className="font-bold text-2xl">Sarrouj <span className="text-primary">Zaid</span></h2>
              <h4 className="font-semibold">M.D.M S.A.R.L</h4>
            </div>
          </div>
          <div className="mt-16 flex flex-col gap-5">
            <div className="">
              <div className="flex gap-1 items-center">
                <Image src={"/icons/star.svg"} width={20} height={20} alt="shape" className=""/>
                <Image src={"/icons/star.svg"} width={20} height={20} alt="shape" className=""/>
                <Image src={"/icons/star.svg"} width={20} height={20} alt="shape" className=""/>
                <Image src={"/icons/star.svg"} width={20} height={20} alt="shape" className=""/>
                <Image src={"/icons/star.svg"} width={20} height={20} alt="shape" className=""/>
                <p>4.97</p>
              </div>
              <p>4.97 of 25 reviews</p>
            </div>
            <div>
              <p className="font-bold">Tech & IT</p>
              <p>Small Company (2-9 people) </p>
            </div>
            <div>
              <p className="font-bold">Casablanca</p>
              <p>Avenue Sidi Boukhari N° 26 Casablanca</p>
            </div>
            <div>
              <p className="font-bold">9 Offers posted</p>
              <p>2 active Offers</p>
            </div>
            <div>
              <p className="font-bold">Activity in This Offer:</p>
              <p>Proposals : <span>Less than 5</span></p>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <button className="text-white bg-primary rounded-full w-10/12 py-2">Apply Now</button>
          </div>
        </div>
      </section>
      <section className="mt-20 border-2 rounded-lg py-10">
          <div className="border-b-2 px-10">
            <h3 className="font-bold text-lg mb-8">Reviews History <span className="text-primary font-medium">(2)</span></h3>
          </div>
          <div className="px-10 py-10 flex flex-col gap-12">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-full
            bg-slate-200 text-blue-400
             w-10 h-10 flex items-center
             justify-center">AK</div>
                <h6 className="font-semibold">Alex k.</h6>
              </div>
              <div className="flex justify-between items-center mt-3">
                  <h3 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h3>
                  <p className="text-neutralGray">Jan 20, 2024</p>
              </div>
              <div className="mt-3">
                <div className="flex gap-1 items-center">
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <p>5</p>
                </div>
                <p className="text-sm mt-1 w-10/12	">Working at Sam.AI has been an incredible journey so far. The technology were building is truly cutting-edge, and being a part of a team thats revolutionizing how people achhieve their goals is immensely fulfilling. </p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-full
            bg-slate-200 text-blue-400
             w-10 h-10 flex items-center
             justify-center">AK</div>
                <h6 className="font-semibold">Alex k.</h6>
              </div>
              <div className="flex justify-between items-center mt-3">
                  <h3 className="text-lg font-semibold">Digital Marketing Expert - Google and Facebook Ads</h3>
                  <p className="text-neutralGray">Jan 20, 2024</p>
              </div>
              <div className="mt-3">
                <div className="flex gap-1 items-center">
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <Image src={"/icons/ReviewStart.svg"} width={20} height={20} alt="shape" />
                  <p>5</p>
                </div>
                <p className="text-sm mt-1 w-10/12	">Working at Sam.AI has been an incredible journey so far. The technology were building is truly cutting-edge, and being a part of a team thats revolutionizing how people achhieve their goals is immensely fulfilling. </p>
              </div>
            </div>
          </div>
      </section>
    </main>
  )
}

export default Details