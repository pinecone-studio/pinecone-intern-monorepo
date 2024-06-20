import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
export const PaginationDemo = () => {
  return (
    <Pagination data-testid="pagination-container">
      <PaginationContent data-testid="container">
        <PaginationItem>
          <PaginationPrevious data-testid="pagination-previous" href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink data-testid="pagination-link-1" href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink data-testid="pagination-link-2" href="#">
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink data-testid="pagination-link-3" href="#">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink data-testid="pagination-link-4" href="#">
            4
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink data-testid="pagination-link-5" href="#">
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink data-testid="pagination-link-6" href="#">
            6
          </PaginationLink>
        </PaginationItem>
        <PaginationEllipsis></PaginationEllipsis>
        <PaginationItem>
          <PaginationNext data-testid="pagination-next" href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationDemo;
