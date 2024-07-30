import Image from "next/image"
import Link from "next/link"

export default function forgotPasswordLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
        <div className=" bg-muted rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange hidden lg:flex flex-col justify-start items-start">
          <div className="h-2/4 p-8">
              <Link href={"/"}>
                <h1 className="text-white text-2xl font-bold">Desky</h1>
              </Link>
          </div>
          <div className="h-2/4 flex justify-start px-8">
            <Image src={"/authShape.svg"} width={400} height={400} alt="shape" className=""/>
          </div>
        </div>
        {children}
      </div> 
    )
}