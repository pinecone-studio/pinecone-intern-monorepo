'use client';

import Image from 'next/image';
import { useState } from 'react';
import deleted from '../../_components/asset/icons/successDeleted.png';
import created from '../../_components/asset/icons/successCreated.png';

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

  const message = label === 'Устгах' ? deleted.src : created.src;

  return (
    <div>
      <button className="btn" onClick={handleOpen}>
        {label}
      </button>
      <dialog className="modal rounded-3xl" open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" data-testid="modal">
        <div className="modal-box">
          <div>
            <button onClick={handleClose} data-testid="close-button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </div>
          <div className="flex flex-col justify-center items-center mx-5 mb-2 gap-2">
            <div className="rounded-md p-3">
              <Image src={message} alt="png" width={50} height={50} />
            </div>
            <p className="text-xl font-semibold text-black">{text}.</p>
          </div>
        </div>
      </dialog>
    </div>
  );
};
