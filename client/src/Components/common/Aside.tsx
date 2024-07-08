
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
  
const Aside = ({Language, Dashboard, CreateOffer, MyOffers, ManageBids, Content} : {Language : string | undefined, Dashboard: string, CreateOffer:string, MyOffers: string, ManageBids:string, Content: any}) => {

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
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 text-muted-foreground hover:text-foreground ${Dashboard}`}
              >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">{Content("Dashboard")}</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{Content("Dashboard")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href={`/${Language}/Create-Offer`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${CreateOffer}`}
              >
                  <PackagePlus className="h-5 w-5" />
                  <span className="sr-only">{Content("CreateOffer")}</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{Content("CreateOffer")}</TooltipContent>
          </Tooltip> 
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href={`/${Language}/dashboard-d/my-offers`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${MyOffers}`}
              >
                  <LayoutList className="h-5 w-5" />
                  <span className="sr-only">{Content("MyOffers")}</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{Content("MyOffers")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
              <Link
                  href={`/${Language}/dashboard-d/manage-bids`}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${ManageBids}`}
              >
                  <GanttChart className="h-5 w-5" />
                  <span className="sr-only">{Content("ManageBids")}</span>
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{Content("ManageBids")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <TooltipProvider>
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
        </TooltipProvider> */}
        {/* <TooltipProvider>
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
        </TooltipProvider> */}
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
              <span className="sr-only">{Content("Settings")}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{Content("Settings")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      </nav>
    </aside>
  )
}

export default Aside
