'use client';

import { useState } from 'react';
import { DeletedSvg, CreatedSvg } from '../../../../assets/index';

type Props = {
  text: string;
  label?: 'Устгах' | 'Засварлах' | 'Хадгалах';
};

export const CreateErrorModal = ({ text, label }: Props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const labels = [
    { label: 'Устгах', svg: <DeletedSvg /> },
    { label: 'Засварлах', svg: <CreatedSvg /> },
    { label: 'Хадгалах', svg: <CreatedSvg /> },
  ];
  const message = labels.filter((label) => label === label);

  return (
    <div>
      <button className="btn shadow-none tracking-tight border-[#D6D8DB] bg-white text-[#121316] hover:bg-[#cccccc] hover:border-[#a6a6a6]" onClick={handleOpen}>
        {label}
      </button>
      <dialog className="modal flex justify-center m-auto backdrop-brightness-50 w-screen" open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" data-testid="modal">
        <div className="modal-box bg-white">
          <div>
            <button onClick={handleClose} data-testid="close-button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[#121316]">
              ✕
            </button>
          </div>
          <div className="flex flex-col justify-center items-center mx-5 mb-2 gap-2 bg-white">
            <div className="rounded-md p-3">{message[1].svg}</div>
            <p className="text-xl font-semibold text-[#121316]">{text}.</p>
          </div>
        </div>
      </dialog>
    </div>
  );
};
