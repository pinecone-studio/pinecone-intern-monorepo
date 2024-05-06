'use client';
import { Navbar } from './Navbar';
import { LoadingIcon } from '../../assets';

export const LoaderPage = () => {
  return (
    <div data-testid="loader-page-test-id" className="w-[100%] h-[100vh] flex flex-col">
      <Navbar />
      <div className="w-[100%] h-[100vh] flex flex-col items-center justify-center">
        <LoadingIcon />
        <span data-testid="loader-page-text-test-id" className="non-italic font-semibold leading-4 text-[#121316]">
          Уншиж байна
        </span>
      </div>
    </div>
  );
};
