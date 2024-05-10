'use client';
import React, {  MouseEvent } from 'react';
import CustomButton from './CustomButton';
import ModalLogo from './ModalLogo';

type CreateArticleModalType = {
  isVisible: boolean;
  onClose: () => void;
  handleSubmit:()=>void
  
};

const CreateArticleModal = ({ isVisible, onClose, handleSubmit  }: CreateArticleModalType) => {
  if (!isVisible) return <></>;
  const handleCLose = (e: MouseEvent<HTMLElement>):void =>{
    if ((e.target as Element   ).id === 'wrapper') onClose();
  };

  return (
    <div
      data-cy="aritlce-modal-cy-id"
      data-testid="blackBackground"
      id="wrapper"
      className=" fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleCLose}
    >
      <div className=" w-[528px] flex flex-col bg-white relative rounded-2xl gap-8">
        <button data-testid="modal-close-button" className=" py-3 text-black text-xl absolute top-[13px] right-6 font-semibold" onClick={onClose}>
          X
        </button>
        <div className=" mt-12 flex justify-center">
          <ModalLogo />
        </div>
        <p className=" text-center text-2xl font-bold tracking-tight mt-12">Та нийтлэхэд бэлэн үү?</p>
        <div className=" flex gap-9 justify-end p-6 border-t">
          <CustomButton label="Дараа төлөвлөх" bgColor="secondary"/>
          <button 
            type="submit"
            data-cy="publishButtonArticle"
            data-testid="modal-publish-button"
            className={`text-[18px] px-[20px] py-[12px] rounded-[8px] items-center  hover:bg-slate-700 bg-[#1c2024] text-white h-[48px] `}
            onClick={handleSubmit}
          >
         Нийтлэх
          </button>
          
 
        </div>
      </div>
    </div>
  );
};

export default CreateArticleModal;
