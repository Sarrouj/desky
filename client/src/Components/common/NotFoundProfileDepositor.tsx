import React from "react";

import Link from "next/link";
import { Button } from "../ui/Button";

const NotFoundProfileDepositor = ({ Language }: { Language: string }) => {
  return (
    <div className="container mx-auto px-4 py-24 text-center ">
      <h2 className="text-2xl font-bold mb-1">
        You don&apos;t have Company information
      </h2>
      <p className="text-gray-600 ">
        To become a trusted account, please add your company information
      </p>
      <div className="flex gap-2 items-center justify-center mt-8">
        <Link href={`/${Language}/Profile-D/Add-Info`}>
          <Button className="text-white">Add Info</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundProfileDepositor;
