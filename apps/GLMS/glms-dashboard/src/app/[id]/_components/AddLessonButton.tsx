import { PlusIcon } from 'apps/GLMS/glms-dashboard/public/assets/PlusIcon';
import { useRouter } from 'next/navigation';

const AddLessonButton = () => {
  const router = useRouter();
  return (
    <button
      className="flex items-center btn max-w-[792px] w-full h-14"
      onClick={() => {
        router.push('/create-lesson');
      }}
    >
      Шинэ хичээл
      <PlusIcon />
    </button>
  );
};
export default AddLessonButton;
