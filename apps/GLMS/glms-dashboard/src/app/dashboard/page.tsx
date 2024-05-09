'use client';
import { Book } from '../../../public/assets/Book';
import Courses from './_components/Course';
import { useState } from 'react';
import { AddChallengeModal } from '../challenge-dashboard/_feature/AddChallengeModal';
import { useRouter } from 'next/navigation';
import { Course, useGetCoursesQuery } from '@/generated';
import { CourseDeleteIcon } from '../../../public/assets/CourseDeleteIcon';
import AddIcon from '@mui/icons-material/Add';

const buttonsBottom = ['Хичээл', 'Ноорог', 'Архив'];

const DashboardOtherLab = () => {
  const { data } = useGetCoursesQuery();
  const router = useRouter();
  const [actionTab, setActionTab] = useState('Хичээл');

  return (
    <div data-testid="outerStack" className=" bg-[#F7F7F8] min-h-fit" data-cy="Dashboard-Lab-Page">
      <div className="">
        <div className="bg-white w-full flex flex-col items-center justify-center border-b-[1px] border-solid border-[#0000001A] border-t-[1px]">
          <div className="w-[85%]">
            <div className=" mr-auto ml-auto pt-[34px] flex">
              <div className=" w-[50%] gap-[4px] ">
                <div>
                  <p data-testid="title1" className="color-[#121316] text-[36px] font-medium">
                    Сайн уу?
                  </p>
                  <p data-testid="title2" className="color-[#121316] text-[36px] font-bold">
                    Өдрийн мэнд
                  </p>
                </div>
                <div className="flex gap-[16px]">
                  <button
                    data-testid="button1"
                    data-cy="CreateCourseBtn"
                    onClick={() => router.push('/create-course')}
                    className="flex justify-center items-center border-solid border-[2px] border-[#121316] gap-2 rounded-[8px]  hover:bg-black hover:text-white px-4 py-2"
                    color="inherit"
                  >
                    <p className="text-[14px] font-semibold">Хичээл</p>
                    <AddIcon className="w-[24px] h-[24px]" />
                  </button>
                  <AddChallengeModal />
                </div>
              </div>
              <div className=" flex items-center justify-center w-1/3">
                <Book />
                <div className="flex gap-[16px]">
                  <button
                    data-testid="button1"
                    onClick={() => router.push('/create-course')}
                    className="flex justify-center items-center border-solid border-[2px] border-black hover:bg-black hover:text-white  rounded-[8px] gap-[2px] w-[99px] h-[36px] "
                    color="inherit"
                  >
                    Сэдэв <AddIcon />
                  </button>
                  <AddChallengeModal />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border-b-[1px] border-solid border-[#0000001A] flex justify-center items-center">
            <div className=" mr-auto ml-auto  flex w-[85%] px-6 ">
              {buttonsBottom.map((name) => (
                <button
                  data-testid="tab1"
                  data-cy={name}
                  onClick={() => {
                    setActionTab(name);
                  }}
                  key={name}
                  className={`text-[14px] font-normal py-2 px-4 ${actionTab === name ? 'border-b-2 border-black font-extrabold' : ''}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <div className=" mr-auto ml-auto  flex max-w-[85%]">
          <div className=" flex flex-wrap box-border  h-full w-full">
            {data?.getCourses
              .filter((item: Course) => actionTab === item.status)
              .map((data, index) => {
                const handleClick = () => {
                  localStorage.setItem('courseID', `${data.id}`);
                  router.push(`/${data.id}`);
                };
                return (
                  <div className="relative" key={index}>
                    <div>
                      <div data-cy="courseClick" className="mt-8 mr-8" key={data.id} onClick={handleClick}>
                        <Courses id={data.id} thumbnail={data.thumbnail} title={data.title} description={data.description} position={data.position} />
                      </div>
                      <button className="absolute bottom-6 right-14">
                        <CourseDeleteIcon />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardOtherLab;
