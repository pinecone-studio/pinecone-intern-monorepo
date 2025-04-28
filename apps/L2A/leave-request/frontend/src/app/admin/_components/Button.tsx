'use client';
import React from 'react';
type RegisterNewEmployeeButtonProps = {
  onClick: () => void;
};

export const RegisterNewEmployeeButton: React.FC<RegisterNewEmployeeButtonProps> = ({ onClick }) => {
  return (
    <button
    data-cy="open-register-modal"
      className="bg-black text-white py-4 px-4 rounded-lg"
      onClick={onClick}
    >
      + Шинэ ажилтан бүртгэх
    </button>
  );
};