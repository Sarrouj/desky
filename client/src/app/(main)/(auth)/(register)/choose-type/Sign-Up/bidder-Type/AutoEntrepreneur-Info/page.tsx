'use client'
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Cities } from "../Company-Info/Cities"

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


const AutoEntreprenurInfo = () => {
    let [activity , setActivity] = useState('');
    let [activities, setActivites] = useState< (string | number)[]>([]);
  
    const [open, setOpen] = React.useState<boolean>(false)
    const [value, setValue] = React.useState<string>("")
  
    function addActivity() {
      if (activity.trim() !== '') {
        setActivites((prevActivities) => [...prevActivities, activity]);
        // console.log([...activities, activity]); 
        setActivity('');
      }
    }
  
    function removeActivity(i : number){
      let filterdActivities = activities.filter((act, index) => index !== i );
      setActivites(filterdActivities);
    }
  
    return (
      <div className="flex flex-col py-8 gap-20">
            <div className="w-full text-xs text-end flex justify-between px-5"> 
                <Link className="flex items-center gap-2" href={"/choose-type/Sign-Up/bidder-Type"}>
                  <Image src={"/icons/arrowback.svg"} width={13} height={13} alt="shape" className=""/>
                  <p className="font-semibold">Back</p>
                </Link>
                <div>
                  <p className="text-gray-400">STEP 02/02</p>
                  <p className="font-semibold">Legal Info</p>
                </div>
            </div>
            <div className="mx-auto grid w-7/12 gap-6 ">
              <div className="grid gap-2">
                <h1 className="text-3xl font-bold">Legal Information</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your information to activate your account
                </p>
              </div>
              <div className="grid gap-4">
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
                          ? Cities.find((citie) => citie.value === value)?.label
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
                          {Cities.map((citie, index) => (
                            <CommandItem
                              key={index}
                              value={citie.value}
                              onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === citie.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {citie.label}
                            </CommandItem>
                            
                          ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Adresse</Label>
                  <Input id="text" type="text" required placeholder="m@gmail.com"/>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Auto Entrepreneur Card Screen</Label>
                  <Input id="picture" type="file" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Phone Number</Label>
                    <div className="flex border border-black rounded-lg">
                      <div className="px-5 py-2 border-r border-black">+212</div>
                      <input type="tel" className="w-4/5 h-10 px-5 rounded focus:outline-0 text-sm" placeholder="61 45 99 19 89"/> 
                    </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">ADD Activities</Label>
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

export default AutoEntreprenurInfo