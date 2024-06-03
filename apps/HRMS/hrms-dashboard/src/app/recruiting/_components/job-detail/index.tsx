'use client';

import { LeftArrow } from '../../../asset';
import { useRouter, useParams } from 'next/navigation';
import { ApplicantStatusLabel } from '../core';
import { CreateErrorModal } from '../modal';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from './query/get-jobs-query';

export const JobDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data, loading } = useQuery(GET_JOBS);
  const jobs = data?.getJobs;
  const job = jobs?.find((job: { id: string }) => job.id === id);

  const handleBackButtonClick = () => {
    router.push('/recruiting');
  };

  const handleEditButtonClick = () => {
    router.push(`/recruiting/edit-job/${id}`);
  };

  if (loading)
    return (
      <div data-testid="loading" className="flex w-full justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

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
          <div className="text-[#121316] font-semibold">{job?.title}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[#3F4145] mt-6">Үүрэг:</div>
          <div data-testid="description" className="text-sm text-[#121316]">
            {job?.description?.split('\n').map((paragraph: string, index: number) => (
              <li key={index}>{paragraph}</li>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <div className="text-[#3F4145]">Шаардлага:</div>
          <div data-testid="requirements" className="text-sm text-[#121316]">
            {job?.requirements.others?.split('\n').map((paragraph: string, index: number) => (
              <li key={index}>{paragraph}</li>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <div className="text-[#3F4145]">Цалин:</div>
          <div className="flex gap-6">
            <div>
              <div className="text-xs text-[#3F4145]">Доод хэмжээ</div>
              <div className="font-semibold text-[#121316]">{Number(job?.minSalary).toLocaleString()}₮</div>
            </div>
            <div>
              <div className="text-xs text-[#3F4145]">Дээд хэмжээ</div>
              <div className="font-semibold text-[#121316]">{Number(job?.maxSalary).toLocaleString()}₮</div>
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
          <button data-testid="edit-button" onClick={handleEditButtonClick} className="btn shadow-none tracking-tight bg-[#D6D8DB] hover:bg-black rounded-lg hover:text-white text-black">
            Засварлах
          </button>
        </div>
      </div>
    </div>
  );
};
