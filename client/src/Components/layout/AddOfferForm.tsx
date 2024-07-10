import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/input";
import { Tabs } from "@/Components/ui/tabs";
import { Textarea } from "@/Components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";

import { Calendar } from "@/Components/ui/calendar"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useBoundStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// City Type
import { City } from "@/lib/Features/CitiesData";

const AddOfferForm = ({Language, Content} : {Language : string | undefined, Content: any}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [categoryOpen1, categorySetOpen1] = React.useState<boolean>(false);
  const [CategoryValue1, CategorySetValue1] = React.useState<string>("");
  const [categoryOpen2, categorySetOpen2] = React.useState<boolean>(false);
  const [CategoryValue2, CategorySetValue2] = React.useState<string>("");

    // Cities & Categories
    const [Cities, setCity] = useState<City[]>([]);
    const [Categories, setCategories] = useState<City[]>([]);
    const CitiesEN = useBoundStore((state) => state.CitiesEN);
    const CitiesFR = useBoundStore((state) => state.CitiesFR);
    const CategoriesEN: any = useBoundStore((state) => state.CategoriesEN);
    const CategoriesFR: any = useBoundStore((state) => state.CategoriesFR);

    // Language
  useEffect(() => {
    if (Language == "en") {
      setCity(CitiesEN);
      setCategories(CategoriesEN);
    } else {
      setCity(CitiesFR);
      setCategories(CategoriesFR);
    }
  }, [Language, CitiesEN, CitiesFR, CategoriesEN, CategoriesFR]);

  const { data: session, status } = useSession();

   // Offers Value
   const user_id: string | Blob  = session ? session.user?.id : '';
   const [title, setTitle] = useState("");
   const [CapitalizedTitle, setCapitalizedTitle] = useState<string>("");
   const [desc, setDesc] = useState("");
   const [location, setLocation] = useState("");
   const [category1, setCategory1] = useState("");
   const [category2, setCategory2] = useState("");
   const [budget, setBudget] = useState("");
   const [attachment, setAttachment] = useState<File | null | string | Blob>('');
   const [secondCategoryToggling, setSecondCategoryToggling] = useState<boolean>(true);
   const [arrCategory , setarrCategory] = useState<any>([]);
   const [date, setDate] = React.useState<any>(null);
  //  form validation msg
  const [titleErrorMsg, setTitleErrorMsg] = useState(false);
  const [descriptionErrorMsg, setDescriptionErrorMsg] = useState(false);
  const [budgetErrorMsg, setBudgetErrorMsg] = useState(false);
  const [locationErrorMsg, setLocationErrorMsg] = useState(false);
  const [deadlineErrorMsg, setDeadlineErrorMsg] = useState(false);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState(false);
 
   const getOfferDataPosting = useBoundStore((state) => state.getOfferDataPosting);
   const postOffer = useBoundStore((state) => state.postOffer);

    // empty Function 
   function emptyInputs() {
    setTitle("");
    setDesc("");
    setLocation("");
    setCategory1("");
    setCategory2("");
    setBudget("");
    setDate(null);
    setAttachment("");
    }  

    useEffect(()=>{
      let arr = [];
      if(category1 !== ''){
        arr.push(category1.charAt(0).toUpperCase() + category1.slice(1));
      }

      if(category2 !== ''){
        arr.push(category2.charAt(0).toUpperCase() + category2.slice(1));
      }
      setarrCategory(arr);
 
    },[category1, category2])

    useEffect(()=>{
      let Capitalized = title.toLowerCase().split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');

    setCapitalizedTitle(Capitalized);
    }, [title])

   const addOffer = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("offer_title", CapitalizedTitle);
    formData.append("offer_description", desc.charAt(0).toUpperCase() + desc.slice(1). toLowerCase());
    formData.append("offer_category", JSON.stringify(arrCategory));
    formData.append("offer_location", location.charAt(0).toUpperCase() + location.slice(1));
    formData.append("offer_deadline", date);
    formData.append("offer_budget", budget);
    if (attachment !== null) {
      formData.append("offer_attachment", attachment);
    } else {
      console.error('Attachment is null.');
    }
    formData.append("user_id", user_id);

    // form validation
    if(title == ""){
      setTitleErrorMsg(true);
    }
    if(desc == ""){
      setDescriptionErrorMsg(true);
    }
    if(budget == ""){
      setBudgetErrorMsg(true);
    }
    if(location == ""){
      setLocationErrorMsg(true);
    }
    if(date == null){
      setDeadlineErrorMsg(true);
    }
    if(category1 == ""){
      setCategoryErrorMsg(true);
    }

    if(title !== "" && desc !== "" && budget !== "" && location !== "" && category1 !== "" && date){
      getOfferDataPosting(formData);
      postOffer();
      emptyInputs();
      toast("Offer Are Added Successfully.");
    }
  };

  // FORM validation
  useEffect(()=>{

    if(title !== ""){
      setTitleErrorMsg(false);
    }
    if(desc !== ""){
      setDescriptionErrorMsg(false);
    }
    if(budget !== ""){
      setBudgetErrorMsg(false);
    }
    if(location !== ""){
      setLocationErrorMsg(false);
    }
    if(date){
      setDeadlineErrorMsg(false);
    }
    if(category1 !== ""){
      setCategoryErrorMsg(false);
    }

  }, [title, desc, budget, location, category1, date])

  // Second Category
  function secondCategory(){
    setSecondCategoryToggling(false);
  }

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 mb-10 w-full mx-auto">
            <Tabs>
              <div className="w-full gap-16 bg-white rounded-lg border shadow p-10 ">
                <div className="grid gap-4">
                  <div className="flex items-start w-full gap-2">
                    <div className="grid gap-2 w-2/4">
                      <Label htmlFor="title" className="text-lg font-semibold">
                        {Content('Title')}
                      </Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder={Content('titlePlaceHolder')}
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength="55"
                        className={`${titleErrorMsg ? "ring-0 border-2 border-red-600 focus:ring-0 focus-visible:ring-white focus-visible:ring-1" :  "" }`}
                      /> {
                        titleErrorMsg ?  <p className="text-xs text-red-600">{Content('errorMsg.title')}</p> : null
                      }
                    </div>
                    <div className="grid gap-2 w-2/4">
                    <Label htmlFor="title" className="text-lg font-semibold">
                      {Content('Location')}
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={`w-[100%] justify-between ${locationErrorMsg ? "ring-0 border-2 border-red-600 focus:ring-0 focus-visible:ring-white focus-visible:ring-1": "" }`}
                          onClick={() => setOpen(!open)}
                        >
                          {value
                            ? Cities.find((city) => city.value === value)?.label
                            : Content('selectLocation')}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[650px] p-0">
                        <Command>
                          <CommandInput placeholder={Content('search')} />
                          <CommandEmpty>{Content('NoCityFound')}</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {Cities.map((city, index) => (
                                <CommandItem
                                  key={index}
                                  value={city.value}
                                  onSelect={(currentValue) => {
                                    setValue(
                                      currentValue === value ? "" : currentValue
                                    );
                                    setLocation(
                                      currentValue === value ? "" : currentValue
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === city.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {city.label}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {
                      locationErrorMsg ?  <p className="text-xs text-red-600">{Content('errorMsg.Location')}</p> : null
                    }
                    </div>
                  </div>
                  <div className="grid gap-2 w-full">
                    <Label htmlFor="title" className="text-lg font-semibold">
                      {Content('Description')}
                    </Label>
                    <Textarea
                      placeholder={Content('DescriptionPlaceholder')}
                      required
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      maxLength="2000"
                      className={`${descriptionErrorMsg ? "ring-0 border-2 border-red-600 focus:ring-0 focus-visible:ring-white focus-visible:ring-1" :  "" }`}
                    />{
                      descriptionErrorMsg ? <p className="text-xs text-red-600">{Content('errorMsg.Description')}</p> : null
                    }
                  </div>
                  <div className="flex items-start w-full gap-2">
                    <div className="grid gap-2 w-2/4">
                      <Label htmlFor="Deadline" className="text-lg font-semibold">
                        {Content('Deadline')}
                      </Label>
                      <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground" , `${deadlineErrorMsg ? "ring-0 border-2 border-red-600 focus:ring-0 focus-visible:ring-white focus-visible:ring-1" :  "" }`
                                  )} 
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {date ? format(date, "PPP") : <span>{Content('datePlaceholder')}</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={date}
                                  onSelect={setDate}
                                  initialFocus
                                />
                              </PopoverContent>
                      </Popover>
                      {
                        deadlineErrorMsg ? <p className="text-xs text-red-600">{Content('errorMsg.Deadline')}</p> : null
                      }
                    </div>
                    <div className="grid gap-2 w-2/4">
                      <Label htmlFor="Budget" className="text-lg font-semibold">
                        {Content('Budget')}
                      </Label>
                      <Input
                        id="Budget"
                        type="number"
                        placeholder={Content('BudgetPlaceholder')}
                        required
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className={`${budgetErrorMsg ? "ring-0 border-2 border-red-600 focus:ring-0 focus-visible:ring-white focus-visible:ring-1" :  "" }`}
                      />{
                        budgetErrorMsg ? <p className="text-xs text-red-600">{Content('errorMsg.Budget')}</p> : null
                      }
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="grid gap-2 w-full">
                        <div className="flex items-end  justify-between mr-3">
                          <Label htmlFor="title" className="text-lg font-semibold">
                            {Content('Category')}
                          </Label>
                        </div>
                        <Popover open={categoryOpen1} onOpenChange={categorySetOpen1}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={categoryOpen1}
                              className={`w-[100%] justify-between ${categoryErrorMsg ? "ring-0 border-2 border-red-600 focus:ring-0 focus-visible:ring-white focus-visible:ring-1" :  "" }`}
                              onClick={() => categorySetOpen1(!categoryOpen1)}
                            >
                              {CategoryValue1
                                ? Categories.find(
                                    (categorie) => categorie.value === CategoryValue1
                                  )?.label
                                : Content('SelectCategory')}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className={`${secondCategoryToggling ? "w-[1200px]" : "w-[650px]"} p-0`}>
                            <Command>
                              <CommandInput placeholder={Content('search')} />
                              <CommandEmpty>{Content('NoCategoryFound')}</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {Categories.map((cat, index) => (
                                    <CommandItem
                                      key={index}
                                      value={cat.value}
                                      onSelect={(currentValue) => {
                                        CategorySetValue1(
                                          currentValue === CategoryValue1
                                            ? ""
                                            : currentValue
                                        );
                                        setCategory1(
                                          currentValue === CategoryValue1
                                            ? ""
                                            : currentValue
                                        );
                                        categorySetOpen1(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          CategoryValue1 === cat.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {cat.label}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                    </div>
                    {
                      secondCategoryToggling ? 
                      <Button className="text-white" onClick={secondCategory}>{Content('AddMore')}</Button> :
                      <div className="grid gap-2 w-full">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="title" className="text-lg font-semibold">
                            {Content('Category')}
                          </Label>
                          <p className="text-neutralGray text-sm">({Content('Optional')})</p>
                        </div>
                        <Popover open={categoryOpen2} onOpenChange={categorySetOpen2}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={categorySetOpen2}
                              className="w-[100%] justify-between"
                              onClick={() => categorySetOpen2(!categoryOpen2)}
                            >
                              {CategoryValue2
                                ? Categories.find(
                                    (categorie) => categorie.value === CategoryValue2
                                  )?.label
                                : Content('SelectCategory')}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[650px] p-0">
                            <Command>
                              <CommandInput placeholder={Content('search')} />
                              <CommandEmpty>{Content('NoCategoryFound')}</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {Categories.map((city, index) => (
                                    <CommandItem
                                      key={index}
                                      value={city.value}
                                      onSelect={(currentValue) => {
                                        CategorySetValue2(
                                          currentValue === CategoryValue2
                                            ? ""
                                            : currentValue
                                        );
                                        setCategory2(
                                          currentValue === CategoryValue2
                                            ? ""
                                            : currentValue
                                        );
                                        categorySetOpen2(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          CategoryValue2 === city.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {city.label}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    }
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="Attachment"
                        className="text-lg font-semibold"
                      >
                        {Content('Attachment')}
                      </Label>
                      <p className="text-neutralGray text-sm">({Content('Optional')})</p>
                    </div>
                    <Input
                      id="Attachment"
                      type="file"
                      className="cursor-pointer"
                      required
                      onChange={(e) => setAttachment(e.target.files ? e.target.files[0] : "")}
                    />
                  </div>
                    <Button
                    type="submit"
                    className="w-full text-white"
                    onClick={(e) => addOffer(e)}
                    >
                    {Content('CallToAction')}
                    </Button>
                </div>
              </div>
            </Tabs>
          </div>
  )
}

export default AddOfferForm
