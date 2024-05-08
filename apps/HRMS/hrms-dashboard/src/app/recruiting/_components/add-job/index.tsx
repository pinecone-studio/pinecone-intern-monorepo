'use client';

import { useRouter } from 'next/navigation';
import { LeftArrow } from '../../../asset';
import { Input, TextArea } from '../core';
import { CreateErrorModal } from '../modal';

export const AddJobPageComponent = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push('/recruiting');
  };
  return (
    <div className="mx-5 w-full">
      <div className="flex items-center mt-4">
        <button data-testid="back-button" onClick={handleBackButtonClick} className="hover:bg-base-300 p-3 rounded-md">
          <LeftArrow />
        </button>

        <div className="w-full">
          <h1 data-testid="title" className="text-center text-lg font-medium">
            Ажлын зар үүсгэх
          </h1>
        </div>
      </div>
      <div className="my-10 mt-16 mx-16">
        <Input label="Албан тушаалын нэр" placeholder="Placeholder" />
        <TextArea label="Үүрэг" placeholder="Placeholder" />
        <TextArea label="Шаардлага" placeholder="Placeholder" />
        <div className="mt-3 ">
          <h1 className="font-semibold">Цалингийн хэмжээ</h1>
          <div className="flex gap-5">
            <Input label="Доод цалин" placeholder="Placeholder" />
            <Input label="Дээд цалин" placeholder="Placeholder" />
          </div>
        </div>
      </div>
      <div data-testid="modal-button" className="flex justify-end mr-16">
        <CreateErrorModal text="Амжилттай Зар үүслээ" label="Хадгалах" />
      </div>
    </div>
  );
};
