'use client';
import React, { MouseEvent } from 'react';
import { ArticlesButton } from './ArticlesButton';
import { TbCopyCheckFilled } from 'react-icons/tb';

type CreateArticleModalType = {
  isVisible: boolean;
  onClose: () => void;
  handleSubmit: () => void;
};

const CreateArticleModal = ({ isVisible, onClose, handleSubmit }: CreateArticleModalType) => {
  if (!isVisible) return null;

  const handleClose = (e: MouseEvent<HTMLElement>): void => {
    if ((e.target as Element).id === 'wrapper') onClose();
  };

  return (
    <div
      data-cy="aritlce-modal-cy-id"
      data-testid="blackBackground"
      id="wrapper"
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="w-[528px] flex flex-col bg-white relative rounded-2xl gap-8">
        <button data-testid="modal-close-button" className="py-3 text-black text-xl absolute top-[13px] right-6 font-semibold" onClick={onClose}>
          X
        </button>
        <div className="mt-12 flex justify-center">
          <TbCopyCheckFilled size={48} />
        </div>
        <p className="text-center text-2xl font-bold tracking-tight">Та нийтлэхэд бэлэн үү?</p>
        <div className="flex gap-9 justify-end p-6 border-t">
          <ArticlesButton able={false} addClass="bg-gray-400 text-gray-700 font-bold rounded-md p-2" text="Дараа төлөвлөх" onClick={onClose} dataCy="plan-later-button" />
          <ArticlesButton able={false} addClass="bg-black text-white font-bold rounded-md p-2" text="Нийтлэх" typeText="submit" onClick={handleSubmit} dataCy="publish-button" />
        </div>
      </div>
    </div>
  );
};

export default CreateArticleModal;
