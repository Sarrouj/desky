import Image from "next/image"
import Link from "next/link"

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



const companyInfo = () => {
  return (
    <div className="flex flex-col py-8 justify-between">
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
              <div className="grid gap-2">
                <Label htmlFor="email">Location (City)</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your Company Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>City</SelectLabel>
                      <SelectItem value="Tanger">Tanger</SelectItem>
                      <SelectItem value="Rabat">Rabat</SelectItem>
                      <SelectItem value="Casablanca">Casablanca</SelectItem>
                      <SelectItem value="Agadir">Agadir</SelectItem>
                      <SelectItem value="Tetouan">Tetouan</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Company Adresse</Label>
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
                <div className="flex">
                  <Input id="text" type="text" required placeholder="Activity..."/>
                  <button></button>
                </div>
              </div>
                <Button type="submit" className="w-full text-white">
                  Next
                </Button>
            </div>
          </div>
        <p className="w-10/12 mx-auto text-sm">© 2024 Desky.ma. All Rights Reserved</p>
      </div>
  )
}

export default companyInfo
