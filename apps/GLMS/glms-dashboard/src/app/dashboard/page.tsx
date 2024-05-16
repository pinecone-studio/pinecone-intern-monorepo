'use client';
import Courses from './_components/Course';
import { useEffect, useState } from 'react';
import { AddChallengeModal } from '../challenge-dashboard/_feature/AddChallengeModal';
import { usePathname, useRouter } from 'next/navigation';
import { Course, useGetCoursesQuery, useGetLessonByIdQuery } from '@/generated';
import { CourseDeleteIcon } from '../../../public/assets/CourseDeleteIcon';
import AddIcon from '@mui/icons-material/Add';
import Loading from '../../components/Loading';

const buttonsBottom = ['Хичээл', 'Ноорог', 'Архив'];
const date = new Date().toLocaleTimeString();

const DashboardOtherLab = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data, loading, refetch } = useGetCoursesQuery();
  const [actionTab, setActionTab] = useState('Хичээл');
  const handleCreateCourse = () => {
    router.push('/create-course');
  };
  useEffect(() => {
    refetch();
    if (pathname == '/dashboard') {
      localStorage.removeItem('courseID');
      localStorage.removeItem('lessonID');
      localStorage.removeItem('sectionId');
    }
  }, []);
  if (loading) return <Loading />;
  return (
    <div data-testid="outerStack" className=" bg-[#F7F7F8] min-h-fit" data-cy="Dashboard-Lab-Page">
      <div className="">
        <div className="bg-white w-full flex flex-col items-center justify-center border-b-[1px] border-solid border-[#0000001A] border-t-[1px]">
          <div className="w-[85%]">
            <div className=" mr-auto ml-auto pt-[34px] flex">
              <div className=" w-[50%] gap-[4px] ">
                <div className="mb-5">
                  <p data-testid="title1" className="color-[#121316] text-[36px] font-medium">
                    Сайн уу?
                  </p>
                  <p data-testid="title2" className="color-[#121316] text-[36px] font-bold">
                    {date.slice(-2) === 'AM' ? 'Өдрийн мэнд' : 'Оройн мэнд'}
                  </p>
                </div>
                <div className="flex gap-[16px]">
                  <button
                    data-testid="button1"
                    data-cy="CreateCourseBtn"
                    onClick={handleCreateCourse}
                    className="flex justify-center items-center border-solid border-[2px] border-[#121316] gap-2 rounded-[8px]  hover:bg-black hover:text-white px-4 py-2"
                    color="inherit"
                  >
                    <p className="text-[14px] font-semibold">Хичээл</p>
                    <AddIcon className="w-[24px] h-[24px]" />
                  </button>
                  <AddChallengeModal />
                </div>
              </div>
            </div>
            <div className="bg-white mt-8">
              <div className="flex w-[85%] px-6 ">
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
                    <p className={` ${actionTab === name ? ' font-bold' : ''}`}>{name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[65vh] ">
        <div className=" mr-auto ml-auto  flex max-w-[85%]">
          <div className=" flex flex-wrap box-border  h-full w-full">
            {data?.getCourses
              .filter((item: Course) => actionTab === item.status)
              .map((data, index) => {
                const { data: lessonData, loading: lessonLoading } = useGetLessonByIdQuery({ variables: { getLessonByIdId: data.id || '' } });
                const length = lessonData?.getLessonById?.length;
                const handleClick = () => {
                  localStorage.setItem('courseID', `${data.id}`);
                  router.push(`/${data.id}`);
                };
                return (
                  <div className="relative" key={index}>
                    <div>
                      <div data-cy="courseClick" className="mt-8 mr-8" key={data.id} onClick={handleClick}>
                        <Courses id={data.id} thumbnail={data.thumbnail} title={data.title} description={data.description} length={length} loading={lessonLoading} />
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
