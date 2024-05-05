'use client';
import { Course } from '@/generated';

const Courses = (props: Course) => {
  const { id, thumbnail, title, description } = props;

  return (
    <div className=" bg-white cursor-pointer h-[240px] w-[281px] overflow-hidden border-solid border-[1px] border-[#0000001A] rounded-xl" key={id} data-testid="courseContain">
      <div className="w-full h-[120px] rounded-md overflow-hidden">
        <img data-testid="lessonImage" src={`${thumbnail}`} alt="lessonImage" />
      </div>
      <div className="h-[120px] w-full px-[21px] justify-between py-1">
        <p className="text-[16px] font-bold  " data-testid="titleTest" color={'#121316'}>
          {title}
        </p>
        <p className="test-[14px] font-normal overflow-hidden h-[48px]" data-testid="infoTest" color={'#3F4145'}>
          {description}
        </p>
        <div className=" w-fit px-1 py-[2px] bg-[#C1E6CF] rounded-xl">
          <p className="flex text-[14px] font-normal" data-testid="lessonCountTest">
            Lessons
          </p>
        </div>
      </div>
    </div>
  );
};
export default Courses;
