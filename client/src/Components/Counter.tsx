'use client'
import { usePersonStore } from "@/lib/store"
import Link from "next/link"

const Counter = () => {
    const firstName = usePersonStore((state) => state.firstName);
    const updateFirstName = usePersonStore((state) => state.updateFirstName);
  return (
    <div>
      <h1>{firstName}</h1>
      <p>First Name</p>
      <input type="text" onChange={(e)=> updateFirstName(e.target.value)}/>
      <Link  href={"/Test"}>Next</Link>
    </div>
  )
}

export default Counter
