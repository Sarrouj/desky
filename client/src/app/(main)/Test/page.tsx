'use client'
import { useOffers } from "@/lib/store";


const Test = () => {
    let data = useOffers((state) => state.offersData);
    console.log(data)
  return (
    <div>
        test
    </div>
  )
}

export default Test
