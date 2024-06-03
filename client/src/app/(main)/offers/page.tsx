'use client'

// React Hooks
import * as React from "react"
import { useEffect, useState } from "react"
// Components
import CallToAction from "@/Components/common/CallToAction"
import OfferCard from "@/Components/layout/OfferCard"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/Components/ui/select"
import { Input } from "@/Components/ui/input"
import { useBoundStore } from "@/lib/store"
import PopoverCom from "@/Components/common/PopoverComponent"
import OfferCardSkeleton from "@/Components/layout/OfferCardSkeleton"



const Offers : React.FC = () => {
    const [categoryValue, categorySetValue] = React.useState<string>("");
    const [cityValue, citySetValue] = React.useState<string>("");
    // filters UI
    let [filter , setFilter] = useState< (string | number)[]>([]);
    let [searchValue, setSearchValue] = useState('');
  
    const offersData = useBoundStore((state) => state.offersData);
    const fetchOffers = useBoundStore((state) => state.fetchOffers);
    const Cities  = useBoundStore((state) => state.Cities);
    const Categories : any  = useBoundStore((state) => state.Categories);
    const getSearchValue = useBoundStore((state) => state.getSearchValue);
    const getCategoryValue = useBoundStore((state) => state.getCategoryValue);
    const getCityValue = useBoundStore((state) => state.getCityValue);
    const fetchSearchedOffers = useBoundStore((state)=> state.fetchSearchedOffers);
    const searchedData = useBoundStore((state)=> state.searchedData);
    const offersIsLoadig = useBoundStore((state)=> state.offerIsLoading);


    // add Filter
    useEffect(()=>{
        if (categoryValue !== "") {
            if (cityValue !== "") {
                if (searchValue !== "") {
                    setFilter([categoryValue, cityValue, searchValue]);
                } else {
                    setFilter([categoryValue, cityValue]);
                }
            } else if (searchValue !== "") {
                setFilter([categoryValue, searchValue]);

            } else {
                setFilter([categoryValue]);
            }
        } else if (cityValue !== "") {
            if (searchValue !== "") {
                setFilter([cityValue, searchValue]);
            } else {
                setFilter([cityValue]);
            }
        } else if (searchValue !== "") {
            setFilter([searchValue]);
        }else{
            setFilter([]);
        }

    getSearchValue(searchValue);
    getCategoryValue(categoryValue);
    getCityValue(cityValue);
    fetchSearchedOffers();

    }, [categoryValue, cityValue, searchValue])


    // Clear Filters UI
    function clearFilters(){
        setFilter([]);
        categorySetValue("");
        citySetValue("");
        setSearchValue("");
    }
    
    useEffect(()=>{
        offersIsLoadig;
    }, [searchedData])
    

  return (
    <>
        <main className="py-10 px-10 bg-neutralBg text-secondaryDarkBlue h-full">
            <section className="pt-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold">Find The Best Deal For Your Business</h1>
                    <CallToAction href={""} value={"Post an offer | +10"} />
                </div>
                <div className="mt-8 flex justify-between items-end">
                    <div className="">
                        <div className="flex gap-2">
                            <Input placeholder="Search" className="w-[200px] md:w-[250px] lg:w-[300px] xl:w-[400px]
                              h-[30px] md:h-[30px] lg:h-[32px] xl:h-[35px]  border-2 text-xs md:text-xs lg:text-sm xl:text-md
                              " value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                            <PopoverCom data={Categories} type={"Categories"} value={categoryValue} setValue={categorySetValue}/>
                            <PopoverCom data={Cities} type={"Location"} value={cityValue} setValue={citySetValue}/>
                        </div>
                        <ul className="flex items-center gap-2 text-sm mt-2">
                            {filter.map((act, index)=> (
                                <li key={index} className="bg-orange-300 text-white py-1.5 px-3.5 rounded-full cursor-pointer">
                                    <p className="text-sm text-white">{act}</p>
                                </li>
                            ))}
                            {
                                filter.length !== 0 ? (
                                    <li className="cursor-pointer text-primaryOrange font-semibold text-sm " onClick={() => clearFilters()}>Clear Filters</li>
                                )
                                : null
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <section className="mt-5 flex flex-col items-end gap-3">
                <div className="flex justify-between items-end w-full">
                    <div className="flex gap-1 text-xs  lg:text-sm xl:text-sm">
                        <p>{searchedData.length}</p>
                        {searchedData.length > 1  ?
                            <p> Results</p> :
                            <p> Result</p>
                        }
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs">Sort by</p>
                        <Select>
                            <SelectTrigger className="w-[80px] md:w-[90px] xl:w-[90px] h-[28px] md:h-[28px] lg:h-[30px] xl:h-[32px] border-2 text-[10px] md:text-xs">
                                <SelectValue placeholder="Newest"/>
                            </SelectTrigger>
                            <SelectContent >
                                <SelectItem value="Newest" className="text-xs">Newest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-start items-start flex-wrap gap-6 w-full min-h-screen">
                {
                    offersIsLoadig == false ? 
                    searchedData.length !== 0 ? 
                        searchedData.map((offer, index) => (
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
                            /> 
                        )) : ( filter.length !== 0 ?
                            <div className="container mx-auto px-4 py-20 text-center">
                                <h2 className="text-2xl font-bold mb-4">No Results Found</h2>
                                <p className="text-gray-600">We couldn&apos;t find any matches for your search criteria. Please try again with different keywords or filters.</p>
                            </div> :   Array.from({ length: 10 }).map((_, index) => (
                                <OfferCardSkeleton key={index} />
                                ))
                        )
                    : 
                    Array.from({ length: 10 }).map((_, index) => (
                        <OfferCardSkeleton key={index} />
                    ))
                
                }
                </div>
            </section>
            <section className="mt-5 flex justify-end">
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
    </>
  )
}

export default Offers
