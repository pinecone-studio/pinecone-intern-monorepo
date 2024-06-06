'use client';

import { useRouter } from 'next/navigation';
import { ArrowBackIcon } from '../../../public/assets/ArrowBackIcon';
const AddAssessment = () => {
  const router = useRouter();
  return (
    <div data-testid="create-assessment-container" className="bg-[#F7F7F8] w-full flex justify-center py-6 dark:bg-[#121316f7] h-screen dark:text-[#dedede]">
      <div className="w-[90%] max-w-[1440px]">
        <div
          data-testid="test-back-page"
          onClick={() => router.push('/dashboard')}
          className="flex flex-row gap-[6px] mb-[26px] text-[18px]   font-semibold items-center cursor-pointer py-[10px] w-fit text-[#000]"
        >
          <ArrowBackIcon />
          {'Төсөл'}
        </div>
        <div className="w-[100%] h-[90%] bg-white rounded-xl py-10 px-8 flex flex-col gap-10 dark:bg-[#2b2b2b]">
          <div className="mb-4">
            <p className=" text-[28px] font-bold text-[#121316] dark:text-[#dedede]">{'Даалгавар'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddAssessment;
