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
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [cin, setCin] = useState<File | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
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

  // get Auth Email
  useEffect(() => {
    let getEmail = localStorage.getItem("email");
    if (getEmail) {
      setEmail(getEmail);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      window.location.href = `/${Language}/Dashboard-B`;
    }
  }, [status, Language]);

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
        "https://desky-2.onrender.com/add/bidder/AE",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response && response.data && response.data.success) {
        setSuccess(response.data.success);
          window.location.href = `/${Language}/`;
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
    <div className="flex flex-col py-8 justify-between min-h-screen">
      <div className="w-full text-xs text-end flex justify-between px-5">
        <Link
          className="flex items-center gap-2"
          href={`/${Language}/Sign-Up/Choose-Type/Bidder-Type`}
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
      <div className="mx-auto grid w-full xl:w-7/12 py-10 px-5 sm:px-32 md:px-40 lg:px-16 xl:px-0 gap-6 ">
        <div className="grid gap-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-bold">{Content("title")}</h1>
          <p className="text-balance text-muted-foreground text-xs sm:text-sm md:text-base">
            {Content("Description")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2 w-full">
            <Label htmlFor="email" className="text-xs sm:text-sm md:text-base">{Content("Location")}</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[100%] justify-between text-xs md:text-sm"
                >
                  {value
                    ? Cities.find((city) => city.value === value)?.label
                    : Content("SelectLocation")}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] sm:w-[550px] md:w-[400px] lg:w-[450px] p-0 text-xs md:text-sm">
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
            <Label htmlFor="password" className="text-xs sm:text-sm md:text-base">{Content("Address")}</Label>
            <Input
              id="text"
              type="text"
              required
              placeholder=""
              onChange={(e) => setAddress(e.target.value)}
              className="text-xs md:text-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs sm:text-sm md:text-base">{Content("Card")}</Label>
            <Input
              id="picture"
              type="file"
              className="text-xs md:text-sm"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCin(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs sm:text-sm md:text-base">{Content("PhoneNumber")}</Label>
            <div className="flex border border-black rounded-lg">
              <div className="px-5 py-2 border-r border-black">+212</div>
              <input
                type="tel"
                className="w-4/5 h-10 px-5 rounded focus:outline-0 text-xs md:text-sm"
                placeholder="61 45 99 19 89"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs sm:text-sm md:text-base">{Content("Activities")}</Label>
            <div className="flex gap-2">
              <Input
                id="text"
                type="text"
                placeholder="Activity..."
                onChange={(e) => setActivity(e.target.value)}
                value={activity}
                className="text-xs md:text-sm"
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
                  <p className="text-xs md:text-sm text-white">{act}</p>
                  <button
                    className="text-xs md:text-sm text-white"
                    onClick={() => removeActivity(index)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {error && (
            <p className="text-red-500 text-xs md:text-sm">
              {typeof error === "string" ? error : "An error occurred"}
            </p>
          )}
          {success && <p className="text-green-500 text-xs md:text-sm">{success}</p>}

          <Button type="submit" className="w-full text-white text-xs md:text-sm">
            {Content("Submit")}
          </Button>
        </form>
      </div>
      <div className="w-full text-center lg:text-start lg:px-10 xl:px-14 text-xs sm:text-sm">
        <p>{Content("CopyWrite")}</p>
      </div>
    </div>
  );
};

export default AutoEntrepreneurInfo;
