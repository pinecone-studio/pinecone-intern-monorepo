'use client';

import { LeftArrow } from '../../../asset';
import { useRouter } from 'next/navigation';
import { ApplicantStatusLabel } from '../core';
import { CreateErrorModal } from '../modal';

export const JobDetail = () => {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push('/recruiting');
  };

  const handleEditButtonClick = () => {
    router.push('/recruiting/edit-job');
  };

  return (
    <div className="w-full">
      <div className="flex items-center bg-white w-full">
        <button data-testid="back-button" onClick={handleBackButtonClick} className="hover:bg-[#cccccc] p-4 rounded-md">
          <LeftArrow />
        </button>

        <div className="w-full">
          <h1 data-testid="title" className="text-center text-sm font-semibold text-black">
            Ажлын зарын дэлгэрэнгүй
          </h1>
        </div>
      </div>
      <div className="m-8 bg-white rounded-xl tracking-tight p-6">
        <div>
          <div className="text-[#3F4145]">Албан тушаалын нэр:</div>
          <div className="text-[#121316] font-semibold">Software Developer: Intern</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[#3F4145] mt-6">Үүрэг:</div>
          <div className="text-sm text-[#121316]">
            <li>Development of software products by writing, testing, and documenting code.</li>
            <li>Responsible for providing technical documentation for system, features, and components.</li>
            <li>Responsible for providing thorough unit testing and automated testing to ensure a quality product is delivered.</li>
            <li>Expected to improve, enhance, and support existing operations.</li>
            <li>Designing, building, installing, configuring and supporting production deployments.</li>
            <li>Implement and maintain security and data privacy best practices.</li>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <div className="text-[#3F4145]">Шаардлага:</div>
          <div className="text-sm text-[#121316]">
            <li>Bachelor’s degree in Computer Science or related study.</li>
            <li>Knowledge in development with C++/Java, or similar object-oriented languages.</li>
            <li>0-2 yrs. of experience working within a Linux environment and must be familiar with mobile application development (Android and/or iOS).</li>
            <li>Must be able to demonstrate innovation in problem solving., must have clear communication with team members and product owners.</li>
            <li>Must follow and support agile methodologies and practices by actively participating in all SCRUM ceremonies.</li>
            <li>Must adhere to and develop best practices in software engineering and, be able to interact with individuals to solidify understanding of requirements and expectations.</li>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <div className="text-[#3F4145]">Цалин:</div>
          <div className="flex gap-6">
            <div>
              <div className="text-xs text-[#3F4145]">Доод хэмжээ</div>
              <div className="font-semibold text-[#121316]">1’000’000₮</div>
            </div>
            <div>
              <div className="text-xs text-[#3F4145]">Дээд хэмжээ</div>
              <div className="font-semibold text-[#121316]">2’000’000₮</div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-4 items-center">
          <div className="text-[#3F4145]">Статус:</div>
          <ApplicantStatusLabel labelType="Passed" title="Passed" />
        </div>
        <div className="h-[1px] bg-[#ECEDF0] mt-12 mb-6 mx-[-24px]"></div>
        <div className="flex gap-2 justify-end mr-0">
          <div data-testid="modal-button" className="flex justify-end">
            <CreateErrorModal text="Устгах" labelType="Устгах" />
          </div>
          <button data-testid="edit-button" onClick={handleEditButtonClick} className="btn shadow-none tracking-tight border-black rounded-lg hover:text-[#8dff87] text-white">
            Засварлах
          </button>
        </div>
      </div>
    </div>
  );
};
