import React from 'react';
import { IoSend } from 'react-icons/io5';

const CreateCommentsCard = () => {
  return (
    <div className="w-[928px] h-[250px] rounded-2xl  bg-white   " style={{ padding: ' var(--24-px-unit-6, 24px) var(--24-px-unit-6, 24px) var(--64-px-unit-16, 64px) var(--24-px-unit-6, 24px)' }}>
      <div className="">
        <input type="text" placeholder="Цахим хаягаа оруулна уу..." className="bg-white w-full py-[16px] border-b-2" />
        <input type="text" placeholder="Таны нэр" className="bg-white w-full py-[16px] border-b-2" />
        <input type="text" placeholder="Энд сэтгэгдлээ бичнэ үү..." className="bg-white w-full py-[16px]" />
        <div className="grid justify-items-end">
          <button>
            <IoSend className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommentsCard;
