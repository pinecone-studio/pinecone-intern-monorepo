'use client';
import DeleteButton from '../_components/DeleteButton';
import EditButton from '../_components/Editbutton';
import { Lesson, useDeleteLessonMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const LessonRender = ({ lesson, handleCreateSection }: { lesson: Lesson; handleCreateSection: () => void }) => {
  const [deleteLesson] = useDeleteLessonMutation();
  const router = useRouter();
  const id = lesson.id;

  const HandleDeleteLesson = () => {
    if (id) {
      deleteLesson({ variables: { id } });
      toast.success('Таны хичээл амжилттай устлаа ', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });    
    }
  };

  const HandleUpdateLessonPage = () => {
    if (id) {
      localStorage.setItem('lessonID', id);
      router.push('update-lesson');
    }
  };

  return (
    <div>
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
          <EditButton onClick={HandleUpdateLessonPage} />
          <DeleteButton onClick={HandleDeleteLesson} />
        </div>
      </div>
    </div>
  );
};
export default LessonRender;
