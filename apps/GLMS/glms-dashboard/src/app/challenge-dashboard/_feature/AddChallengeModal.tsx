'use client';

import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { CloseIcon } from '../../../assets/icon/CloseIcon';
import Link from 'next/link';

type CourseType = { title: string; description: string; thumbnail: string; status: string; createdAt: string; id: string };
type ModalProps = {
  courses: CourseType[];
};

export const AddChallengeModal = (props: ModalProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const handleSelectTopic = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  return (
    <div className="rounded-badge">
      <button
        className="btn border-solid border-2 border-gray-900 rounded-lg px-4 py-2 text-black hover:bg-black hover:text-white"
        data-testid="challenge-button"
        onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)!.showModal()}
      >
        Сорил
        <IoIosAdd />
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-md" data-testid="challenge-dialog">
          <form method="dialog" className="flex-col pb-2 border-b-2 w-full">
            <p className="font-bold text-2xl mx-4"> Сорил нэмэх</p>
            <button className="btn btn-sm btn-circle btn-ghost absolute font-semibold right-6 top-5" data-testid="close-button">
              <CloseIcon />
            </button>
          </form>
          <div>
            <div className="my-3">
              <p style={{ fontWeight: 600, fontSize: '14px', color: '#121316' }}>Сэдэв сонгох</p>
              <select data-cy="select" className="flex w-96 h-9 border-[#D6D8DB] border p-2 rounded-lg" onChange={handleSelectTopic}>
                {props?.courses.map((course, i) => {
                  return (
                    <option value={course.id} key={i}>
                      {course.title}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="modal-action" data-testid="modal-action">
              <form method="dialog">
                <button className="btn bg-black text-white rounded-xl hover:bg-white hover:text-black" data-testid="next-page-btn">
                  <Link href={{ pathname: '/challenge-dashboard', query: { key: selectedTopic } }}>Оруулах</Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
