import { BrokenHeart } from './BrokenHeart';

export const UnMatch = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col border gap-3">
      <BrokenHeart />
      <div className=" flex flex-col w-[419px] h-[44px] items-center justify-center gap-1">
        <span className="text-[#09090B] text-sm ">No Matches Yet</span>
        <p className="#71717A opacity-50 text-sm">Keep swiping, your next match could be just around the corner!</p>
      </div>
    </div>
  );
};
