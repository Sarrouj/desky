import { Toaster } from "@/Components/ui/sonner"

export default function RootLayout({ children } : {children : any}) {
  return (
    <>
    <div className="flex w-full flex-col bg-muted/40 text-secondaryDarkBlue bg-neutralBg">
        {children}
        <Toaster />
    </div>
    </>
    )
} 

