'use client';

import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

export const TextOrFileQuestionCreate = () => {
  const [selectedBtn, setSelectedBtn] = useState<'text' | 'file'>('text');

  const handleSelectText = () => {
    setSelectedBtn('text');
  };

  const handleSelectFile = () => {
    setSelectedBtn('file');
  };
  const isTextSelected = selectedBtn === 'text' ? 'bg-black text-white' : 'bg-slate-200 text-black';
  const isImageSelected = selectedBtn === 'file' ? 'bg-black text-white' : 'bg-slate-200 text-black';

  const centerStyle = 'flex flex-col justify-center items-center ';
  const containerTextOrFile = 'flex w-[220px] rounded-2xl border border-slate-400';
  const uploadTextClass = `flex justify-evenly items-center w-[110px] rounded-l-2xl font-semibold text-md bg-black py-2 ${isTextSelected} `;
  const uploadFileClass = `flex justify-evenly items-center w-[110px] rounded-r-2xl font-semibold text-md  py-2  ${isImageSelected}`;

  return (
    <div className={centerStyle}>
      <div className={containerTextOrFile}>
        <div className={uploadTextClass} onClick={handleSelectText} data-testid="select-text-button">
          <RadioButtonCheckedIcon />
          <span> Сонгох</span>
        </div>
        <div className={uploadFileClass} onClick={handleSelectFile} data-testid="select-file-button">
          <AddPhotoAlternateIcon />
          <span> Зураг</span>
        </div>
      </div>
    </div>
  );
};
