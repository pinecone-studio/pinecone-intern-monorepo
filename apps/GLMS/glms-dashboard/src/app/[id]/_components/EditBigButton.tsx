'use client';
import { EditButtonicon } from '../../../../public/assets/EditButtonicon';

type EditBigButtonProps = {
  onClick?: () => void;
};

const EditBigButton: React.FC<EditBigButtonProps> = ({ onClick }) => {
  return (
<<<<<<< HEAD
    <button data-testid="edit-button-test-id" onClick={onClick} className="btn btn-ghost flex border border-[#D6D8DB] px-5 py-4 gap-2 rounded-md h-14 cursor-pointer ">
=======
    <button onClick={onClick} className="btn btn-ghost flex border border-[#D6D8DB] px-5 py-4 gap-2 rounded-md h-14 cursor-pointer " data-testid="edit-button-test-id">
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
      <p className=" text-[18px] font-semibold">Ерөнхийн мэдээлэл</p>
      <EditButtonicon />
    </button>
  );
};

export default EditBigButton;
