import React from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { PiTrashSimpleBold } from 'react-icons/pi';

type CommentsProps = {
  name?: string;
  comment?: string;
};

const UserCommentCard = (props: CommentsProps) => {
  const { name, comment } = props;
  return (
    <div className="p-[32px] bg-white rounded-2xl h-[200px] mt-6 ">
      <div className="items-stretch">
        <div>
          <h1 className="text-[20px] font-bold">{name}</h1>
          <p className="text-[18px] font-normal mt-2">{comment}</p>
        </div>
        <div className=" justify-between  grid grid-cols-2 h-[60px]">
          <div className="flex gap-[16px] ">
            <button className="flex justify-center items-center gap-2 self-end">
              <MdOutlineEdit className="h-[20px] w-[20px]" />
              Засах
            </button>
            <button className="flex justify-center items-center gap-2 self-end">
              <PiTrashSimpleBold className="h-[20px] w-[20px]" />
              Устгах
            </button>
          </div>
          <div className="flex gap-[16px] justify-end">
            <button className="flex justify-center items-center gap-2 self-end">
              <AiOutlineLike className="h-[20px] w-[20px]" /> 0
            </button>
            <button className="flex justify-center items-center gap-2 self-end">
              <AiOutlineDislike className="h-[20px] w-[20px]" />0
            </button>
            <button className="flex justify-center items-center gap-2 self-end">
              <FaReply /> Хариулах
            </button>
          </div>
        </div>
        {/* <div className="flex justify-start items-center gap-2 mt-[16px] p-2">
        <BsArrowReturnRight /> 1 хариу
      </div> */}
      </div>
    </div>
  );
};

export default UserCommentCard;
