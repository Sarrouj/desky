import Image from "next/image"
import React from 'react';

export default function forgotPasswordLayout({
    children, 
  }: {
    children: React.ReactNode
  }) {
    return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] text-secondaryDarkBlue">
        <div className=" bg-muted rounded-lg m-5 bg-gradient-to-r from-custom-yellow to-custom-orange hidden lg:flex flex-col justify-end items-end">
          <div className="h-2/4 text-custom-yellow"></div>
          <div className="h-2/4 flex justify-end px-8">
            <Image src={"/authShape.svg"} width={400} height={400} alt="shape" className=""/>
        </div>
        </div>
        {children}
      </div> 
    )
}