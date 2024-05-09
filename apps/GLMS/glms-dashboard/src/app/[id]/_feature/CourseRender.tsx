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

  return (
    <div>
      <div className=" mr-auto ml-auto px-[24px] flex  flex-col max-w-[90vw] gap-[24px] pt-8">
        <BackButton
          onClick={() => {
            router.push('/dashboard');
          }}
        />
        <div className=" py-[48px] px-[24px] bg-white rounded-xl " key={data?.id}>
          <div className="max-w-[1180px] gap-[24px] flex flex-col m-auto">
            <div className="flex justify-between">
              <CourseTitle title={data?.title} />
              <div className="flex gap-4">
                <button data-testid="edit-button-test-id" className="btn btn-ghost flex border border-[#D6D8DB] px-5 py-4 gap-2 rounded-md h-14 cursor-pointer ">
                  <p className=" text-[18px] font-semibold">Ерөнхийн мэдээлэл</p>
                  <EditButtonIcon />
                </button>
                <DeleteButton onClick={Boolean} />
              </div>
            </div>
            <div className="flex justify-between gap-[97px] ">
              <CourseDesc description={data?.description} />
              <CourseImage thumbnail={data?.thumbnail} />
            </div>
            {lessonData?.map((lesson: Lesson, index: number) => {
              const handleCreateSection = () => {
                localStorage.setItem('lessonID', lesson.id || '');
                router.push(`/section`);
              };
              return <LessonRender lesson={lesson} handleCreateSection={handleCreateSection} key={index} />;
            })}

            <AddLessonButton
              onClick={() => {
                router.push('/create-lesson');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRender;
