'use client';

import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { GET_JOBS_LIMIT } from './query/get-jobs-limit';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { GET_JOBS } from '../_components/job-detail/query/get-jobs-query';
import { LeftArrow, RightArrow } from '../../asset';

interface Jobs {
  id: string;
  title: string;
  description: string;
  requirements: string;
  minSalary: string;
  maxSalary: string;
  dueDate: string;
  createdAt: string;
  status: string;
  applicant: string;
}

export const JobsListTable = () => {
  const tableHeader = ['Ажлын байр', 'Хүлээн авах эцсийн хугацаа', 'Огноо', 'Төлөв'];
  const jobsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const formatDateToMongolian = (date: Date) => {
    const days = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()} - ${days[date.getDay()]}`;
    return formattedDate;
  };
  const { data: allJobsData } = useQuery(GET_JOBS);
  const {
    data: limitedJobsData,
    loading,
    error,
  } = useQuery(GET_JOBS_LIMIT, {
    variables: {
      offset: currentPage * jobsPerPage,
      limit: jobsPerPage,
    },
  });
  const jobs = limitedJobsData?.getJobsWithLimit;
  const totalJobs = allJobsData?.getJobs;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  if (loading)
    return (
      <div className="flex w-full justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  if (error) {
    console.error('Error fetching jobs:', error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <div data-cy="jobsList" className="flex flex-col rounded-xl gap-10 items-center overflow-scroll tracking-tight mx-6 mb-6">
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="bg-primary-light bg-[#F7F7F8] border-b border-b-[#D6D8DB] text-[#121316] text-xs">
            {tableHeader.map((item, index) => (
              <th key={index} className="py-3 px-6 text-primary-dark font-semibold" data-cy={`tableHeader-${index}`}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-cy="jobData">
          {jobs?.map((job: Jobs, index: number) => {
            return (
              <tr key={index} className="border-b border-b-[#EDE6F0] text-[#3F4145] text-sm text-left">
                <Link href={`/recruiting/job-detail/${job.id}`}>
                  <td className="p-6 cursor-pointer hover:underline">{job.title}</td>
                </Link>
                <td className="p-6">{new Date(Number(job.dueDate)).toLocaleDateString()}</td>
                <td className="p-6">{formatDateToMongolian(new Date(Number(job.createdAt)))}</td>
                <td className="p-6">{job.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ReactPaginate
        forcePage={currentPage}
        key={currentPage}
        className="flex items-center justify-center gap-2"
        pageLinkClassName="w-10 h-10 flex items-center justify-center border rounded-lg"
        previousLabel={<LeftArrow />}
        nextLabel={<RightArrow />}
        pageCount={totalJobs ? totalJobs.length / jobsPerPage : 0}
        onPageChange={handlePageClick}
        activeLinkClassName={'bg-black text-white'}
      />
    </div>
  );
};
