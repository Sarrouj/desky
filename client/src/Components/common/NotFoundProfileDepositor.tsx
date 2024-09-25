import React from "react";

import Link from "next/link";
import { Button } from "../ui/button";

const NotFoundProfileDepositor = ({
  Language,
  content,
}: {
  Language: string;
  content: any;
}) => {
  return (
    <div className="container mx-auto px-4 py-24 text-center ">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-1">{content("NoAvailable")}</h2>
      <p className="text-gray-600 text-xs md:text-sm lg:text-base">{content("NoAvailableDesc")}</p>
      <div className="flex gap-2 items-center justify-center mt-8">
        <Link href={`/${Language}/bidder-profile/add-info`}>
          <Button className="text-white text-xs md:text-sm">{content("CallToAction")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundProfileDepositor;
