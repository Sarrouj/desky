import Link from "next/link"

const Header = () => {
  return (
    <header className="flex items-center py-5 px-10 justify-between">
        <div className="text-2xl font-bold text-orange-600">Desky</div>
        <nav className="flex gap-8 text-sm font-medium">
            <Link href={"/"} className="text-orange-600 font-bold">Home</Link>
            <Link href={"/"}>FAQ</Link>
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Offers</Link>
        </nav>
        <nav className="flex gap-5 items-center text-sm font-medium	">
          <Link href={"/"}>Sign In</Link>
          <Link href={"/"} className="bg-orange-600 text-white text-xs py-2 px-5 rounded-md">Sign Up</Link>
        </nav>
      </header>
  )
}

export default Header
