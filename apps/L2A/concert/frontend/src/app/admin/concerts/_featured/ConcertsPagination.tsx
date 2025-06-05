import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  totalPages: number;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
};
const PaginationConcerts = ({ totalPages, setPage, page }: Props) => {
  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious data-testid="prev-pagination" onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className={`cursor-pointer`} />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num, i) => (
          <PaginationItem key={num}>
            <PaginationLink data-testid={`pagination-${i}`} isActive={page === num} onClick={() => setPage(num)} className="cursor-pointer">
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext data-testid="next-pagination" onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} className={`cursor-pointer`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationConcerts;
