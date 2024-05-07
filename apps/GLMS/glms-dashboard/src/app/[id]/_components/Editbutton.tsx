'use client';
import { EditButtonicon } from 'apps/GLMS/glms-dashboard/public/assets/EditButtonicon';

type EditButtonProps = {
  onClick?: () => void;
};

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn btn-ghost w-14 h-14 p-4 border border-[#D6D8DB] rounded-md cursor-pointer " data-testid="delete-button-test-id">
      <EditButtonicon />
    </button>
  );
};

export default EditButton;
