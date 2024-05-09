import GetSections from './_features/GetSections';
import AddSection from './_features/AddSection';
import { ArrowLeftIcon } from '../../../../public/assets/ArrowLeftIcon';
import Link from 'next/link';

const SectionPage = () => {
  return (
    <div className="flex flex-col justify-center bg-[#F7F7F8] px-20" data-testid="section-page-container">
      <Link href={'/dashboard'} data-cy="handle-back-page" className=" flex flex-row justify-center items-center gap-1 w-[140px] h-fit py-4">
        <ArrowLeftIcon />
        <p>Нүүр</p>
      </Link>
      <GetSections />
      <AddSection />
    </div>
  );
};

export default SectionPage;
