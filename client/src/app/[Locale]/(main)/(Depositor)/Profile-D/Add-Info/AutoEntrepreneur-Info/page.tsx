"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import axios from "axios";

// Shadcn UI
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
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

// import Zustand Store
import { useBoundStore } from "@/lib/store";

// Internationalization
import { useTranslations } from "next-intl";
import { City } from "@/lib/Features/CitiesData";

import { useSession } from "next-auth/react";

const AutoEntrepreneurInfo = () => {
  const { data: session } = useSession();
  const email : any = session ? session.user?.email : null;
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [cin, setCin] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState<(string | number)[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [Language, setLanguage] = useState();
  const [Cities, setCity] = useState<City[]>([]);

  const CitiesEN = useBoundStore((state) => state.CitiesEN);
  const CitiesFR = useBoundStore((state) => state.CitiesFR);

  // Language
  useEffect(() => {
    const lg = localStorage.getItem("lg");
    const language = lg ? JSON.parse(lg) : "fr"; // Replace "defaultLanguage" with your actual default value
    setLanguage(language);
  }, [Language]);

  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  // Language
  useEffect(() => {
    if (Language == "en") {
      setCity(CitiesEN);
    } else {
      setCity(CitiesFR);
    }
  }, [Language, CitiesEN, CitiesFR]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!address.trim()) {
      setError("Address is required.");
      return;
    }
    if (!location.trim()) {
      setError("Location is required.");
      return;
    }
    if (activities.length === 0) {
      setError("At least one activity is required.");
      return;
    }

    const DoA = JSON.stringify(activities);
    const formData = new FormData();

    // Append form data correctly
    formData.append("email", email);
    if (cin !== null) {
      formData.append("AE_CIN", cin);
    }
    formData.append("AE_phoneNumber", phoneNumber);
    formData.append("AE_DoA", DoA);
    formData.append("AE_address", address);
    formData.append("AE_location", location);

    try {
      const response = await axios.post(
        "http://localhost:3001/add/depositor/AE",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response && response.data && response.data.success) {
        setSuccess(response.data.success);
        window.location.href = `/${Language}/Profile-D`;
      } else {
        setError(response.data.error);
      }
    } catch (error: any) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        setError(error.response.data.error);
      } else {
        console.error("API Error:", error);
        setError("Failed to register. Please try again.");
      }
    }
  };

  // Content
  const Content = useTranslations("Auth.AutoEntrepreneurInfo");

  return (
    <div className="flex flex-col py-8 gap-20">
      <div className="w-full text-xs text-end flex justify-between px-5">
        <Link
          className="flex items-center gap-2"
          href={`/${Language}/Profile-D/Add-Info`}
        >
          <Image
            src={"/icons/arrowBack.svg"}
            width={13}
            height={13}
            alt="shape"
            className=""
          />
          <p className="font-semibold">{Content("Back")}</p>
        </Link>
        <div>
          <p className="text-gray-400">{Content("Step")}</p>
          <p className="font-semibold">{Content("LegalInfo")}</p>
        </div>
      </div>
      <div className="mx-auto grid w-7/12 gap-6 ">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{Content("title")}</h1>
          <p className="text-balance text-muted-foreground">
            {Content("Description")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2 w-full">
            <Label htmlFor="email">{Content("Location")}</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[100%] justify-between"
                >
                  {value
                    ? Cities.find((city) => city.value === value)?.label
                    : Content("SelectLocation")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0">
                <Command>
                  <CommandInput placeholder={Content("Search")} />
                  <CommandEmpty>{Content("NotFound")}</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {Cities.map((city, index) => (
                        <CommandItem
                          key={index}
                          value={city.value}
                          onSelect={(currentValue) => {
                            setValue(currentValue);
                            setLocation(city.label);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === city.value ? "opacity-100" : "opacity-0"
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
            <Label htmlFor="password">{Content("Address")}</Label>
            <Input
              id="text"
              type="text"
              required
              placeholder=""
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{Content("Card")}</Label>
            <Input
              id="picture"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCin(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{Content("PhoneNumber")}</Label>
            <div className="flex border border-black rounded-lg">
              <div className="px-5 py-2 border-r border-black">+212</div>
              <input
                type="tel"
                className="w-4/5 h-10 px-5 rounded focus:outline-0 text-sm"
                placeholder="61 45 99 19 89"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">{Content("Activities")}</Label>
            <div className="flex gap-2">
              <Input
                id="text"
                type="text"
                placeholder="Activity..."
                onChange={(e) => setActivity(e.target.value)}
                value={activity}
              />
              <Button
                type="button"
                className="bg-primary text-white text-xs px-3 rounded"
                onClick={() => addActivity()}
              >
                {Content("ADD")}
              </Button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {activities.map((act, index) => (
                <li
                  key={index}
                  className="flex gap-2 justify-center bg-orange-400 px-3 py-1.5 rounded-full hover:bg-primary"
                >
                  <p className="text-sm text-white">{act}</p>
                  <button
                    className="text-sm text-white"
                    onClick={() => removeActivity(index)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {error && (
            <p className="text-red-500 text-sm">
              {typeof error === "string" ? error : "An error occurred"}
            </p>
          )}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <Button type="submit" className="w-full text-white">
            {Content("Submit")}
          </Button>
        </form>
      </div>
      <p className="w-10/12 mx-auto text-sm">{Content("CopyWrite")}</p>
    </div>
  );
};

export default AutoEntrepreneurInfo;
