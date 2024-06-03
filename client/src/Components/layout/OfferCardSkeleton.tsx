

// SHADCN UI
import { Skeleton } from "@/Components/ui/skeleton"

const OfferCardSkeleton = () => {
  return (
    <div style={{ width: "49%" }}  className=" h-[210px]" >
      <div className="bg-white rounded-lg p-8">
        <Skeleton className="h-5 w-[300px] bg-neutralBg" />
        <div className="flex text-sm gap-5 mt-1">
            <Skeleton className="h-3 w-[100px] bg-neutralBg" />
          <div className="flex gap-1">
            <Skeleton className="h-3 w-3 rounded-full bg-neutralBg" />
            <Skeleton className="h-3 w-[100px] bg-neutralBg" />
          </div>
          <Skeleton className="h-3 w-[100px] bg-neutralBg" />
        </div>
        <Skeleton className="h-14 w-[600px] mt-5 bg-neutralBg" />
        <div className="mt-3">
          <div className="flex gap-8 text-sm items-center">
            <div className="flex gap-2 items-center justify-center">
                <Skeleton className="h-3 w-[50px] bg-neutralBg" />
              <ul className="flex gap-2 items-center ">
                <Skeleton className="h-6 w-[150px] rounded-full bg-neutralBg" />
                <Skeleton className="h-6 w-[120px] rounded-full bg-neutralBg" />
              </ul>
            </div>
            <Skeleton className="h-3 w-[130px] bg-neutralBg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCardSkeleton;
