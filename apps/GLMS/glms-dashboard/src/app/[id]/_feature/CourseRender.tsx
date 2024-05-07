'use client';
import CourseTitle from '../_components/CourseTitle';
import CourseImage from '../_components/CourseImage';
import DeleteButton from '../_components/DeleteButton';
import BackButton from '../_components/Backbutton';
import { Course, Lesson } from '@/generated';
import CourseDesc from '../_components/CourseDesc';
import { useRouter } from 'next/navigation';
import EditBigButton from '../_components/EditBigButton';
import AddLessonButton from '../_components/AddLessonButton';
<<<<<<< HEAD
import LessonRender from './LessonRender';
type DataTypes = {
  data: Course | undefined;
  lessonData: Lesson[] | undefined;
};

const CourseRender = ({ data, lessonData }: DataTypes) => {
=======
type DataTypes = {
  data: Course | undefined;
  // lessonData: Lesson[] | undefined;
};

const CourseRender = ({ data }: DataTypes) => {
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
  const router = useRouter();

  return (
    <div>
      <div className=" mr-auto ml-auto px-[24px] flex  flex-col max-w-[90vw] gap-[24px] pt-8">
<<<<<<< HEAD
        <BackButton
          onClick={() => {
            router.push('/dashboard');
          }}
        />
=======
        <BackButton onClick={handleback} />
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
        <div className=" py-[48px] px-[24px] bg-white rounded-xl " key={data?.id}>
          <div className="max-w-[1180px] gap-[24px] flex flex-col m-auto">
            <div className="flex justify-between">
              <CourseTitle title={data?.title} />
              <div className="flex gap-4">
                <EditBigButton onClick={Boolean} />
                <DeleteButton onClick={Boolean} />
              </div>
            </div>
            <div className="flex justify-between gap-[97px] ">
              <CourseDesc description={data?.description} />
              <CourseImage thumbnail={data?.thumbnail} />
            </div>
<<<<<<< HEAD
            {lessonData?.map((lesson: Lesson, index: number) => {
              return <LessonRender lesson={lesson} key={index} />;
            })}

            <AddLessonButton
              onClick={() => {
                router.push('/create-lesson');
              }}
            />
=======
            {/* {!lessonData && <div className="max-w-[792px] w-full text-center text-slate-[#D6D8DB] text-xs">Хичээл байхгүй байна</div>}
            {lessonData?.map((lesson: Lesson) => {
              return <LessonRender lesson={lesson} />;
            })} */}

            <AddLessonButton />
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRender;
