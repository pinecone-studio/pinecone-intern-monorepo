import React from 'react';
import { useGetJobsQuery, Job } from '../../../generated';

export const JobsListTable = () => {
  const tableHeader = ['Ажлын байр', 'Хүлээн авах эцсийн хугацаа', 'Огноо', 'Төлөв'];
  const { data, loading } = useGetJobsQuery();
  const jobs = data?.getJobs;

  const DaysOfWeek = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
  if (loading)
    return (
      <div className="flex w-full justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <div data-cy="jobsList" className="flex rounded-xl overflow-scroll">
      <table className="w-full table-fixed text-left">
        <thead>
          <tr className="bg-primary-light bg-[#F7F7F8] border-b border-b-[#D6D8DB] text-black text-[12px]">
            {tableHeader.map((item, index) => (
              <th key={index} className="h-12 px-4 text-primary-dark font-semibold" data-cy={`tableHeader-${index}`}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job: Job, index: number) => {
            const dueDate = new Date(parseInt(job.dueDate));
            const createdAt = new Date(parseInt(job.createdAt));
            return (
              <tr key={index} className="border-b border-b-[#EDE6F0] h-12 text-black text-[14px]">
                <td className="px-4">{job.title}</td>
                <td className="px-4">{`${dueDate.getFullYear()}/${String(dueDate.getMonth() + 1).padStart(2, '0')}/${String(dueDate.getDate()).padStart(2, '0')}`}</td>
                <td className="px-4">{`${createdAt.getMonth() + 1}/${createdAt.getDate()} - ${DaysOfWeek[createdAt.getDay()]}`}</td>
                <td className="px-4">{job.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
