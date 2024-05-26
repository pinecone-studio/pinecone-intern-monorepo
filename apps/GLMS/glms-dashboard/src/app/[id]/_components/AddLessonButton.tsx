import { PlusIcon } from '../../../../public/assets/PlusIcon';
type RouterType = {
  onClick?: () => void;
};
const AddLessonButton = ({ onClick }: RouterType) => {
  return (
    <button
      data-testid="add-lesson-button-test-id"
      className="flex items-center max-w-[792px] w-full h-14 dark:text-[#ededed] btn hover:bg-[#232323] bg-black text-white dark:hover:bg-[#3d3d3def] dark:border-[#515151] dark:bg-[#4a4a4a] hover:text-white fill-[#fff] dark:fill-[#ededed]"
      onClick={onClick}
    >
      Шинэ хичээл
      <PlusIcon />
    </button>
  );
};
export default AddLessonButton;
