'use client';
import { EditButtonicon } from '../../../../public/assets/EditButtonicon';

type EditButtonProps = {
  onClick?: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
<<<<<<< HEAD
    <button onClick={onClick} className="btn btn-ghost w-14 h-14 p-4 border border-[#D6D8DB] rounded-md cursor-pointer " data-testid="edit-button-test-id">
=======
    <button onClick={onClick} className="btn btn-ghost w-14 h-14 p-4 border border-[#D6D8DB] rounded-md cursor-pointer " data-testid="delete-button-test-id">
>>>>>>> be6f3c89 (feat(lesson-query): lesson query)
      <EditButtonicon />
    </button>
  );
};

export default EditButton;
