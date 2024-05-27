'use client';
import { ApolloQueryResult } from '@apollo/client';
import DeleteButton from '../_components/DeleteButton';
import EditButton from '../_components/Editbutton';
import { Exact, GetLessonByIdQuery, Lesson, useDeleteLessonMutation } from '@/generated';
import { useRouter } from 'next/navigation';

const LessonRender = ({
  lesson,
  handleCreateSection,
  refetch,
}: {
  lesson: Lesson;
  handleCreateSection: () => void;
  refetch: (
    _variables?:
      | Partial<
          Exact<{
            getLessonByIdId: string;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetLessonByIdQuery>>;
}) => {
  const [deleteLesson] = useDeleteLessonMutation();
  const router = useRouter();
  const id = lesson.id;

  const HandleDeleteLesson = () => {
    if (id) {
      deleteLesson({ variables: { id } });
      refetch();
    }
  };

  const HandleUpdateLessonPage = () => {
    if (id) {
      localStorage.setItem('lessonID', id);
      router.push('update-lesson');
    }
  };

  return (
    <div className=" border border-[#00000033] px-8 py-6 rounded-xl max-w-[792px] w-full h-[104px] flex justify-between cursor-pointer hover:bg-[#fbfbfb] dark:hover:bg-[#434343ef] dark:border-[#515151]  dark:bg-[#3d3d3def] ease-in-out mb-4">
      <div data-cy="lesson-test-id" onClick={handleCreateSection} className="max-w-[792px] w-full h-[104px] py-2.5 ">
        <div className="flex gap-4 items-center">
          <div>
            <img src={`${lesson.thumbnail}`} className="w-9 h-9 rounded-md object-fit" />
          </div>
          <p className="font-semibold">{lesson?.title}</p>
        </div>
      </div>
      <div className="flex gap-4 items-center z-50 ">
        <EditButton onClick={HandleUpdateLessonPage} />
        <DeleteButton onClick={HandleDeleteLesson} />
      </div>
    </div>
  );
};
export default LessonRender;
