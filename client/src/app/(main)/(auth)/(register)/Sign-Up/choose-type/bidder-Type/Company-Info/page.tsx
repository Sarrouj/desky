"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Cities } from "./Cities";
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

const CompanyInfo = () => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/add/bidder/company",
        {
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
        setSuccess(response.data.success);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setError(response.data.error);
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

  function addActivity() {
    if (activity.trim() !== "") {
      setActivities((prevActivities) => [...prevActivities, activity]);
      // console.log([...activities, activity]);
      setActivity("");
    }
  }

  function removeActivity(i: number) {
    let filteredActivities = activities.filter((act, index) => index !== i);
    setActivities(filteredActivities);
  }

  return (
    <div className="flex flex-col py-8 gap-20">
      <div className="w-full text-xs text-end flex justify-between px-5">
        <Link
          className="flex items-center gap-2"
          href={"/Sign-Up/choose-type/bidder-Type"}
        >
          <Image
            src={"/icons/arrowBack.svg"}
            width={13}
            height={13}
            alt="shape"
            className=""
          />
          <p className="font-semibold">Back</p>
        </Link>
        <div>
          <p className="text-gray-400">STEP 02/02</p>
          <p className="font-semibold">Legal Info</p>
        </div>
      </div>
      <div className="mx-auto grid w-7/12 gap-6 ">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">Company Information</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to activate your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Company Type</Label>
            <Select onValueChange={(value) => setType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your Company Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Company Type</SelectLabel>
                  <SelectItem value="S.A.R.L">
                    Société À Responsabilité Limitée (S.A.R.L)
                  </SelectItem>
                  <SelectItem value="S.A">Société Anonyme (S.A.)</SelectItem>
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
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              type="text"
              required
              placeholder="Mukawala"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2 w-full">
            <Label htmlFor="location">Location (City)</Label>
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
                    : "Select your Company City..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0">
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
            <Label htmlFor="address">Company Address</Label>
            <Input
              id="address"
              type="text"
              required
              placeholder="123 Street Name"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cr">Company RC Number</Label>
            <Input
              id="cr"
              type="Number"
              required
              placeholder="RC Number"
              onChange={(e) => setCr(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="size">Company Size</Label>
            <Select onValueChange={(value) => setSize(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your Company Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Company Size</SelectLabel>
                  <SelectItem value="Small">
                    Small (2 to 10 employees)
                  </SelectItem>
                  <SelectItem value="Medium">
                    Medium (11 to 100 employees)
                  </SelectItem>
                  <SelectItem value="Large">
                    Large (more than 100 employees)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
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
            <Label htmlFor="activity">Company Activities</Label>
            <div className="flex gap-2">
              <Input
                id="activity"
                type="text"
                required
                placeholder="Activity..."
                onChange={(e) => setActivity(e.target.value)}
                value={activity}
              />
              <Button
                type="button"
                className="bg-primary text-white text-xs px-3 rounded"
                onClick={() => addActivity()}
              >
                ADD
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <Button type="submit" className="w-full text-white">
            Submit
          </Button>
        </form>
      </div>
      <p className="w-10/12 mx-auto text-sm">
        © 2024 Desky.ma. All Rights Reserved
      </p>
    </div>
  );
};

export default CompanyInfo;
