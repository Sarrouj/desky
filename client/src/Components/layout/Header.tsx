import Link from "next/link"
import CallToAction from "../common/CallToAction"


const Header = () => {
  return (
    <header className="flex items-center py-3 px-10 justify-between text-secondaryDarkBlue">
        <div className="text-2xl font-bold text-primaryOrange">Desky</div>
        <nav className="flex gap-8 text-sm font-medium">
            <Link href={"/"} className="text-primaryOrange font-bold">Home</Link>
            <Link href={"/"} >FAQ</Link>
            <Link href={"/"}>About Us</Link>
            <Link href={"/offers"}>Offers</Link>
        </nav>
        <nav className="flex gap-5 items-center text-sm font-medium	">
          <Link href={"/login"}>Sign In</Link>
          <CallToAction href={"/choose-type"} value={"Sign Up"}/>
        </nav>
      </header>
  )
}

export default Header
