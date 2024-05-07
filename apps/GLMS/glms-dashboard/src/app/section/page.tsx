'use client';
import { useRouter } from 'next/navigation';
import GetSections from './_features/GetSections';
import AddSection from './_features/AddSection';
import { ArrowLeft } from '../create-course/assets/ArrowLeft';

const SectionPage = () => {

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center bg-[#F7F7F8] px-20" data-testid="section-page-container">
      <div
        data-testid="handle-back-page"
        onClick={() => {
          router.push('/dashboard');
        }}
        className=" flex flex-row justify-center items-center gap-1 w-[140px] h-fit py-4"
      >
        <ArrowLeft/>
        <p>Нүүр</p>
      </div>
      <GetSections/>
      <AddSection/>
    </div>
  );
};

export default SectionPage;
