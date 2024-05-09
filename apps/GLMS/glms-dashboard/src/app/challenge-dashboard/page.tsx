'use client';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { AddQuiz } from './_feature/AddQuiz';

const Page = () => {
  return (
    <div data-testid="challenge-dashboard-page" className="container mx-auto">
      <button className="flex gap-1 p-2 justify-center items-center font-semibold text-xs leading-6">
        <FaArrowLeftLong /> Нүүр хуудас
      </button>
      <section>
        <AddQuiz />
      </section>
    </div>
  );
};

export default Page;
