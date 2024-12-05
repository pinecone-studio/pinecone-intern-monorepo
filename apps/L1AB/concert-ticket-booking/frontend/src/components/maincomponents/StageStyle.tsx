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
export const StageStyle = () => {
  const sections = [{ component: LeftBottomInside, position: 'top-[96px] left-1', text: 'Доод зүүн хэсэг' },
  { component: TopInside, position: 'top-[108px] left-[75px]', text: 'Дээд хэсэг' },
  { component: TopInside, position: 'top-[-40px] left-[75px]', text: 'Доод хэсэг' },
  { component: RightBottomInside, position: 'top-[96px] right-[186px]', text: 'Доод баруун хэсэг' },
  { component: LeftInside, position: 'top-[-15px] right-[432px]', text: 'Зүүн дотор тал' },
  { component: RightInside, position: 'top-[-15px] right-[150px]', text: 'Баруун дотор тал' },
  { component: LeftTopInside, position: 'bottom-[76px] left-1', text: 'Дээд зүүн дотор тал' },
  { component: RightTopInside, position: 'bottom-[76px] right-[186px]', text: 'Дээд баруун дотор тал' },
  { component: LeftBottomMiddle, position: 'top-[117px] left-[-56px]', text: 'Доод зүүн дунд хэсэг' },
  { component: RightTopMiddle, position: 'top-[-129px] right-[124px]', text: 'Дээд баруун дунд хэсэг' },
  { component: RightBottomMiddle, position: 'top-[117px] right-[124px]', text: 'Доод баруун дунд хэсэг' },
  { component: LeftTopMiddle, position: 'top-[-129px] left-[-56px]', text: 'Дээд зүүн дунд хэсэг' },
  { component: TopMiddle, position: 'top-[153px] left-[75px] ', text: 'Дунд хэсэг' },
  { component: TopMiddle, position: 'top-[-129px] left-[75px] ', text: 'Дунд хэсэг' },
  { component: TopMiddle, position: 'top-[196px] left-[75px] ', text: 'Дунд хэсэг' },
  { component: TopMiddle, position: 'top-[-86px] left-[75px] ', text: 'Дунд хэсэг' },
  { component: LeftMiddle, position: 'top-[-42px] left-[-87px]', text: 'Зүүн дунд тал' },
  { component: RightMiddle, position: 'top-[-42px] right-[93px]', text: 'Баруун дунд тал' },
  { component: TopOut, position: 'top-[-198px] left-[75px] ', text: 'Гадна дээд хэсэг' },
  { component: TopOut, position: 'top-[253px] left-[75px] ', text: 'Гадна доод хэсэг' },
  { component: RightOut, position: 'top-[-83px] right-[26px]', text: 'Баруун гадна тал' },
  { component: LeftOut, position: 'top-[-83px] left-[-159px]', text: 'Зүүн гадна тал' },
  { component: LeftBottomOut, position: 'top-[166px] left-[-116px]', text: 'Доод зүүн гадна тал' },
  { component: RightBottomOut, position: 'top-[166px] right-[66px]', text: 'Доод баруун гадна тал' },
  { component: LeftTopOut, position: 'bottom-[150px] left-[-116px]', text: 'Дээд зүүн гадна тал' },
  { component: RightTopOut, position: 'bottom-[150px] right-[66px]', text: 'Дээд баруун гадна тал' },];
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
            <div className="absolute top-10 left-0 w-max bg-black text-white text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 text-sm">

              {text}
            </div>
          </div>))}
        </div>
      </div>   
       </>
  );
}; 