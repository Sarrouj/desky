import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="px-10 py-5">
        <div className="flex justify-between items-center border-b border-secondaryDarkBlue pb-10">
            <div>
                <h1 className="font-bold text-3xl text-primaryOrange">Desky</h1>
            </div>
            <ul className="flex gap-20 text-sm font-semibold text-secondaryDarkBlue">
                <li><Link href={""}>Home</Link></li>
                <li><Link href={""}>About</Link></li>
                <li><Link href={""}>Contact</Link></li>
                <li><Link href={""}>FAQ</Link></li>
            </ul>
        </div>
        <div className="flex justify-between  items-center pt-10">
            <p className="text-sm">All rights reserved ® Desky.ma  | Terms and conditions apply!</p>
            <ul className="flex gap-2">
                <Image src={"/icons/instagram.svg"} alt={""} width={30} height={30} />
                <Image src={"/icons/flickr.svg"} alt={""} width={30} height={30} />
                <Image src={"/icons/twitter.svg"} alt={""} width={30} height={30} />
            </ul>
        </div>
    </footer>
  )
}

export default Footer
