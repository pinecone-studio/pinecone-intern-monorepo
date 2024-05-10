import { PenIcon } from '../../../../public/assets/PenIcon';

export const UpdateButton = () => {
  return (
    <button data-testid="update-button" className="bg-[#F6F6F6] px-2 py-[10px] rounded-[8px] flex gap-2 ">
      <PenIcon />
      <p className="text-main text-[14px] items-center">Засварлах</p>
    </button>
  );
};
