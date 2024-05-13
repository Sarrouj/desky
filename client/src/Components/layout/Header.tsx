import Link from "next/link"
import CallToAction from "../common/CallToAction"

const Header = () => {
  return (
    <header className="flex items-center py-5 px-10 justify-between text-secondary">
        <div className="text-2xl font-bold text-primary">Desky</div>
        <nav className="flex gap-8 text-sm font-medium">
            <Link href={"/"} className="text-primary font-bold">Home</Link>
            <Link href={"/"} >FAQ</Link>
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Offers</Link>
        </nav>
        <nav className="flex gap-5 items-center text-sm font-medium	">
          <Link href={"/"}>Sign In</Link>
          <CallToAction href={"/"} value={"Sign Up"}/>
        </nav>
      </header>
  )
}

export default Header
