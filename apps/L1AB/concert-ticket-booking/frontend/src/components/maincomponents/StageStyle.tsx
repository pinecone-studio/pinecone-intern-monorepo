import {
  LeftBottomInside,
  LeftBottomMiddle,
  LeftBottomOut,
  LeftInside,
  LeftMiddle,
  LeftOut,
  LeftTopInside,
  LeftTopMiddle,
  LeftTopOut,
  RightBottomInside,
  RightBottomMiddle,
  RightBottomOut,
  RightInside,
  RightMiddle,
  RightOut,
  RightTopInside,
  RightTopMiddle,
  RightTopOut,
  SubTract,
  TopInside,
  TopMiddle,
  TopOut,
  TopSmallMiddle,
} from '../assets/icons';

export const StageStyle = () => {
  return (
    <div className=" h-fit  w-fit ">
      <div className="relative mx-32 my-48">
        <div className="relative px-[36px] top-2 left-1">
          <SubTract />
          <div className="absolute w-[200px] h-[80px] rounded-2xl bg-gray-900 top-2 left-10">
            <p className="absolute top-8 left-[76px] font-semibold text-white">ТАЙЗ </p>
          </div>
        </div>

        <div className="flex items-end gap-1 absolute -bottom-[64px] left-0">
          <LeftBottomInside />
          <TopInside />
          <RightBottomInside />
        </div>

        <div className="absolute -top-[16px] -left-[34px]">
          <LeftInside />
        </div>
        <div className="absolute -top-[14px] -right-[38px]">
          <RightInside />
        </div>

        <div className="absolute flex items-start gap-1 -top-[44px] left-0">
          <LeftTopInside />
          <TopInside />
          <RightTopInside />
        </div>
        <div className="absolute -bottom-[154px] -left-[60px] flex items-end gap-1">
          <LeftBottomMiddle />
          <div className="h-fit gap-1 grid">
            <div>
              <TopSmallMiddle />
            </div>
            <div>
              <TopMiddle />
            </div>
          </div>
          <RightBottomMiddle />
        </div>
        <div className="absolute -top-[42px] -left-[92px] ">
          <LeftMiddle />
        </div>
        <div className="absolute -top-[42px] -right-[96px]">
          <RightMiddle />
        </div>

        <div className="absolute -top-[132px] -left-[60px] flex items-start gap-1">
          <LeftTopMiddle />
          <div className="h-fit gap-1 grid">
            <div>
              <TopMiddle />
            </div>
            <div>
              <TopSmallMiddle />
            </div>
          </div>
          <RightTopMiddle />
        </div>

        <div className="absolute -bottom-[214px] -left-[116px] flex items-end gap-1 ">
          <LeftBottomOut />
          <TopOut />
          <RightBottomOut />
        </div>

        <div className="absolute -left-[156px] -top-[84px] rotate-1">
          <LeftOut />
        </div>
        <div className="absolute -right-[160px] -top-[84px] -rotate-1">
          <RightOut />
        </div>
        <div className="absolute -top-[196px] -left-[110px] flex items-start gap-1 ">
          <LeftTopOut />
          <TopOut />
          <RightTopOut />
        </div>
      </div>
    </div>
  );
};
