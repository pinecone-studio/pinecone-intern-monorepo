'use client';

type EditButtonProps = {
  onClick?: () => void;
};

const EditSaveButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-black text-white px-4 py-2 rounded" data-testid="edit-save-button-test-id">
      Хадгалах
    </button>
  );
};

export default EditSaveButton;
