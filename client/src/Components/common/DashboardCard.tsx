import React from "react";
import { Skeleton } from "@/Components/ui/skeleton"

const DashboardCard = ({
  Logo,
  Content,
  Value,
}: {
  Logo: any;
  Content: any;
  Value: any;
}) => {
  return (
    <div className="bg-white shadow rounded-lg border flex text-center md:justify-center lg:justify-start p-3 lg:p-4 xl:p-6 h-full w-full gap-5">
      <div className="flex justify-center items-center gap-3">
        <div className="bg-gray-100 p-2 md:hidden lg:block xl:p-3 rounded-md">
          <Logo size={30} className="text-primary" />
        </div>
        <div className="text-start md:text-center lg:text-start">
          {Value !== null ? 
            <>
               <h1 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold">{Value}</h1>
               <h3 className="font-semibold text-neutralGray text-sm sm:text-sm md:text-sm lg:text-md xl:text-base">{Content}</h3> 
            </>
           :
           <>
               <Skeleton className="h-4 w-16" />
               <Skeleton className="h-4 w-40 mt-2" />
           </>
          }
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
