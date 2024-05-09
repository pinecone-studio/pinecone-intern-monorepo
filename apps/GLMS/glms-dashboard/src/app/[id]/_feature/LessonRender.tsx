import { EditButtonIcon } from '../../../../public/assets/EditButtonicon';
import DeleteButton from '../_components/DeleteButton';
import EditButton from '../_components/Editbutton';
import { Lesson } from '@/generated';

const LessonRender = ({ lesson, handleCreateSection }: { lesson: Lesson; handleCreateSection: () => void }) => {
  return (
    <div onClick={handleCreateSection} className="border border-[#00000033] px-8 py-6 rounded-xl max-w-[792px] w-full h-[104px] flex justify-between hover:bg-[#f0f0f0] cursor-pointer">
      <div className="flex gap-4 items-center">
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
        <DeleteButton />
      </div>
    </div>
  );
};
export default LessonRender;
