import React from 'react'

import {
    Settings,
    Waypoints,
    LayoutList,
    GanttChart,
    PackagePlus,
    Home,
    Users2,
} from "lucide-react"
  
  
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/Components/ui/tooltip"

import Link from 'next/link'

  
const Aside = ({Language} : {Language : string}) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href={`/${Language}`}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-white md:h-8 md:w-8 md:text-base"
        >
          <p className="transition-all group-hover:scale-110" >D</p>
          <span className="sr-only">Acme Inc</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href={`/${Language}/dashboard-d`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white transition-colors md:h-8 md:w-8"
              >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href={`/${Language}/Create-Offer`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                  <PackagePlus className="h-5 w-5" />
                  <span className="sr-only">Create Offer</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Create Offer</TooltipContent>
          </Tooltip> 
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href={`/${Language}/dashboard-d/my-offers`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                  <LayoutList className="h-5 w-5" />
                  <span className="sr-only">My Offers</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">My Offers</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href={`/${Language}/dashboard-d/manage-bids`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                  <GanttChart className="h-5 w-5" />
                  <span className="sr-only">Manage Bids</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Manage Bids</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Bidders</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Bidders</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                  <Waypoints className="h-5 w-5" />
                  <span className="sr-only">Connects</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Manage Connects</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      </nav>
    </aside>
  )
}

export default Aside
