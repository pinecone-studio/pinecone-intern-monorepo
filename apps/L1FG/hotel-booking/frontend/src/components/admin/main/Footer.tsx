import { Logo } from '../svg';

export const Footer = () => {
  return (
    <div className="w-full bg-[#F4F4F5] py-8 px-4 flex items-center justify-between">
      <div className="flex items-center gap-[6.667px]">
        <div className="w-4 h-4 rounded-full bg-[#71717A]"></div>
        <Logo />
      </div>
      <p className="text-[#71717A] font-Inter text-sm font-normal">© Copyright 2024</p>
    </div>
  );
};
