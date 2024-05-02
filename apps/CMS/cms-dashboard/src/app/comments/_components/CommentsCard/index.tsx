import { PiEyeClosed } from 'react-icons/pi';
import React from 'react';
import { MdDeleteOutline, MdReply } from 'react-icons/md';

const Index = () => {
  return (
    <div className="w-96 rounded-lg bg-white h-60" data-testid="comments-dialog-form-container">
      <div className="p-8">
        <p className="text-lg font-bold leading-8">Сувдан</p>
        <div className="flex gap-4">
          <p className="text-base text-gray-700 leading-8">suvdaa2@gmail.com</p>
          <p className="text-base text-gray-700 leading-8 flex items-center">1 минутийн өмнө</p>
        </div>
        <div className="flex items-center">
          <p className="text-base font-semibold leading-8">Post:</p>
          <p className="text-base text-gray-500">Morphosis Хөтөлбөр: Гадны зах зээлд ажиллах сонирхолтой инженерүүдэд</p>
        </div>
        <p className="text-lg font-bold leading-8">Хулхины газар байна оо</p>
      </div>
      <div className="border-t border-gray-700 flex justify-between p-8">
        <div>
          <button className="flex gap-1">
            <PiEyeClosed />{' '}
            <p className="text-sm" data-cy="Hidden-Button">
              Нуухаа болих
            </p>
          </button>
          <button className="flex gap-1">
            <MdDeleteOutline />
            <p className="text-sm" data-cy="Deleted-Button">
              Устгах
            </p>
          </button>
        </div>
        <button className="flex gap-1">
          <MdReply />
          <p className="text-sm" data-cy="Reply-Button">
            Хариулах
          </p>
        </button>
      </div>
    </div>
  );
};
export default Index;
