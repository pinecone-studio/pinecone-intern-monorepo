import React from 'react';
import { Container } from './assets';

export const Loading = () => {
  return (
    <Container backgroundColor="bg-white">
      <div className="flex flex-col items-center justify-center ">
        <div className="flex gap-1 items-center ">
          <div className="w-5 h-5 rounded-full bg-[#2563EB]"></div>
          <div className=" flex font-sans font-normal text-xl text-[#09090B]">Pedia</div>
        </div>
        <div className="py-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="39" height="38" viewBox="0 0 39 38" fill="none">
            <path
              d="M38.4999 19C38.4999 29.4934 29.9933 38 19.4999 38C9.00653 38 0.499939 29.4934 0.499939 19C0.499939 8.50659 9.00653 0 19.4999 0C29.9933 0 38.4999 8.50659 38.4999 19ZM6.19994 19C6.19994 26.3454 12.1546 32.3 19.4999 32.3C26.8453 32.3 32.7999 26.3454 32.7999 19C32.7999 11.6546 26.8453 5.7 19.4999 5.7C12.1546 5.7 6.19994 11.6546 6.19994 19Z"
              fill="#2563EB"
              fillOpacity="0.2"
            />
            <path
              d="M19.4999 2.85C19.4999 1.27599 20.783 -0.0218878 22.3393 0.213341C24.3998 0.524764 26.3953 1.17316 28.2453 2.13232C29.6427 2.8568 29.9179 4.66098 28.9927 5.93438C28.0675 7.20778 26.2916 7.45696 24.8506 6.82375C24.0392 6.46722 23.1942 6.19266 22.3282 6.00419C20.7902 5.66946 19.4999 4.42401 19.4999 2.85Z"
              fill="#2563EB"
            />
          </svg>
        </div>
        <div className="text-[#71717A] text-sm font-normal font-sans">Please Wait...</div>
      </div>
    </Container>
  );
};
