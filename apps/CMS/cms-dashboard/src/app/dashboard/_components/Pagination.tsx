import ReactPaginate from 'react-paginate';
import '../_styles/reactPaginate.css';
import { PreviousPageIcon } from './PreviousPageIcon';
import { NextPageIcon } from './NextPageIcon';

export const Pagination = () => {
  return (
    <>
      <ReactPaginate
        className="flex flex-row w-full"
        pageClassName="listItems"
        activeClassName="activeListItem"
        pageCount={100}
        pageRangeDisplayed={5}
        previousLabel={<PreviousPageIcon />}
        nextLabel={<NextPageIcon />}
      />
    </>
  );
};
