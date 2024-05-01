'use client';
import { Book } from './assets/Book';
import Courses from './_components/Course';
import { useState } from 'react';
import { AddChallengeModal } from '../challenge-dashboard/_feature/AddChallengeModal';
import { useRouter } from 'next/navigation';
import { useGetCoursesQuery } from '@/generated/index';

const buttonsBottom = ['Хичээл', 'Ноорог', 'Архив'];

const DashboardOtherLab = () => {
  const { data } = useGetCoursesQuery();
  const router = useRouter();
  const [actionTab, setActionTab] = useState('Хичээл');

  return (
    <div data-testid="outerStack" className=" bg-[#ECEDF0] min-h-fit" data-cy="Dashboard-Lab-Page">
      <div className="bg-white w-full">
        <div className=" border-b-[1px] border-solid border-[#0000001A] border-t-[1px]  ">
          <div className=" mr-auto ml-auto px-[24px] flex max-w-[1536px]">
            <div className=" w-[50%] gap-[4px] py-[34px]">
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
                  onClick={() => router.push('/create-course')}
                  className="flex justify-center items-center border-solid border-[2px] border-[#121316] rounded-[8px] gap-[2px] hover:bg-black hover:text-white w-[99px] ease-in"
                  color="inherit"
                >
                  Сэдэв
                </button>
                <AddChallengeModal />
              </div>
            </div>
            <div className=" w-1/2 flex items-center">
              <Book />
            </div>
          </div>
        </div>
        <div className=" border-b-[1px] border-solid border-[#0000001A]">
          <div className=" mr-auto ml-auto px-[24px] flex max-w-[1536px]">
            {buttonsBottom.map((name) => (
              <button
                data-testid="tab1"
                data-cy={name}
                onClick={() => {
                  setActionTab(name);
                }}
                key={name}
                className={`text-lg font-medium py-2 px-4 ${actionTab === name ? 'border-b-2 border-black' : ''}`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className=" w-full">
        <div className=" mr-auto ml-auto px-[24px] flex max-w-[1536px]">
          <div className=" flex flex-wrap box-border  h-full w-full">
            {data?.getCourses.map((data) => (
              <div className="p-2" key={data.id}>
                <Courses id={data.id} thumbnail={data.thumbnail} title={data.title} description={data.description} position={data.position} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardOtherLab;
