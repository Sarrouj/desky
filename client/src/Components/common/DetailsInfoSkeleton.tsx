import React from 'react'
import { Skeleton } from '../ui/skeleton'

const DetailsInfoSkeleton = () => {
  return (
    <div className="pl-12 w-3/12">
              <div className="flex flex-col items-center gap-3">
                <Skeleton className=' w-24 h-24 rounded-full bg-gray-200'/>
                <div className="flex flex-col items-center gap-2">
                <Skeleton className='w-48 h-6 rounded-full bg-gray-200'/>
                <Skeleton className='w-40 h-4 rounded-full bg-gray-200'/>
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-4">
                <Skeleton className='w-40 h-4 rounded-full bg-gray-200'/>
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-48 h-4 rounded-full bg-gray-200'/>
                    <Skeleton className='w-36 h-2 rounded-full bg-gray-200'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-48 h-4 rounded-full bg-gray-200'/>
                    <Skeleton className='w-36 h-2 rounded-full bg-gray-200'/>
                </div>
                <div className='flex flex-col gap-2'>
                    <Skeleton className='w-48 h-4 rounded-full bg-gray-200'/>
                    <Skeleton className='w-36 h-2 rounded-full bg-gray-200'/>
                </div>
  
              </div>
              <div className="mt-14 flex flex-row items-center gap-2">
              <Skeleton className='w-full h-10 rounded-full bg-gray-200'/>
              <Skeleton className='w-full h-10 rounded-full bg-gray-200'/>
              </div>
            </div>
  )
}

export default DetailsInfoSkeleton
