'use client';

import { useState } from 'react';
import { Add } from '@mui/icons-material';
import { SelectWithLabel } from '../_components';
import { useRouter } from 'next/navigation';
import { Closeicon } from '../icons/CloseIcon';

export const AddChallengeModal = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleSelectCourse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
  };
  const handleSelectTopic = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  const classesMockData = ['HTML intro', 'HTML tags', 'HTML syntax', 'HTML symentic tags'];
  const topicsMockData = ['HTML intro', 'HTML tags', 'HTML syntax', 'HTML symentic tags'];

  const router = useRouter();
  return (
    <div className="rounded-badge">
      <button
        className="btn border-solid border-2 border-gray-900 rounded-lg px-4 py-2 text-black hover:bg-black hover:text-white"
        data-testid="challenge-button"
        onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)!.showModal()}
      >
        Сорил
        <Add />
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-md" data-testid="challenge-dialog">
          <form method="dialog" className="flex-col pb-2 border-b-2 w-full">
            <p className="font-bold text-2xl mx-4"> Сорил нэмэх</p>
            <button className="btn btn-sm btn-circle btn-ghost absolute font-semibold right-6 top-5" data-testid="close-button">
              <Closeicon />
            </button>
          </form>
          <div>
            <div className="my-3">
              <SelectWithLabel label="Сэдэв сонгох" data-testid="select-with-label" options={classesMockData} selectedOption={selectedTopic} onSelect={handleSelectTopic} />
            </div>
            <div>
              <SelectWithLabel label="Хичээл сонгох" data-testid="select-with-label" options={topicsMockData} selectedOption={selectedCourse} onSelect={handleSelectCourse} />
            </div>
            <div className="modal-action" data-testid="modal-action">
              <form method="dialog">
                <button className="btn bg-black text-white rounded-xl hover:bg-white hover:text-black" data-testid="next-page-btn" onClick={() => router.push('/challenge-dashboard')}>
                  Оруулах
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
