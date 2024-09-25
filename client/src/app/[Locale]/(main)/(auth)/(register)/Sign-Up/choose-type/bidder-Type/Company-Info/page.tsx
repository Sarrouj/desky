"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronsUpDown } from "lucide-react";
import axios from "axios";

// Shadcn UI
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";

// Internationalization
import { useTranslations } from "next-intl";

// import Zustand Store
import { useBoundStore } from "@/lib/store";
import { City } from "@/lib/Features/CitiesData";

const CompanyInfo = () => {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [cr, setCr] = useState("");
  const [size, setSize] = useState("");
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState<(string | number)[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session, status } = useSession();
  const [Language, setLanguage] = useState();
  const [Cities, setCity] = useState<City[]>([]);

  const CitiesEN = useBoundStore((state) => state.CitiesEN);
  const CitiesFR = useBoundStore((state) => state.CitiesFR);

  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  // Language
  useEffect(() => {
    if (Language == "en") {
      setCity(CitiesEN);
    } else {
      setCity(CitiesFR);
    }
  }, [Language, CitiesEN, CitiesFR]);

  // Content
  const ChooseTypeContent = useTranslations("Auth.CompanyInformation");

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = `/${Language}/bidder-dashboard`;
    }
  }, [status, Language]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (activities.length === 0) {
      setError(ChooseTypeContent("RequiredAct"));
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BackendURL}/add/bidder/company`,
        {
          email,
          company_type: type,
          company_name: name,
          company_phoneNumber: phoneNumber,
          company_address: address,
          company_location: location,
          company_CR: cr,
          company_DoA: activities,
          company_size: size,
        }
      );

      if (response && response.data && response.data.success) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          setError(result.error);
        } else if (result) {
          setSuccess("registered successfully");
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          window.location.href = `/${Language}/`;
        }
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        console.error("API Error:", error);
        setError("Failed to register. Please try again.");
      }
    }
  };

  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [next, setNext] = useState<boolean>(false);

  function addActivity() {
    if (activity.trim() !== "") {
      setActivities((prevActivities) => [...prevActivities, activity]);
      setActivity("");
    }
  }

  function removeActivity(i: number) {
    let filteredActivities = activities.filter((act, index) => index !== i);
    setActivities(filteredActivities);
  }

  return (
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <div className="w-full text-xs text-end flex justify-between px-5">
        <Link
          className="flex items-center gap-2"
          href={`/${Language}/sign-up/choose-type/bidder-type`}
        >
          <Image
            src={"/icons/arrowBack.svg"}
            width={13}
            height={13}
            alt="shape"
            className=""
          />
          <p className="font-semibold">{ChooseTypeContent("Back")}</p>
        </Link>
        <div>
          <p className="text-gray-400">{ChooseTypeContent("Step")}</p>
          <p className="font-semibold">{ChooseTypeContent("LegalInfo")}</p>
        </div>
      </div>
      <div className="mx-auto grid w-full px-5 sm:px-32 md:px-40 lg:px-16 pt-10 pb-16 sm:py-20 xl:py-0 xl:px-0 xl:w-7/12 gap-6">
        <div className="grid gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">
            {ChooseTypeContent("title")}
          </h1>
          <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
            {ChooseTypeContent("Desc")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {next == false ? (
            <>
              {" "}
              <div className="grid gap-2">
                <Label
                  htmlFor="type"
                  className="text-xs sm:text-sm md:text-base"
                >
                  {ChooseTypeContent("type")}
                </Label>
                <Select onValueChange={(value) => setType(value)}>
                  <SelectTrigger className="w-full text-xs sm:text-sm ">
                    <SelectValue placeholder="Select your Company Type" />
                  </SelectTrigger>
                  <SelectContent className="w-[400px] sm:w-[550px] md:w-[400px] lg:w-[450px] p-0 text-xs sm:text-sm ">
                    <SelectGroup>
                      <SelectLabel>{ChooseTypeContent("type")}</SelectLabel>
                      <SelectItem value="S.A.R.L">
                        Société À Responsabilité Limitée (S.A.R.L)
                      </SelectItem>
                      <SelectItem value="S.A">
                        Société Anonyme (S.A.)
                      </SelectItem>
                      <SelectItem value="SAS">
                        La Société Anonyme Simplifiée (SAS)
                      </SelectItem>
                      <SelectItem value="SNC">
                        La Société en nom collectif (SNC)
                      </SelectItem>
                      <SelectItem value="SCS">
                        La Société en Commandite Simple (SCS)
                      </SelectItem>
                      <SelectItem value="SCA">
                        La Société en Commandite par Actions (SCA)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="text-xs sm:text-sm md:text-base"
                >
                  {ChooseTypeContent("CompanyName")}
                </Label>
                <Input
                  id="name"
                  type="text"
                  className="text-xs sm:text-sm "
                  required
                  placeholder="My Company"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cr" className="text-xs sm:text-sm md:text-base">
                  {ChooseTypeContent("CompanyRC")}
                </Label>
                <Input
                  id="cr"
                  type="Number"
                  className="text-xs sm:text-sm "
                  required
                  placeholder={ChooseTypeContent("RC")}
                  onChange={(e) => setCr(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="size"
                  className="text-xs sm:text-sm md:text-base"
                >
                  {ChooseTypeContent("CompanySize")}
                </Label>
                <Select onValueChange={(value) => setSize(value)}>
                  <SelectTrigger className="w-full text-xs sm:text-sm ">
                    <SelectValue
                      placeholder={ChooseTypeContent("SelectCompanySize")}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-[400px] sm:w-[550px] md:w-[400px] lg:w-[450px] p-0 text-xs sm:text-sm ">
                    <SelectGroup>
                      <SelectLabel>
                        {ChooseTypeContent("CompanySize")}
                      </SelectLabel>
                      <SelectItem value="Small">
                        {ChooseTypeContent("Sizes.Small")}
                      </SelectItem>
                      <SelectItem value="Medium">
                        {ChooseTypeContent("Sizes.Medium")}
                      </SelectItem>
                      <SelectItem value="Large">
                        {ChooseTypeContent("Sizes.Large")}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button
                className="text-white text-xs sm:text-sm md:text-base"
                type="button"
                onClick={() => setNext(true)}
              >
                Next
              </Button>
            </>
          ) : (
            <>
              <div className="grid gap-2 w-full">
                <Label
                  htmlFor="location"
                  className="text-xs sm:text-sm md:text-base"
                >
                  {ChooseTypeContent("City")}
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[100%] justify-between text-xs sm:text-sm"
                      onClick={() => setOpen(!open)}
                    >
                      {value
                        ? Cities.find((city) => city.value === value)?.label
                        : ChooseTypeContent("SelectLocation")}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] sm:w-[550px] md:w-[400px] lg:w-[450px] p-0 text-xs sm:text-sm ">
                    <Command>
                      <CommandInput placeholder={ChooseTypeContent("Search")} />
                      <CommandEmpty>
                        {ChooseTypeContent("NotFound")}
                      </CommandEmpty>
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
              <div className="grid gap-2">
                <Label
                  htmlFor="address"
                  className="text-xs sm:text-sm md:text-base"
                >
                  {ChooseTypeContent("Address")}
                </Label>
                <Input
                  id="address"
                  type="text"
                  className="text-xs sm:text-sm "
                  required
                  placeholder={ChooseTypeContent("AddressPlaceHolder")}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-xs sm:text-sm md:text-base"
                >
                  {ChooseTypeContent("PN")}
                </Label>
                <div className="flex border border-black rounded-lg">
                  <div className="px-5 py-2 border-r border-black">+212</div>
                  <input
                    type="tel"
                    className="w-4/5 h-10 px-5 rounded focus:outline-0 text-xs sm:text-sm "
                    placeholder="61 45 99 19 89"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="activity"
                  className="text-xs sm:text-sm md:text-base"
                >
                  {ChooseTypeContent("CompanyActivites")}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="activity"
                    type="text"
                    placeholder={ChooseTypeContent("Activity")}
                    onChange={(e) => setActivity(e.target.value)}
                    value={activity}
                    className="text-xs sm:text-sm "
                  />
                  <Button
                    type="button"
                    className="bg-primary text-white text-xs px-3 rounded"
                    onClick={() => addActivity()}
                  >
                    {ChooseTypeContent("ADD")}
                  </Button>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {activities.map((act, index) => (
                    <li
                      key={index}
                      className="flex gap-2 justify-center bg-orange-400 px-3 py-1.5 rounded-full hover:bg-primary"
                    >
                      <p className="text-xs sm:text-sm  text-white">{act}</p>
                      <button
                        className="text-xs sm:text-sm text-white"
                        onClick={() => removeActivity(index)}
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {error && (
                <p className="text-red-500 text-xs sm:text-sm ">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-xs sm:text-sm ">{success}</p>
              )}
              <Button
                type="submit"
                className="w-full text-white text-xs sm:text-sm "
              >
                {ChooseTypeContent("Submit")}
              </Button>
            </>
          )}
        </form>
      </div>
      <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm">
        <p>{ChooseTypeContent("CopyWrite")}</p>
      </div>
    </div>
  );
};

export default CompanyInfo;
