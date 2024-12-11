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
} from '../assets/icons';
import Image from 'next/image';
interface Venue {
  __typename?: "Venue";
  name: string;
  quantity: number;
  firstquantity: number;
  price: number;
}

interface StageStyleProps {
  venue?: Venue[];
}
export const StageStyle = ({ venue }: StageStyleProps) => {
  const sections = [{ component: LeftBottomInside, position: 'top-[96px] left-1', text: `VIP хэсэг ${venue?.[2]?.quantity}` },
  { component: TopInside, position: 'top-[108px] left-[75px]', text: `VIP хэсэг ${venue?.[2]?.quantity}` },
  { component: TopInside, position: 'top-[-40px] left-[75px]', text: `VIP хэсэг ${venue?.[2]?.quantity}` },
  { component: RightBottomInside, position: 'top-[96px] right-[186px]', text: `VIP хэсэг ${venue?.[2]?.quantity}` },
  { component: LeftInside, position: 'top-[-15px] right-[432px]', text: ` VIP хэсэг ${venue?.[2]?.quantity}` },
  { component: RightInside, position: 'top-[-15px] right-[150px]', text: `VIP хэсэг ${venue?.[2]?.quantity}` },
  { component: LeftTopInside, position: 'bottom-[76px] left-1', text: `VIP  хэсэг ${venue?.[2]?.quantity}` },
  { component: RightTopInside, position: 'bottom-[76px] right-[186px]', text: ` VIP хэсэг ${venue?.[2]?.quantity}` },
  { component: LeftBottomMiddle, position: 'top-[117px] left-[-56px]', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: RightTopMiddle, position: 'top-[-129px] right-[124px]', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: RightBottomMiddle, position: 'top-[117px] right-[124px]', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: LeftTopMiddle, position: 'top-[-129px] left-[-56px]', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: TopMiddle, position: 'top-[153px] left-[75px] ', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: TopMiddle, position: 'top-[-129px] left-[75px] ', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: TopMiddle, position: 'top-[196px] left-[75px] ', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: TopMiddle, position: 'top-[-86px] left-[75px] ', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: LeftMiddle, position: 'top-[-42px] left-[-87px]', text: `FANZONE хэсэг ${venue?.[1]?.quantity}` },
  { component: RightMiddle, position: 'top-[-42px] right-[93px]', text: ` FANZONE хэсэг ${venue?.[1]?.quantity}` },
  { component: TopOut, position: 'top-[-198px] left-[75px] ', text: `Энгийн хэсэг ${venue?.[0]?.quantity}` },
  { component: TopOut, position: 'top-[253px] left-[75px] ', text: `Энгийн хэсэг ${venue?.[0]?.quantity}`},
  { component: RightOut, position: 'top-[-83px] right-[26px]', text: ` FANZONE хэсэг ${venue?.[1]?.quantity}`},
  { component: LeftOut, position: 'top-[-83px] left-[-159px]', text: ` FANZONE хэсэг${venue?.[1]?.quantity}`},
  { component: LeftBottomOut, position: 'top-[166px] left-[-116px]', text: `Энгийн хэсэг  ${venue?.[0]?.quantity}`},
  { component: RightBottomOut, position: 'top-[166px] right-[66px]', text: `Энгийн хэсэг ${venue?.[0]?.quantity}`},
  { component: LeftTopOut, position: 'bottom-[150px] left-[-116px]', text: `Энгийн хэсэг ${venue?.[0]?.quantity}`},
  { component: RightTopOut, position: 'bottom-[150px] right-[66px]', text: `Энгийн хэсэг ${venue?.[0]?.quantity}`},];
  return (
    <>
      <div className="h-[600px] w-full relative hidden max-xl:hidden max-md:block max-md:h-[340px] max-sm:block max-sm:h-[340px]">
        <Image src={`/Stage.png`} alt="hi" fill priority />
      </div>
      <div className="h-[684px] w-[723px] max-sm:hidden max-md:hidden mt-40">
        <div className="relative mx-32 my-48">
          <div className="relative px-[36px] top-2 left-1">
            <SubTract />
            <div className="absolute w-[200px] h-[80px] rounded-2xl bg-gray-900 top-2 left-10">
              <p className="absolute top-8 left-[76px] font-semibold text-white ">ТАЙЗ</p>
            </div>
          </div>
          {sections.map(({ component: Component, position, text }, index) => (<div key={index} className={`absolute ${position} group`}>
            <Component />
            <div className="absolute top-10 left-0 w-max bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 ">

              {text}
            </div>
          </div>))}
        </div>
      </div>   
       </>
  );
}; 
