<<<<<<< HEAD
import { PlusIcon } from '../../../../public/assets/PlusIcon';
type RouterType = {
  onClick?: () => void;
};
const AddLessonButton = ({ onClick }: RouterType) => {
  return (
    <button data-testid="add-lesson-button-test-id" className="flex items-center btn max-w-[792px] w-full h-14" onClick={onClick}>
=======
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
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
      Шинэ хичээл
      <PlusIcon />
    </button>
  );
};
export default AddLessonButton;
