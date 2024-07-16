import React from 'react'

import {Pagination,
        PaginationContent,
        PaginationItem,
        PaginationPrevious,
        PaginationLink,
        PaginationEllipsis,
        PaginationNext
    } from '../ui/pagination'

const PaginationUI = () => {
  return (
    <section className="mt-5 flex justify-end">
        <div>
            <Pagination>
                <PaginationContent className="gap-1">
                    <PaginationItem >
                        <PaginationPrevious href="#" className="text-xs"/>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" className="text-white text-xs bg-primaryOrange w-8 h-8 rounded-full p-1">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" className="text-primaryOrange text-xs rounded-full w-8 h-8">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" className="text-primaryOrange text-xs rounded-full w-8 h-8">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" className="text-xs"/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </section>
  )
}

export default PaginationUI
