'use client';
import React, { MouseEvent } from 'react';
import ModalLogo from './create-article/ModalLogo';

type CreateArticleModalType = {
  isVisible: boolean;
  onClose: () => void;
};

const Modal = ({ isVisible, onClose }: CreateArticleModalType) => {
  if (!isVisible) return <></>;
  const handleCLose = (e: MouseEvent<HTMLElement>): void => {
    if ((e.target as Element).id === 'wrapper') onClose();
  };
  const handleSubmit = () => {
    localStorage.removeItem('token');
    onClose();
    location.reload();
  };
  return (
    <div data-cy="aritlce-modal-cy-id" id="wrapper" className=" fixed inset-2 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-11" onClick={handleCLose}>
      <div className=" w-[528px] flex flex-col bg-white relative rounded-2xl gap-8 z-12">
        <button className=" py-3 text-black text-xl absolute top-[13px] right-6 font-semibold " onClick={onClose}>
          X
        </button>
        <div className=" mt-12 flex justify-center items-center">
          <ModalLogo />
        </div>
        <p className=" text-center text-2xl font-bold tracking-tight mt-12 text-[#1c2024]">Системээс гарахдаа итгэлтэй байна уу?</p>
        <div className=" flex gap-9 justify-end p-6 border-t">
          <button type="submit" className={`text-[18px] px-[20px] py-[12px] rounded-[8px] items-center bg-[#1C20240A] text-[#1c2024]`} onClick={onClose}>
            Үгүй
          </button>
          <button type="submit" className={`text-[18px] px-[20px] py-[12px] rounded-[8px] items-center bg-[#1c2024] text-white  h-[48px] `} onClick={handleSubmit}>
            Тийм
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
