'use client';

import { MdRadioButtonChecked, MdAddPhotoAlternate } from 'react-icons/md';

type Props = {
  selectedBtn: string;
  handleSelectText: () => void;
  handleSelectFile: () => void;
};

export const TextOrFileQuestionCreate = ({ selectedBtn, handleSelectFile, handleSelectText }: Props) => {
  const isTextSelected = selectedBtn === 'TEXT' ? 'bg-black text-white' : 'bg-slate-200 text-black';
  const isImageSelected = selectedBtn === 'IMAGE' ? 'bg-black text-white' : 'bg-slate-200 text-black';

  const centerStyle = 'flex flex-col justify-center items-center hover:cursor-pointer';
  const containerTextOrFile = 'flex w-[220px] rounded-2xl border border-slate-400';
  const uploadTextClass = `flex justify-evenly items-center w-[110px] rounded-l-2xl font-semibold text-md bg-black py-2 ${isTextSelected} `;
  const uploadFileClass = `flex justify-evenly items-center w-[110px] rounded-r-2xl font-semibold text-md  py-2  ${isImageSelected}`;

  return (
    <div className={centerStyle}>
      <div className={containerTextOrFile}>
        <div className={uploadTextClass} onClick={handleSelectText} data-testid="select-text-button">
          <MdRadioButtonChecked />
          <span> Сонгох</span>
        </div>
        <div className={uploadFileClass} onClick={handleSelectFile} data-testid="select-file-button">
          <MdAddPhotoAlternate />
          <span> Зураг</span>
        </div>
      </div>
    </div>
  );
};
