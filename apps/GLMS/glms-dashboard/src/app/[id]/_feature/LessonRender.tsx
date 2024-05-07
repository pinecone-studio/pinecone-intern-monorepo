import { EditButtonicon } from 'apps/GLMS/glms-dashboard/public/assets/EditButtonicon';
import DeleteButton from '../_components/DeleteButton';
import EditButton from '../_components/Editbutton';
import { Lesson } from '@/generated';

const LessonRender = ({ lesson }: { lesson: Lesson }) => {
  return (
    <div className="border border-[#00000033] px-8 py-6 rounded-xl max-w-[792px] w-full h-[104px] flex justify-between">
      <div className="flex gap-4 items-center">
        <div className="w-9 h-9 bg-purple-500 rounded-md">
          <img src={`${lesson.thumbnail}`} />
        </div>
        <p className="font-semibold">{lesson?.title}</p>

        <button className="w-9 h-9 btn-sm btn-ghost cursor-pointer border border-[#00000033] rounded-md flex items-center justify-center p-2">
          <EditButtonicon />
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
