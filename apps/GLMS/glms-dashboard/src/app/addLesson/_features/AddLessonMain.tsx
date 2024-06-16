import { Arrow } from '@/app/icons';
import { LessonEntry } from '../_components/LessonEntry';

export const AddLessonMain = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#F7F7F8] flex justify-center">
      <div className="w-[1250px]">
        <div className="flex items-center cursor-pointer w-[145px] justify-between my-[24px]">
          <Arrow />
          <p className="p-[10px]  text-base font-semibold leading-6 ">Нүүр хуудас</p>
        </div>
        <LessonEntry />
      </div>
    </div>
  );
};
