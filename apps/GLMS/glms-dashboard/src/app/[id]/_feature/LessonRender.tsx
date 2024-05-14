'use client';
import { useState } from 'react';
import SuccessDeleteToggle from '../../../components/SuccessDeleteToggle';
import DeleteButton from '../_components/DeleteButton';
import EditButton from '../_components/Editbutton';
import { Lesson, useDeleteLessonMutation } from '@/generated';

const LessonRender = ({ lesson, handleCreateSection }: { lesson: Lesson; handleCreateSection: () => void }) => {
  const [deleted, isDeleted] = useState(false);
  const [deleteLesson] = useDeleteLessonMutation();

  const HandleDeleteLesson = () => {
    if (lesson?.id) {
      deleteLesson({ variables: { id: lesson?.id } });
      isDeleted(true);
    }
  };

  return (
    <div>
      {deleted && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-stone-100/50 ">
          <SuccessDeleteToggle />
        </div>
      )}
      <div className=" border border-[#00000033] px-8 py-6 rounded-xl max-w-[792px] w-full h-[104px] flex justify-between cursor-pointer hover:bg-[#fbfbfb] ease-in-out mb-4">
        <div data-cy="lesson-test-id" onClick={handleCreateSection} className="max-w-[792px] w-full h-[104px] py-2.5 ">
          <div className="flex gap-4 items-center">
            <div>
              <img src={`${lesson.thumbnail}`} className="w-9 h-9 rounded-md object-fit" />
            </div>
            <p className="font-semibold">{lesson?.title}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center z-50 ">
          <EditButton />
          <DeleteButton onClick={HandleDeleteLesson} />
        </div>
      </div>
    </div>
  );
};
export default LessonRender;
