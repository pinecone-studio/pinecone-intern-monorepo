'use client';

import { useState } from 'react';
import { AdminHeader } from './_components/AdminHeader';
import { RegisterNewEmployeeButton } from './_components/Button';
import { RegisterNewEmployeeModal } from './_features/Modal';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
         <AdminHeader />
      <div className="p-4">
        <RegisterNewEmployeeButton onClick={() => setIsModalOpen(true)} />
        <RegisterNewEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};
export default Page;
