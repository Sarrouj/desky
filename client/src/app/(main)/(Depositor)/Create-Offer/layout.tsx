import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <>
    <div className="flex min-h-screen w-full flex-col bg-muted/40 text-secondaryDarkBlue">
        {children}
        <Toaster />
    </div>
    </>
    )
} 

