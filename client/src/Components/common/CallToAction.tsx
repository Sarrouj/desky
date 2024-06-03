import Link from "next/link"

interface CallToActionProps {
    href: string;
    value: string;
}

const CallToAction: React.FC<CallToActionProps> = ({href, value}) => {
  return (
    <Link href={href} className="text-white bg-primaryOrange py-2 px-3 lg:py-2 lg:px-5 xl:py-2 xl:px-5 
     rounded-md text-xs md:text-xs lg:text-xs xl:text-sm">{value}</Link>
  )
}

export default CallToAction
