'use client'

// React Hooks
import * as React from "react"
import { useEffect, useState } from "react"
// Components
import CallToAction from "@/Components/common/CallToAction"
import OfferCard from "@/Components/layout/OfferCard"
// ShadCn UI
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
//   } from "@/Components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/Components/ui/select"
import { Input } from "@/Components/ui/input"
import { useBoundStore } from "@/lib/store"
import PopoverCom from "@/Components/common/PopoverComponent"
import OfferCardSkeleton from "@/Components/layout/OfferCardSkeleton"
import Header from "@/Components/layout/Header" 
import { useSession } from "next-auth/react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
  } from "@/Components/ui/tooltip"

import { Button } from "@/Components/ui/Button"
import Link from "next/link"
import { Skeleton } from "@/Components/ui/skeleton"


// Internationalization
import {useTranslations} from 'next-intl';


const Offers : React.FC = () => {
    const [categoryValue, categorySetValue] = React.useState<string>("");
    const [cityValue, citySetValue] = React.useState<string>("");
    const [selectedValue, setSelectedValue] = React.useState<string>('Oldest');
    const [sortedData, setSortedData] = React.useState<any>();

    // filters UI
    let [filter , setFilter] = useState< (string | number)[]>([]);
    let [searchValue, setSearchValue] = useState('');
    const CitiesEN  = useBoundStore((state) => state.CitiesEN);
    const CitiesFR  = useBoundStore((state) => state.CitiesFR);
    const CategoriesEN : any  = useBoundStore((state) => state.CategoriesEN);
    const CategoriesFR : any  = useBoundStore((state) => state.CategoriesFR);
    const getSearchValue  = useBoundStore((state) => state.getSearchValue);
    const getCategoryValue = useBoundStore((state) => state.getCategoryValue);
    const getCityValue = useBoundStore((state) => state.getCityValue);
    const fetchSearchedOffers = useBoundStore((state)=> state.fetchSearchedOffers);
    const searchedData = useBoundStore((state)=> state.searchedData);
    const offersIsLoadig = useBoundStore((state)=> state.offerIsLoading);

    
    // Session
    const { data: session, status } = useSession();
    const userRole = session ? session?.user.role : null;
    const [Language, setLanguage] = useState('fr');

    // Language
    useEffect(()=>{
        let lg = JSON.parse(localStorage.getItem('lg'));
        setLanguage(lg);
        searchedData;
    }, [Language, searchedData])


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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryValue, cityValue, searchValue])


    // Clear Filters UI
    function clearFilters(){
        setFilter([]);
        categorySetValue("");
        citySetValue("");
        setSearchValue("");
    }
    
    
    function handleSorting(value : any){
        setSelectedValue(value)
     
    }

    useEffect(()=>{
        let sortData = [...searchedData];
        if(selectedValue == "Newest"){
            sortData.sort((a : any, b: any) => new Date(b.offer_DoP) - new Date(a.offer_DoP));
        } else if(selectedValue == "Oldest"){
            sortData.sort((a, b) => new Date(a.offer_DoP) - new Date(b.offer_DoP));
        }
        setSortedData(sortData);
    }, [selectedValue, searchedData])

   
    
    // Content
    const NavbarContent = useTranslations('NavBar');
    const OffersPageContent = useTranslations('Offers');
    const OfferContent = useTranslations('offer');

  return (
    <>
        <div className="bg-white border-b-2 ">
            <Header NavbarContent={NavbarContent}  HomePage={'hover:text-primary'} Offers={'text-primary font-semibold '} FAQ={'hover:text-primary'} AboutUS={'hover:text-primary'}/>
        </div>
        <main className="py-10 px-10 bg-neutralBg text-secondaryDarkBlue h-full">
            <section className="pt-5">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl  font-semibold">{OffersPageContent('Title')}</h1>
                    { userRole !== null ?
                    userRole == 'depositor' ? 
                        <Link href={`/${Language}/Create-Offer`}>
                            <Button className="text-white">{OffersPageContent('CallToAction')}</Button>
                        </Link>

                    : 
                 <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger className="bg-orange-200 text-white py-3 px-4 text-sm rounded-md">
                        {OffersPageContent('CallToAction')}
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs text-center">{OffersPageContent('CallToActionPopMsg1')} <br /> {OffersPageContent('CallToActionPopMsg2')}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider> :
                  <div className="flex flex-col gap-2 items-end">
                    <Skeleton className="w-40 h-3 bg-gray-200"/>
                    <Skeleton className="w-32 h-3 bg-gray-200"/>
                  </div>
                 }
                        
                </div>
                <div className="mt-8 flex justify-between items-end">
                    <div className="">
                        <div className="flex gap-2">
                            <Input placeholder={OffersPageContent('SearchPlaceholder')} className="w-[200px] md:w-[250px] lg:w-[300px] xl:w-[400px]
                              h-[30px] md:h-[30px] lg:h-[32px] xl:h-[35px]  border-2 text-xs md:text-xs lg:text-sm xl:text-md
                              " value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                              {Language == "en" ?
                                <>
                                     <PopoverCom data={CategoriesEN} type={"Categories"} value={categoryValue} setValue={categorySetValue} search={'Search...'} notFound={"No Category found."}/> 
                                     <PopoverCom data={CitiesEN} type={"Location"} value={cityValue} setValue={citySetValue} search={'Search...'}  notFound={"No City found."}/>
                                </>
                                 :
                                <>
                                    <PopoverCom data={CategoriesFR} type={"catégories"} value={categoryValue} setValue={categorySetValue} search={'Recherche...'} notFound={"Aucune catégorie trouvée."}/> 
                                    <PopoverCom data={CitiesFR} type={"Ville"} value={cityValue} setValue={citySetValue} search={'Recherche...'}  notFound={"Aucune ville trouvée."}/>
                                </>
                            }
                            
                        </div>
                        <ul className="flex items-center gap-2 text-sm mt-2">
                            {filter.map((act, index)=> (
                                <li key={index} className="bg-orange-300 text-white py-1.5 px-3.5 rounded-full cursor-pointer">
                                    <p className="text-sm text-white">{act}</p>
                                </li>
                            ))}
                            {
                                filter.length !== 0 ? (
                                    <li className="cursor-pointer text-primaryOrange font-semibold text-sm " onClick={() => clearFilters()}>{OffersPageContent('ClearFilters')}</li>
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
                            <p> {OffersPageContent('Results')}</p> :
                            <p> {OffersPageContent('Result')}</p>
                        }
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs">{OffersPageContent('SortBy')}</p>
                        <Select onValueChange={handleSorting}>
                            <SelectTrigger className="w-[80px] md:w-[90px] xl:w-[90px] h-[28px] md:h-[28px] lg:h-[30px] xl:h-[32px] border-2 text-[10px] md:text-xs">
                                <SelectValue placeholder={OffersPageContent('Oldest')}>{selectedValue}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Newest" className="text-xs" >{OffersPageContent('Newest')}</SelectItem>
                                <SelectItem value="Oldest" className="text-xs">{OffersPageContent('Oldest')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex justify-start items-start flex-wrap gap-6 w-full min-h-screen">
                {
                    offersIsLoadig == false ? 
                    searchedData.length !== 0 ? 
                    sortedData ?  sortedData.map((offer : any, index : number) => (
                                offer.offer_state == "open" ?
                                    <OfferCard 
                                        key={offer._id} 
                                        title={offer.offer_title} 
                                        date={offer.offer_deadLine} 
                                        location={offer.offer_location}
                                        budget={offer.offer_budget}
                                        Category={offer.offer_category}
                                        Desc={offer.offer_description}
                                        offerNumber={index + 1}
                                        Proposals ={offer.offer_apply}
                                        id={offer._id}
                                        lg={Language}
                                        Content={OfferContent}
                                    /> :
                                null
                            )) : ( filter.length !== 0 ?
                                <div className="container mx-auto px-4 py-20 text-center">
                                    <h2 className="text-2xl font-bold mb-4">{OffersPageContent('NotFoundMsg')}</h2>
                                    <p className="text-gray-600">{OffersPageContent('NotFoundMsgDesc')}</p>
                                </div> :   Array.from({ length: 10 }).map((_, index) => (
                                    <OfferCardSkeleton key={index} />
                                    ))
                            ) : null
                    : 
                    Array.from({ length: 10 }).map((_, index) => (
                        <OfferCardSkeleton key={index} />
                    ))
                
                }
                </div>
            </section>
            {/* <section className="mt-5 flex justify-end">
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
            </section> */}
        </main>
    </>
  )
}

export default Offers
