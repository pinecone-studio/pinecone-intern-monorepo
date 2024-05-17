'use client';

import { LeftArrow } from '../../../asset';
import { useRouter } from 'next/navigation';
import { Input, TextArea } from '../core';
import { CreateErrorModal } from '../modal';

export const EditJob = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push('/recruiting/job-detail');
  };

  return (
    <div className="w-full">
      <div className="flex items-center bg-white w-full">
        <button data-testid="back-button" onClick={handleBackButtonClick} className="hover:bg-[#cccccc] p-4 rounded-md">
          <LeftArrow />
        </button>

        <div className="w-full">
          <h1 data-testid="title" className="text-center text-sm font-semibold text-black">
            Ажлын зар үүсгэх
          </h1>
        </div>
      </div>
      <div className="py-12 px-24">
        <Input label="Албан тушаалын нэр" placeholder="Placeholder" />
        <TextArea label="Үүрэг" placeholder="Placeholder" />
        <TextArea label="Шаардлага" placeholder="Placeholder" />
        <div className="mt-3 ">
          <h1 className="font-semibold text-base tracking-tight text-[#121316]">Цалингийн хэмжээ</h1>
          <div className="grid grid-cols-2 gap-x-6">
            <Input label="Доод цалин" placeholder="Placeholder" />
            <Input label="Дээд цалин" placeholder="Placeholder" />
          </div>
        </div>
        <div data-testid="modal-button" className="flex justify-end mr-0 mt-6">
          <CreateErrorModal text="Хадгалах" labelType="Хадгалах" />
        </div>
      </div>
    </div>
  );
};
