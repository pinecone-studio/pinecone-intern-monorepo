'use client';
import React from 'react';
type RegisterNewEmployeeButtonProps = {
  onClick: () => void;
};

export const RegisterNewEmployeeButton: React.FC<RegisterNewEmployeeButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-black text-white py-4 px-4 rounded-lg"
      onClick={onClick}
    >
      + Шинэ ажилтан бүртгэх
    </button>
  );
};