'use client';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

type PropsType = {
  taskName: string;
  priority: number;
};
export const Third = ({ taskName, priority }: PropsType) => {
  return (
    <div className="flex justify-evenly p-3 bg-[#999999] rounded-lg items-center max-w-full">
      <div>{priority}</div>
      <div>{taskName}</div>
      <div>
        <MdEdit />
      </div>
      <div>
        <FaRegTrashAlt />
      </div>
    </div>
  );
};
