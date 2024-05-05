'use client';
import { EditButtonicon } from '../../../../public/assets/EditButtonicon';

type EditButtonProps = {
  onClick?: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="flex border-[1px] border-solid shadow-md px-[20px] py-[16px] gap-2 rounded-md" data-testid="edit-button-test-id">
      <p className=" text-[18px] font-semibold">Ерөнхийн мэдээлэл</p>
      <EditButtonicon />
    </button>
  );
};

export default EditButton;
