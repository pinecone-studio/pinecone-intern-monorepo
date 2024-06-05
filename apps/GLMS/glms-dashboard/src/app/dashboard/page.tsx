/* eslint-disable */
'use client';
import Courses from './_components/Course';
import { useEffect, useState } from 'react';
import { AddChallengeModal } from '../challenge-dashboard/_feature/AddChallengeModal';
import { usePathname, useRouter } from 'next/navigation';
import { Course, useGetCoursesQuery } from '@/generated';
import AddIcon from '@mui/icons-material/Add';
import Loading from '../../components/Loading';
import { useAuth } from '@/common/providers';
import { EmptyIcon } from 'apps/GLMS/glms-dashboard/public/assets/EmptyIcon';
const buttonsBottom = ['Хичээл', 'Ноорог', 'Архив'];
type CourseType = { title: string; description: string; thumbnail: string; status: string; createdAt: string; id: string };
const DashboardOtherLab = () => {
  const { access } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { data, loading, refetch } = useGetCoursesQuery();
  const [actionTab, setActionTab] = useState('Хичээл');
  const handleCreateCourse = () => {
    router.push('/create-course');
  };
  const handleCreateAssessment = () => {
    router.push('/create-assessment');
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
      {access === 'багш' && (
        <div className="bg-white w-full flex flex-col items-center justify-center border-b-[1px] border-solid border-[#0000001A] border-t-[1px] dark:bg-[#121316ef]">
          <div className="w-[85%] max-w-[1440px] m-auto">
            <div className=" m-auto pt-[34px] flex">
              <div className=" w-[50%] gap-[4px] ">
                <div className="mb-5 text-[#121316]  dark:text-[#ededed]">
                  <p data-testid="title1" className="text-4xl font-medium mb-3">
                    Сайн уу?
                  </p>
                  <p data-testid="title2" className="text-4xl font-bold">
                    Өдрийн мэнд
                  </p>
                </div>
                <div className="flex gap-[16px]">
                  <button
                    data-testid="button1"
                    data-cy="CreateCourseBtn"
                    onClick={handleCreateCourse}
                    className="flex justify-center items-center border-solid border-[2px] border-[#121316] gap-2 rounded-[8px] dark:text-[#ededed] btn hover:bg-black dark:hover:bg-[#3d3d3def] dark:border-[#515151] px-4 py-2 dark:bg-[#4a4a4a] hover:text-white"
                    color="inherit"
                  >
                    <p className="text-[14px] font-semibold">Хичээл</p>
                    <AddIcon className="w-6 h-6" />
                  </button>
                  <AddChallengeModal courses={data?.getCourses as CourseType[]} />
                  <button
                    data-testid="assessment-btn"
                    onClick={handleCreateAssessment}
                    color="inherit"
                    className="flex justify-center items-center border-solid border-[2px] border-[#121316] gap-2 rounded-[8px] dark:text-[#ededed] btn hover:bg-black dark:hover:bg-[#3d3d3def] dark:border-[#515151] px-4 py-2 dark:bg-[#4a4a4a] hover:text-white"
                  >
                    <p className="text-[14px] font-semibold"> Төсөл</p>
                    <AddIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white mt-8 dark:bg-inherit dark:text-[#ededed]">
              <div className="flex w-[85%] px-6 ">
                {buttonsBottom.map((name) => (
                  <button
                    data-testid="tab1"
                    data-cy={name}
                    onClick={() => {
                      setActionTab(name);
                    }}
                    key={name}
                    className={`text-[14px] font-normal py-2 px-4 ${actionTab === name ? 'border-b-2 border-black dark:border-[#3d3d3def] font-extrabold' : ''}`}
                  >
                    <p className={` ${actionTab === name ? ' font-bold' : ''}`}>{name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {access == 'багш' ? (
        <div className="w-full min-h-screen dark:bg-[#121316f7]">
          <div className=" mr-auto ml-auto  flex w-[85%] max-w-[1440px] m-auto">
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
                        <div data-cy="courseClick" className="mt-8 mr-8 " key={data.id} onClick={handleClick}>
                          <Courses id={data.id} thumbnail={data.thumbnail} title={data.title} description={data.description} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              {data?.getCourses.filter((item: Course) => actionTab === item.status).length == 0 && (
                <div className="m-auto mt-[5%]">
                  <EmptyIcon />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen dark:bg-[#121316f7]">
          <div className="max-w-[1440px] m-auto pt-8 w-[85%]">
            <div className="py-6 px-10 bg-white dark:bg-[#2b2b2b] min-h-[75vh] rounded-xl pt-8 justify-center">
              <h1 className="dark:text-[#dedede] text-3xl font-bold mb-8">Сэдвүүд</h1>
              <div className=" mx-auto  flex w-full">
                <div className="flex flex-wrap box-border h-full w-full gap-8">
                  {data?.getCourses
                    .filter((item: Course) => actionTab === item.status)
                    .map((data, index) => {
                      const handleClick = () => {
                        localStorage.setItem('courseID', `${data.id}`);
                        router.push(`/${data.id}`);
                      };
                      return (
                        <div className="relative" key={index}>
                          <div data-cy="courseClick" key={data.id} onClick={handleClick}>
                            <Courses id={data?.id || undefined} thumbnail={data?.thumbnail} title={data?.title} description={data?.description} />
                          </div>
                        </div>
                      );
                    })}
                  {data?.getCourses.filter((item: Course) => actionTab === item.status).length == 0 && (
                    <div className="m-auto mt-[5%]">
                      <EmptyIcon />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DashboardOtherLab;
