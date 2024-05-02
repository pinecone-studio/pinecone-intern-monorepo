'use client';
import { useEffect, useState } from 'react';
import { LeftArrow, RightButton } from '../../asset';

type PropsType = {
  pageCount: number;
  handleClick: (_: number) => void;
};

export const EmployeePagination = ({ pageCount, handleClick }: PropsType) => {
  const [checked, setChecked] = useState<number>(1);
  const paginationPageCount = Array.from({ length: pageCount }, (_: number, index: number) => index + 1);
  const nextButton = () => {
    if (checked === pageCount) {
      return setChecked(checked);
    }
    return setChecked((prev) => prev + 1);
  };

  const prevButton = () => {
    if (checked === 1) {
      return setChecked(checked);
    }
    return setChecked((prev) => prev - 1);
  };

  const handleCheckClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChecked(Number((e.target as HTMLButtonElement).value));
  };

  useEffect(() => {
    handleClick(checked);
  }, [checked]);

  return (
    <div data-testid="pagination" className="flex items-center gap-2 justify-center">
      <button data-testid="before-button" className={checked == 1 ? 'text-gray-300 pr-3 cursor-none' : 'text-main pr-3'} onClick={prevButton}>
        <LeftArrow />
      </button>
      {paginationPageCount.map((value, index) => {
        return (
          <button
            data-testid={`page-button-${value}`}
            key={index}
            className="btn btn-sm text-dark w-10 h-10 bg-white border-2"
            style={{ backgroundColor: checked === value ? 'black' : 'white', color: checked === value ? 'white' : 'black' }}
            value={value}
            onClick={handleCheckClick}
          >
            {value}
          </button>
        );
      })}
      <button data-testid="after-button" className={checked == pageCount ? 'text-gray-300 pl-3 cursor-none' : 'text-main pl-3'} onClick={nextButton}>
        <RightButton />
      </button>
    </div>
  );
};
