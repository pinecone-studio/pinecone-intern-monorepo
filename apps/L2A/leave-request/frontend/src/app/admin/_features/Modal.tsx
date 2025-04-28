import React from 'react';

type RegisterNewEmployeeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RegisterNewEmployeeModal: React.FC<RegisterNewEmployeeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div data-cy="register-employee-modal" className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative w-50 h-60">
        <button
        data-cy="close-register-modal"
          onClick={onClose}
          className="absolute top-3 right-3 text-black text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
};
