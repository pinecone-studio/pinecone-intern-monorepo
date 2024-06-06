'use client';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useAuth } from '@/common/providers';
import { usePathname, useRouter } from 'next/navigation';
import { Course, useGetCoursesQuery } from '@/generated';

import { AddChallengeModal } from '../challenge-dashboard/_feature/AddChallengeModal';
import ActionTab from './features/ActionTab';

const studentTabs = ['Хичээл', 'Сорил'];
const courseTabs = ['Хичээл', 'Ноорог', 'Архив'];
const challengeTabs = ['Сорил', 'Сорилийн ноорог', 'Сорилийн архив'];
const tabs = courseTabs.concat(challengeTabs);
export type ChallengeType = {
  _id: string;
  __typename?: 'Course';
  title: string;
  thumbnail: string;
  status: 'ARCHIVE' | 'DRAFT' | 'APPROVE';
  id: string;

  description?: string;
  courseId: Course;
};

type CourseType = { title: string; description: string; thumbnail: string; status: string; createdAt: string; id: string };

const DashboardOtherLab = () => {
  const { access } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { data, refetch } = useGetCoursesQuery();

  const [actionTab, setActionTab] = useState('Хичээл');

  const handleCreateCourse = () => {
    router.push('/create-course');
  };

  useEffect(() => {
    refetch();
    if (pathname === '/dashboard') {
      localStorage.removeItem('courseID');
      localStorage.removeItem('lessonID');
      localStorage.removeItem('sectionId');
    }
  }, [pathname, refetch]);

  return (
    <div data-testid="dashboard-page" className="bg-[#F7F7F8] min-h-fit" data-cy="Dashboard-Lab-Page">
      <div className="bg-white w-full flex flex-col items-center justify-center border-b-[1px] border-solid border-[#0000001A] border-t-[1px] dark:bg-[#121316ef]">
        <div className="w-[85%] max-w-[1440px] m-auto">
          <div className="m-auto pt-[34px] flex">
            <div className="w-[50%] gap-[4px]">
              <div className="mb-5 text-[#121316] dark:text-[#ededed]">
                <p data-testid="title1" className="text-4xl font-medium mb-3">
                  Сайн уу?
                </p>
                <p data-testid="title2" className="text-4xl font-bold">
                  Өдрийн мэнд
                </p>
              </div>
              {access == 'багш' && (
                <div className="flex gap-[16px]">
                  <button
                    data-testid="button1"
                    data-cy="CreateCourseBtn"
                    onClick={handleCreateCourse}
                    className="flex justify-center items-center border-solid border-[2px] border-[#121316] gap-2 rounded-[8px] dark:text-[#ededed] btn hover:bg-black dark:hover:bg-[#3d3d3def] dark:border-[#515151] px-4 py-2 dark:bg-[#4a4a4a] hover:text-white"
                    color="inherit"
                  >
                    <p className="text-[14px] font-semibold">Хичээл</p>
                    <MdAdd className="w-6 h-6" />
                  </button>

                  <AddChallengeModal courses={data?.getCourses as CourseType[]} />
                </div>
              )}
            </div>
          </div>
          <div className="bg-white mt-8 dark:bg-inherit dark:text-[#ededed]">
            <div className="flex w-[85%] px-6">
              {access == 'багш'
                ? tabs.map((name) => (
                    <button
                      data-testid="tab1"
                      data-cy={name}
                      onClick={() => setActionTab(name)}
                      key={name}
                      className={`text-[14px] font-normal py-2 px-4 ${actionTab === name && 'border-b-2 border-black dark:border-[#3d3d3def] text-base font-extrabold'}`}
                    >
                      {name}
                    </button>
                  ))
                : studentTabs.map((name) => (
                    <button
                      data-testid="tab1"
                      data-cy={name}
                      onClick={() => setActionTab(name)}
                      key={name}
                      className={`text-[14px] font-normal py-2 px-4 ${actionTab === name && 'border-b-2 border-black dark:border-[#3d3d3def] text-base font-extrabold'}`}
                    >
                      {name}
                    </button>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`w-full min-h-screen dark:bg-[#121316f7]`}>
        <ActionTab actionTab={actionTab} />
      </div>
    </div>
  );
};
export default DashboardOtherLab;
