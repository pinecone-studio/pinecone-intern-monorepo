'use client';
import CourseTitle from '../_components/CourseTitle';
import CourseImage from '../_components/CourseImage';
import DeleteButton from '../_components/DeleteButton';
import BackButton from '../_components/Backbutton';
import { Course } from '@/generated';
import CourseDesc from '../_components/CourseDesc';
import { useRouter } from 'next/navigation';
import EditButton from '../_components/Editbutton';

const CourseRender = ({ data }: { data: Course | undefined }) => {
  const router = useRouter();

  const handleback = () => {
    router.push('/dashboard');
  };

  return (
    <div className="bg-[#F7F7F8]">
      <div className=" mr-auto ml-auto px-[24px] flex  flex-col max-w-[1536px] gap-[24px]">
        <BackButton onClick={handleback} />
        <div className=" py-[48px] px-[24px] bg-white rounded-xl gap-[24px] flex flex-col" key={data?.id}>
          <div className="flex justify-between">
            <CourseTitle title={data?.title} />
            <div className="flex gap-4">
              <EditButton onClick={Boolean} />
              <DeleteButton onClick={Boolean} />
            </div>
          </div>
          <div className="flex justify-between gap-[97px] ">
            <CourseDesc description={data?.description} />
            <CourseImage thumbnail={data?.thumbnail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRender;
