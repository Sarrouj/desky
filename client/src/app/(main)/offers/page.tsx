'use client'

// React Hooks
import { useEffect } from "react"
// Components
import CallToAction from "@/Components/common/CallToAction"
import Header from "@/Components/layout/Header"     
import OfferCard from "@/Components/layout/OfferCard"
import Footer from "@/Components/layout/footer"
// ShadCn UI
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/Components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Input } from "@/Components/ui/input"
// Data
import { useBoundStore } from "@/lib/store"

const Offers : React.FC = () => {
    const offersData = useBoundStore((state) => state.offersData);
    const fetchOffers = useBoundStore((state) => state.fetchOffers);
    console.log(offersData);

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);
    
    if (offersData.length === 0) return <p>Loading...</p>;

  return (
    <>
        <div className="bg-white border-b-2 ">
            <Header/>
        </div>
        <main className="py-10 px-10 bg-neutralBg text-secondaryDarkBlue h-full">
            <section className="pt-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-semibold">Find The Best Deal For Your Business</h1>
                    <CallToAction href={""} value={"Post an offer | +10"}/>
                </div>
                <div className="mt-8 flex justify-between items-end">
                    <div className="">
                        <div className="flex gap-2">
                            <Input placeholder="Search" className="w-[400px] h-[35px]  border-2"/>
                            <Select>
                                <SelectTrigger className="w-[160px] h-[35px] border-2 text-sm">
                                    <SelectValue placeholder="Categories"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="w-[160px] h-[35px] border-2 text-sm">
                                    <SelectValue placeholder="Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Tangier">Tangier</SelectItem>
                                    <SelectItem value="Rabat">Rabat</SelectItem>
                                    <SelectItem value="Casablanca">Casablanca</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <ul className="flex items-center gap-2 text-sm mt-2">
                            <li className="bg-orange-300 text-white py-1.5 px-3.5 rounded-full cursor-pointer">Tangier</li>
                            <li className="bg-orange-300 text-white py-1.5 px-3.5 rounded-full cursor-pointer">Casablanca</li>
                            <li className="cursor-pointer text-primaryOrange font-semibold text-sm"><a href="">Clear Filters</a></li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="mt-5 flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2">
                        <p className="text-xs">Sort by</p>
                        <Select>
                            <SelectTrigger className="w-[90px] h-[32px] border-2 text-xs">
                                <SelectValue placeholder="Newest"/>
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="Newest" className="text-xs">Newest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                <div className="flex flex-wrap gap-6">
                {offersData.map((offer) => (
                    <OfferCard 
                        key={offer._id} 
                        title={offer.offer_title} 
                        date={offer.offer_deadLine} 
                        location={offer.offer_location}
                        budget={offer.offer_budget}
                        Category={offer.offer_category}
                    />
                ))}
                </div>
            </section>
            <section className="mt-5 flex justify-between">
                <div className="flex items-center gap-2">
                    <p className="text-xs">Offers Per Page</p>
                    <Select>
                        <SelectTrigger className="w-[60px] h-[32px] border-2 text-xs">
                            <SelectValue placeholder="10" />
                        </SelectTrigger>
                        <SelectContent className="w-[60px]">
                            <SelectItem value="10" >10 Offers</SelectItem>
                            <SelectItem value="20" >20 Offers</SelectItem>
                            <SelectItem value="30" >30 Offers</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Pagination>
                        <PaginationContent className="gap-1">
                            <PaginationItem >
                                <PaginationPrevious href="#" className="text-xs"/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="text-white text-xs bg-primaryOrange w-8 h-8 rounded-full p-1">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="text-primaryOrange text-xs rounded-full w-8 h-8">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" className="text-primaryOrange text-xs rounded-full w-8 h-8">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                            <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" className="text-xs"/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </section>
        </main>
        <div className="bg-neutralBg pt-10">
            <Footer/>
        </div>
    </>
  )
}

export default Offers
