import Logo from './common/Logo';
import Tinder from './common/Tinder';

export const Loading = () => {
  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 ">
        <Logo />
        <div className="relative w-[38px] h-[38px]">
          <div className="absolute w-full h-full border-4 border-primary/20 rounded-full" />
          <div className="absolute w-full h-full border-4 border-transparent border-t-red-300 rounded-full animate-spin" />
        </div>
        <p className="text-sm text-[#71717A]">Please Wait...</p>
      </div>
      <Tinder />
    </div>
  );
};
