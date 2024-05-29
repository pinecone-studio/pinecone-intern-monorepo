import React from 'react';
import { MdOutlineEdit } from 'react-icons/md';
import { PiTrashSimpleBold } from 'react-icons/pi';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { BsArrowReturnRight } from 'react-icons/bs';

const UserComment = () => {
  return (
    <div>
      <div className="p-[32px] bg-white rounded-2xl h-[200px]">
        <div>
          <div>
            <h1 className="text-[20px] font-bold">Таны сэтгэгдэл</h1>
            <p className="text-[18px] font-normal">Энэ мэдээ маш их таалагдаж байна. Pinecone яахын аргагүй Монголд энэ салбарыг түгээж байгаа байгууллага мөн.</p>
          </div>
          <div className="flex justify-between mt-[20px] ">
            <div className="flex gap-[16px]">
              <button className="flex justify-center items-center gap-2" style={{ padding: 'var(--8-px-unit-2, 8px' }}>
                <MdOutlineEdit className="h-[20px] w-[20px]" />
                Засах
              </button>
              <button className="flex justify-center items-center gap-2">
                <PiTrashSimpleBold className="h-[20px] w-[20px]" />
                Устгах
              </button>
            </div>
            <div className="flex gap-[16px]">
              <button className="flex justify-center items-center gap-2">
                <AiOutlineLike className="h-[20px] w-[20px]" /> 0
              </button>
              <button className="flex justify-center items-center gap-2">
                <AiOutlineDislike className="h-[20px] w-[20px]" />0
              </button>
              <button className="flex justify-center items-center gap-2">
                <FaReply /> Хариулах
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-2 mt-[16px] p-2">
        <BsArrowReturnRight /> 1 хариу
      </div>
    </div>
  );
};

export default UserComment;
