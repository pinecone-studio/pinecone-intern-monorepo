'use client';
import ReactPaginate from 'react-paginate';
import '../_styles/reactPaginate.css';
import { PreviousPageIcon } from './PreviousPageIcon';
import { NextPageIcon } from './NextPageIcon';
import { Dispatch, SetStateAction } from 'react';
type PaginationProps = {
  totalPageQuantity: number;
  pageNumber: number;
  setPageNumber: Dispatch<SetStateAction<number>>;
};

type HandlePageChangeProps = {
  selected: number;
};
export const Pagination = ({ totalPageQuantity, pageNumber, setPageNumber }: PaginationProps) => {
  const handlePageChange = ({ selected }: HandlePageChangeProps) => setPageNumber(selected);
  return (
    <div data-cy="pagination-cy-id">
      <ReactPaginate
        className="flex flex-row w-full"
        pageClassName="listItems"
        activeClassName="activeListItem"
        pageCount={totalPageQuantity}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        previousLabel={<PreviousPageIcon />}
        nextLabel={<NextPageIcon />}
        forcePage={pageNumber}
      />
    </div>
  );
};
