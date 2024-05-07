import { PlusIcon } from 'apps/GLMS/glms-dashboard/public/assets/PlusIcon';
type RouterType = {
  onClick?: () => void;
};
const AddLessonButton = ({ onClick }: RouterType) => {
  return (
    <button data-testid="add-lesson-button-test-id" className="flex items-center btn max-w-[792px] w-full h-14" onClick={onClick}>
      Шинэ хичээл
      <PlusIcon />
    </button>
  );
};
export default AddLessonButton;
