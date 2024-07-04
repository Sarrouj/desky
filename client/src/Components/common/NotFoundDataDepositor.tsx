
import React from 'react'

import Link from 'next/link'
import { Button } from '../ui/Button'

const NotFoundDataDepositor = ({Language, Content} : {Language : string, Content : any}) => {
  return (
    <div className="container mx-auto px-4 py-36 text-center ">
        <h2 className="text-2xl font-bold mb-1">{Content("title")}</h2>
        <p className="text-gray-600 ">{Content("Desc")}</p>
        <div className="flex gap-2 items-center justify-center mt-8">
            <Link href={`/${Language}/Create-Offer`}>
                <Button className="text-white">{Content("CreateOfferCallToAction")}</Button>
            </Link>
            <Link href={`/${Language}/offers`}>
                <Button className="text-white">{Content("GoToMarketplaceCallToAction")}</Button>
            </Link>
        </div>
    </div> 
  )
}

export default NotFoundDataDepositor
