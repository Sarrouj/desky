import React from "react";
import { Skeleton } from "../ui/skeleton";

const DetailsInfoSkeleton = () => {
  return (
    <div className="pl-0 md:pl-6 lg:pl-8 xl:pl-12 w-full md:w-3/12 mt-5 md:mt-0">
      <div className="hidden md:flex flex-col items-center gap-3">
        <Skeleton className=" w-16 h-16 lg:w-20	lg:h-20 xl:w-24 xl:h-24 rounded-full bg-gray-200 hidden md:block" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-32 xl:w-48 h-4 xl:h-6 rounded-full bg-gray-200" />
          <Skeleton className="w-40 h-4 xl:h-6 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="mt-10 hidden md:flex flex-col gap-4">
        <Skeleton className="lg:w-36 xl:w-40 h-4 rounded-full bg-gray-200" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 xl:w-48 h-4 rounded-full bg-gray-200" />
          <Skeleton className="w-32 xl:w-36 h-2 rounded-full bg-gray-200" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 xl:w-48 h-4 rounded-full bg-gray-200" />
          <Skeleton className="w-32 xl:w-36 h-2 rounded-full bg-gray-200" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-32 xl:w-48 h-4 rounded-full bg-gray-200" />
          <Skeleton className="w-32 xl:w-36 h-2 rounded-full bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 md:mt-12 flex flex-row md:flex-col lg:flex-row items-center gap-2">
        <Skeleton className="w-full h-8 lg:h-10  rounded-full bg-gray-200" />
        <Skeleton className="w-full h-8 lg:h-10 rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default DetailsInfoSkeleton;
