'use client';

type EditButtonProps = {
  onClick?: () => void;
};

const EditDeclineButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-[#FF0000] text-white px-4 py-2 rounded" data-testid="edit-decline-button-test-id">
      Цуцлах
    </button>
  );
};

export default EditDeclineButton;
