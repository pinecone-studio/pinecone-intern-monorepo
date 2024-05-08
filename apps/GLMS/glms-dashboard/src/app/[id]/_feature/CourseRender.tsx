'use client';
import CourseTitle from '../_components/CourseTitle';
import CourseImage from '../_components/CourseImage';
import DeleteButton from '../_components/DeleteButton';
import BackButton from '../_components/Backbutton';
import { Course } from '@/generated';
import CourseDesc from '../_components/CourseDesc';
import { useRouter } from 'next/navigation';
import EditBigButton from '../_components/EditBigButton';
import AddLessonButton from '../_components/AddLessonButton';
type DataTypes = {
  data: Course | undefined;
};

const CourseRender = ({ data }: DataTypes) => {
  const router = useRouter();

  return (
    <div data-cy="idCourse">
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
                <EditBigButton onClick={Boolean} />
                <DeleteButton onClick={Boolean} />
              </div>
            </div>
            <div className="flex justify-between gap-[97px] ">
              <CourseDesc description={data?.description} />
              <CourseImage thumbnail={data?.thumbnail} />
            </div>

            <AddLessonButton
              data-cy="addLessonButton"
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
