'use client';
import CourseTitle from '../_components/CourseTitle';
import CourseImage from '../_components/CourseImage';
import DeleteButton from '../_components/DeleteButton';
import BackButton from '../_components/Backbutton';
import { Course, Lesson } from '@/generated';
import CourseDesc from '../_components/CourseDesc';
import { useRouter } from 'next/navigation';
import AddLessonButton from '../_components/AddLessonButton';
import LessonRender from './LessonRender';
import { EditButtonIcon } from '../../../../public/assets/EditButtonicon';
type DataTypes = {
  data: Course | undefined;
  lessonData: Lesson[] | undefined;
};

const CourseRender = ({ data, lessonData }: DataTypes) => {
  const router = useRouter();

  const handleUpdateCoursePage = () => {
    router.push('update-course');
  };
  const handleBack = () => {
    router.push('/dashboard');
  };
  const handleCreateLesson = () => {
    router.push('/create-lesson');
  };

  return (
    <div>
      <div className="mr-auto ml-auto sm:px-3 px-6 flex flex-col sm:max-w-[90vw] max-w-[95vw] gap-[24px] pt-8">
        <BackButton onClick={handleBack} />
        <div className=" py-[48px] px-[24px] bg-white rounded-xl " key={data?.id}>
          <div className="max-w-[1180px] gap-[24px] flex flex-col m-auto justify-between ">
            <div className="lg:flex lg:gap-7 md:block justify-between">
              <div className="w-full max-w-[792px] ">
                <CourseTitle title={data?.title} />
                <div className="min-h-[220px] mt-1 mb-6 ">
                  <CourseDesc description={data?.description} />
                </div>
                {lessonData?.length === 0 && (
                  <div data-testid="no-lesson-test" className="text-[#d0d0d0] text-center mb-6 flex justify-between items-center">
                    <div className="w-full h-[1.5px] bg-[#dbdbdb] max-w-[250px]" />
                    <p className="min-w-[160px]">Хичээл байхгүй байна</p> <div className="w-full h-[1.5px] bg-[#dbdbdb] max-w-[250px]" />
                  </div>
                )}
                {lessonData?.map((lesson: Lesson, index: number) => {
                  const handleCreateSection = () => {
                    localStorage.setItem('lessonID', lesson.id || '');
                    router.push('/section');
                  };

                  return <LessonRender handleCreateSection={handleCreateSection} lesson={lesson} key={index} />;
                })}

                <AddLessonButton onClick={handleCreateLesson} />
              </div>
              <div className="max-w-[313px] w-full">
                <div className="flex gap-4 mb-6 w-">
                  <button data-testid="edit-course-button" onClick={handleUpdateCoursePage} className="btn btn-ghost flex border border-[#D6D8DB] px-5 py-4 gap-2 rounded-md h-14 cursor-pointer">
                    <p className=" text-[18px] font-semibold">Ерөнхий мэдээлэл</p>
                    <EditButtonIcon />
                  </button>
                  <DeleteButton onClick={Boolean} />
                </div>
                <CourseImage thumbnail={data?.thumbnail} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRender;
