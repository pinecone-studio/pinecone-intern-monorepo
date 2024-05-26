'use client';

import { useState } from 'react';
import { DeletedSvg, CreatedSvg } from '../../../../assets/index';

type Props = {
  text: string;
  labelType?: 'Устгах' | 'Хадгалах';
  onClick?: () => void;
  onClose?: () => void;
  disabled?: boolean;
};

export const CreateErrorModal = ({ text, labelType, onClick, onClose, disabled }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const labels = [
    { button: 'Устгах', svg: <DeletedSvg />, text: 'Амжилттай устгалаа', style: 'border-[#D6D8DB] bg-white text-[#121316] hover:bg-[#cccccc] hover:border-[#a6a6a6]' },
    { button: 'Хадгалах', svg: <CreatedSvg />, text: 'Амжилттай хадгаллаа', style: 'border-black bg-[#D6D8DB] hover:bg-black rounded-lg hover:text-white text-black border-none' },
  ];
  const message = labels.filter((label) => label.button === labelType);

  return (
    <div>
      <button
        className={`btn shadow-none tracking-tight ${message[0].style}`}
        onClick={() => {
          onClick && onClick();
          handleOpen();
        }}
        disabled={disabled}
      >
        {text}
      </button>
      <dialog className="modal flex justify-center m-auto backdrop-brightness-50 w-screen" open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" data-testid="modal">
        <div className="modal-box bg-white">
          <div>
            <button
              onClick={() => {
                handleClose();
                onClose && onClose();
              }}
              data-testid="close-button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[#121316]"
            >
              ✕
            </button>
          </div>
          <div data-testid="button-modal" className="flex flex-col justify-center items-center mx-5 mb-2 gap-2 bg-white">
            <div className="rounded-md p-3">{message[0].svg}</div>
            <p className="text-xl font-semibold text-[#121316]">{message[0].text}.</p>
          </div>
        </div>
      </dialog>
    </div>
  );
};
