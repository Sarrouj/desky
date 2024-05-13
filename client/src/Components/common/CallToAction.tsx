import Link from "next/link"

interface CallToActionProps {
    href: string;
    value: string;
}

const CallToAction: React.FC<CallToActionProps> = ({href, value}) => {
  return (
    <Link href={href} className="text-white bg-primary py-2 px-5 rounded-md text-sm">{value}</Link>
  )
}

export default CallToAction
