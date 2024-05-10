"use client"
import { useState } from 'react';
import { EditButtonIcon } from '../../../../public/assets/EditButtonicon';
import SuccessDeleteToggle from '../../../components/SuccessDeleteToggle';
import DeleteButton from '../_components/DeleteButton';
import EditButton from '../_components/Editbutton';
import { Lesson, useDeleteLessonMutation } from '@/generated';

const LessonRender = ({ lesson, handleCreateSection }: { lesson: Lesson; handleCreateSection: () => void }) => {
  const [deleted, isDeleted] = useState(false);
  const [deleteLesson] = useDeleteLessonMutation();

  const HandleDeleteLesson = (id: string | undefined | null) => {
    if (id) {
      deleteLesson({ variables: { id } });
      isDeleted(true);
    }
  };

  return (
    <div>
      {deleted && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-stone-100/50">
          <SuccessDeleteToggle />
        </div>
      )}
      <div className="border border-[#00000033] px-8 py-6 rounded-xl max-w-[792px] w-full h-[104px] flex justify-between hover:bg-[f0f0f0] cursor-pointer">
        <div onClick={handleCreateSection} className="flex gap-4 items-center">
          <div>
            <img src={`${lesson.thumbnail}`} className="w-9 h-9 rounded-md object-fit" />
          </div>
          <p className="font-semibold">{lesson?.title}</p>

          <button className="w-9 h-9 btn-sm btn-ghost cursor-pointer border border-[#00000033] rounded-md flex items-center justify-center p-2">
            <EditButtonIcon />
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <EditButton />
          <DeleteButton onClick={() => HandleDeleteLesson(lesson.id)} />
        </div>
      </div>
    </div>
  );
};
export default LessonRender;
