'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

// Shadcn UI
import { Button } from "@/Components/ui/Button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { 
  Select, 
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue, 
} from "@/Components/ui/select"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/Components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"

// import Zustand Store
import { useBoundStore } from "@/lib/store"


const CompanyInfo = () => {
  let [activity , setActivity] = useState('');
  let [activities, setActivities] = useState< (string | number)[]>([]);

  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  // Zustand Store
  const Cities = useBoundStore((state) => state.Cities);

  function addActivity() {
    if (activity.trim() !== '') {
      setActivities((prevActivities) => [...prevActivities, activity]);
      // console.log([...activities, activity]); 
      setActivity('');
    }
  }

  function removeActivity(i : number){
    let filteredActivities = activities.filter((act, index) => index !== i );
    setActivities(filteredActivities);
  }

  return (
    <div className="flex flex-col py-8 gap-20">
          <div className="w-full text-xs text-end flex justify-between px-5"> 
              <Link className="flex items-center gap-2" href={"/Sign-Up/choose-type/bidder-Type"}>
                <Image src={"/icons/arrowBack.svg"} width={13} height={13} alt="shape" className=""/>
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
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Company Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your Company Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Company Type</SelectLabel>
                      <SelectItem value="S;A.R.L">Société À Responsabilité Limitée (S.A.R.L)</SelectItem>
                      <SelectItem value="S.A">Société Anonyme (S.A.)</SelectItem>
                      <SelectItem value="SAS">La Société Anonyme Simplifiée (SAS)</SelectItem>
                      <SelectItem value="SNC">La Société en nom collectif (SNC)</SelectItem>
                      <SelectItem value="SCS">La Société en Commandite Simple (SCS)</SelectItem>
                      <SelectItem value="SCA">La Société en Commandite par Actions (SCA)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Company Name</Label>
                <Input id="text" type="text" required placeholder="Mukawala"/>
              </div>
              <div className="grid gap-2 w-full">
                <Label htmlFor="email">Location (City)</Label>
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
                              setValue(currentValue === value ? "" : currentValue)
                              setOpen(false)
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
                <Label htmlFor="password">Company Address</Label>
                <Input id="text" type="text" required placeholder="m@gmail.com"/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Company RC Number</Label>
                <Input id="Number" type="Number" required placeholder="RC Number"/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Company Size</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your Company Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Company Size</SelectLabel>
                      <SelectItem value="Small">Small (2 to 10 employees)</SelectItem>
                      <SelectItem value="Medium">Medium (11 to 100 employees)</SelectItem>
                      <SelectItem value="Large">Large (more than 100 employees)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Phone Number</Label>
                  <div className="flex border border-black rounded-lg">
                    <div className="px-5 py-2 border-r border-black">+212</div>
                    <input type="tel" className="w-4/5 h-10 px-5 rounded focus:outline-0 text-sm" placeholder="61 45 99 19 89"/> 
                  </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Company Activities</Label>
                <div className="flex gap-2">
                  <Input id="text" type="text" required placeholder="Activity..." onChange={(e)=> setActivity(e.target.value)} value={activity}/>
                  <Button type="submit" className="bg-primary text-white text-xs px-3 rounded" onClick={() => addActivity()}>ADD</Button>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {activities.map((act, index)=> (
                    <li key={index} className="flex gap-2 justify-center bg-orange-400 px-3 py-1.5 rounded-full hover:bg-primary">
                      <p className="text-sm text-white">{act}</p>
                      <button className="text-sm text-white" onClick={() => removeActivity(index)}>x</button>
                    </li>
                  ))}
                </ul>
              </div>
                <Button type="submit" className="w-full text-white">
                  Submit
                </Button>
            </div>
          </div>
          <p className="w-10/12 mx-auto text-sm">© 2024 Desky.ma. All Rights Reserved</p>
      </div>
  )
}

export default CompanyInfo
