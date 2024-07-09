import Link from "next/link";
import axios from "axios";

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

import { Check, ChevronsUpDown, CircleCheck } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useBoundStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// City Type
import { City } from "@/lib/Features/CitiesData";

const AddOfferForm = ({ Language }: { Language: string | undefined }) => {
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
  const user_id: string | Blob = session ? session.user?.id : "";
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [attachment, setAttachment] = useState("");
  const [secondCategoryToggling, setSecondCategoryToggling] =
    useState<boolean>(true);
  const [arrCategory, setArrCategory] = useState<any>([]);

  const getOfferDataPosting = useBoundStore(
    (state) => state.getOfferDataPosting
  );
  const postOffer = useBoundStore((state) => state.postOffer);

  // empty Function
  function emptyInputs() {
    setTitle("");
    setDesc("");
    setLocation("");
    setCategory1("");
    setBudget("");
    setDeadline("");
    setAttachment("");
  }

  useEffect(() => {
    let arr = [];
    if (category1 !== "") {
      arr.push(category1);
    }

    if (category2 !== "") {
      arr.push(category2);
    }
    setArrCategory(arr);
  }, [category1, category2]);

  const addOffer = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("offer_title", title);
    formData.append("offer_description", desc);
    formData.append("offer_category", JSON.stringify(arrCategory));
    formData.append("offer_location", location);
    formData.append("offer_deadline", deadline);
    formData.append("offer_budget", budget);
    formData.append("offer_attachment", attachment);
    formData.append("user_id", user_id);

    getOfferDataPosting(formData);
    postOffer();
    emptyInputs();
    toast("Offer Are Added Successfully.");
  };

  // Second Category
  function secondCategory() {
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
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Type your title here."
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2 w-2/4">
                <Label htmlFor="title" className="text-lg font-semibold">
                  Location
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[100%] justify-between"
                      onClick={() => setOpen(!open)}
                    >
                      {value
                        ? Cities.find((city) => city.value === value)?.label
                        : "Select your Offer Location ..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[650px] p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>No City found.</CommandEmpty>
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
              </div>
            </div>
            <div className="grid gap-2 w-full">
              <Label htmlFor="title" className="text-lg font-semibold">
                Description
              </Label>
              <Textarea
                placeholder="Type your description here."
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="flex items-start w-full gap-2">
              <div className="grid gap-2 w-2/4">
                <Label htmlFor="Deadline" className="text-lg font-semibold">
                  Deadline
                </Label>
                <Input
                  id="Deadline"
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="grid gap-2 w-2/4">
                <Label htmlFor="Budget" className="text-lg font-semibold">
                  Budget
                </Label>
                <Input
                  id="Budget"
                  type="number"
                  placeholder="Type your Budget Here"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <div className="grid gap-2 w-full">
                <Label htmlFor="title" className="text-lg font-semibold">
                  Category
                </Label>
                <Popover open={categoryOpen1} onOpenChange={categorySetOpen1}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={categoryOpen1}
                      className="w-[100%] justify-between"
                      onClick={() => categorySetOpen1(!categoryOpen1)}
                    >
                      {CategoryValue1
                        ? Categories.find(
                            (categorie) => categorie.value === CategoryValue1
                          )?.label
                        : "Select your Offer Category..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={`w-full p-0`}>
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>No City found.</CommandEmpty>
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
              {secondCategoryToggling ? (
                <Button className="text-white" onClick={secondCategory}>
                  Add More
                </Button>
              ) : (
                <div className="grid gap-2 w-full">
                  <Label htmlFor="title" className="text-lg font-semibold">
                    Category
                  </Label>
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
                          : "Select your Offer Category..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[650px] p-0">
                      <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandEmpty>No City found.</CommandEmpty>
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
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="Attachment" className="text-lg font-semibold">
                Attachment
              </Label>
              <Input
                id="Attachment"
                type="file"
                className="cursor-pointer"
                required
                onChange={(e) => setAttachment(e.target.files[0])}
              />
            </div>
            <Button
              type="submit"
              className="w-full text-white"
              onClick={(e) => addOffer(e)}
            >
              ADD
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default AddOfferForm;
