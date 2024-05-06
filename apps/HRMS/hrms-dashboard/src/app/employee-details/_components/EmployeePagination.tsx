'use client';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { LeftArrow, RightArrow } from '../../asset';
import { perPage } from '../constants';

type PropsType = {
  page: number | undefined ;
  handleClick: (_: number) => void;
};

type PageChangeEvent = {
  selected: number;
};

export const EmployeePagination = ({ handleClick, page, }: PropsType) => {
  const [checked, setChecked] = useState(1);
  const pageLength = Math.ceil(page! / perPage.limit);
  
  const onPageChange = (e: PageChangeEvent) => {
    setChecked(e.selected + 1);
  };
   
  useEffect(() => {
    handleClick(checked);
  }, [ checked]);

  return (
    <>
      <ReactPaginate
        className="flex gap-2 justify-center items-center"
        pageClassName="border rounded-lg w-10 h-10 flex justify-center items-center  "
        activeClassName="bg-black text-white"
        nextLabel={<RightArrow />}
        pageCount={pageLength}
        onPageChange={onPageChange}
        previousLabel={<LeftArrow />}
        renderOnZeroPageCount={null}
      />
    </>
  );
};
