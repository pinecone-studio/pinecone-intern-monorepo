'use client';

import { useState } from 'react';
import { RegisterNewEmployeeButton } from './_components/button';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
    <div className="p-4">
      <RegisterNewEmployeeButton onClick={() => setIsModalOpen(true)} />
      <RegisterNewEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
    </div>
  );
};
export default Page;