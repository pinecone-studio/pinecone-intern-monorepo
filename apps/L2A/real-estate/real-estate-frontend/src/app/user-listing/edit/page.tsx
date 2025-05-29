'use client';

import GeneralInfoSection from './_components/GeneralInfoSection';

const Page = () => {
  return (
    <div className="bg-[#F9F9F9] py-10 px-5 sm:px-8 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full max-w-[728px] space-y-6">
          <GeneralInfoSection />
        </div>
      </div>
    </div>
  );
};

export default Page;
