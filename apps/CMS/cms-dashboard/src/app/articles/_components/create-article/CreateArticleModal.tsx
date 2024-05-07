'use client';
import React from 'react';
import CustomButton from './CustomButton';
import ModalLogo from './ModalLogo';
type CreateArticleModalType = {
  isVisible: boolean;
  onClose: () => void;
};
const CreateArticleModal = ({ isVisible, onClose }: CreateArticleModalType) => {
  if (!isVisible) return null;
  const handleCLose = (e: any) => {
    if (e.target.id === 'wrapper') onClose();
  };
  return (
    <div id="wrapper" className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleCLose}>
      <div className=" w-[528px] flex flex-col bg-white relative rounded-2xl gap-8">
        <button className=" py-3 text-black text-xl absolute top-[13px] right-6 font-semibold" onClick={onClose}>
          X
        </button>
        <div className=" mt-12 flex justify-center">
          <ModalLogo />
        </div>
        <p className=" text-center text-2xl font-bold tracking-tight mt-12">Та нийтлэхэд бэлэн үү?</p>
        <div className=" flex gap-9 justify-end p-6 border-t">
          <CustomButton label="Дараа төлөвлөх" bgColor="secondary"></CustomButton>
          <CustomButton label="Нийтлэх" bgColor="primary"></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleModal;
