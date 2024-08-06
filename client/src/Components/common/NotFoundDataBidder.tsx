import React from "react";

import Link from "next/link";
import { Button } from "../ui/Button";

const NotFoundDataBidder = ({
  Language,
  content,
}: {
  Language: string;
  content: any;
}) => {
  return (
    <div className="container mx-auto px-4 py-36 text-center ">
      <h2 className="text-2xl font-bold mb-1">{content("Title")}</h2>
      <p className="text-gray-600 ">{content("Description")}</p>
      <div className="flex gap-2 items-center justify-center mt-8">
        <Link href={`/${Language}/offers`}>
          <Button className="text-white">{content("CallToAction")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundDataBidder;
