'use client';

import { useAuth } from '@/common/providers';
import { Course } from '@/generated';

const Courses = (props: Course) => {
  const { id, thumbnail, title, description } = props;
  const { access } = useAuth();

  return (
    <div
      data-testid="courseContain"
      className={`bg-white dark:bg-[#2b2b2b] cursor-pointer w-[281px] overflow-hidden border-solid border-[1px] border-[#0000001A] rounded-xl relative ${
        access == 'багш' ? 'dark:bg-[#2b2b2b]' : 'dark:bg-[#3d3d3def]'
      }`}
      key={id}
    >
      <div className="w-full h-[120px] object-fill rounded-md overflow-hidden">
        <img data-testid="lessonImage" src={`${thumbnail}`} alt="lessonImage" />
      </div>
      <div className=" w-full px-[21px] justify-between py-2">
        <p className="text-[16px] font-bold mb-2 text-[#121316] dark:text-[#dedede]" data-testid="titleTest">
          {title}
        </p>
        <p className="text-[14px] font-normal overflow-hidden h-[40px] text-[#3F4145] dark:text-[#dedede]" data-testid="infoTest" color={'#3F4145'}>
          {description}
        </p>
        <div className="py-3 flex justify-between items-center">
          <div className="flex w-fit bg-[#C1E6CF]  px-3 py-[2px] rounded-xl  text-[14px] font-normal" data-testid="lessonCountTest">
            Lessons
          </div>
        </div>
      </div>
    </div>
  );
};
export default Courses;
