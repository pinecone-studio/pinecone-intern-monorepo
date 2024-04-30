'use client';

import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { DialogHeader, SelectWithLabel } from '../_components';

export const AddChallengeModal = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleSelectCourse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
  };
  const handleSelectTopic = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  const handleClose = () => {
    console.log('text');
  };

  const classesMockData = ['HTML intro', 'HTML tags', 'HTML syntax', 'HTML symentic tags'];
  const topicsMockData = ['HTML intro', 'HTML tags', 'HTML syntax', 'HTML symentic tags'];

  return (
    <div className="rounded-[30px]">
      <button
        className="flex items-center border border-black rounded-lg px-4 py-2 text-black hover:bg-black hover:text-white"
        onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)!.showModal()}
      >
        Сорил
        <Add />
      </button>
      <dialog id="my_modal_1" className="overflow-y-auto modal">
        <div className="modal-box">
          <DialogHeader title={'Сорил нэмэх'} onClose={handleClose} />
          <div className="p-4">
            <SelectWithLabel label="Сэдэв сонгох" options={classesMockData} selectedOption={selectedTopic} onSelect={handleSelectTopic} />
            <SelectWithLabel label="Хичээл сонгох" options={topicsMockData} selectedOption={selectedCourse} onSelect={handleSelectCourse} />
            <div className="mt-4"></div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
