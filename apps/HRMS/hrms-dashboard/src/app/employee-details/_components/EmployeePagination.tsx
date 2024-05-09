'use client';
import ReactPaginate from 'react-paginate';
import { LeftArrow, RightArrow } from '../../asset';

type PropsType = {
  page: number | undefined;
  setChecked: (_: number) => void;
  checked: number;
};

type PageChangeEvent = {
  selected: number;
};

export const EmployeePagination = ({ page, setChecked, checked }: PropsType) => {
  const onPageChange = (e: PageChangeEvent) => {
    setChecked(e.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        className="flex gap-2 justify-center items-center"
        pageClassName="border rounded-lg w-10 h-10 flex justify-center items-center  "
        activeClassName="bg-black text-white"
        nextLabel={<RightArrow />}
        pageCount={page!}
        onPageChange={onPageChange}
        previousLabel={<LeftArrow />}
        forcePage={checked - 1}
      />
    </>
  );
};
