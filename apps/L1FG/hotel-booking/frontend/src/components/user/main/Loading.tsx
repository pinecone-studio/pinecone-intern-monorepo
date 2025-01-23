import { BlackLogoIcon } from '../svg';

export const Loading = () => {
  return (
    <div className="min-h-screen pt-[270px]">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#2563EB] rounded-full"></div>
          <BlackLogoIcon />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-[38px] h-[38px] border-[6px] border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-[38px] h-[38px] border-[6px] border-[#2563EB] border-t-transparent border-r-transparent border-l-transparent  rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="">
          <p className="font-Inter font-normal not-italic text-ms text-[#71717A]">Please Wait...</p>
        </div>
      </div>
    </div>
  );
};
