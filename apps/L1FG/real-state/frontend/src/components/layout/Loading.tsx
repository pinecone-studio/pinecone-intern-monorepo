import { HomeLogo } from './icons/HomeLogo';

export const Loading = () => {
  return (
    <div data-cy="loading" className="min-h-screen pt-[270px]">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <HomeLogo />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-[38px] h-[38px] border-[6px] border-orange-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-[38px] h-[38px] border-[6px] border-[#97316] border-t-transparent border-r-transparent border-l-transparent  rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="">
          <p className="font-Inter font-normal not-italic text-ms text-[#71717A]">Please Wait...</p>
        </div>
      </div>
    </div>
  );
};
