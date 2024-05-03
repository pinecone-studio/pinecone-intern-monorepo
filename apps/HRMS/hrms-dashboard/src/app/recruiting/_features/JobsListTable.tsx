import React from 'react';
import { useGetJobsQuery } from '../../../generated';

export const JobsListTable = () => {
  const tableHeader = ['Ажлын байр', 'Хүлээн авах эцсийн хугацаа', 'Огноо', 'Төлөв'];
  const { data, loading } = useGetJobsQuery();
  const jobs = data?.getJobs;

  return (
    <>
      {loading && <span className="loading loading-spinner loading-lg flex m-auto"></span>}
      <div data-cy="jobsList" className="my-2 rounded-xl w-11/12 flex overflow-hidden self-center">
        <table className="w-full table-fixed text-left">
          <thead>
            <tr className="bg-primary-light bg-[#F7F7F8] border-b border-neutral-700 text-black">
              {tableHeader.map((item, index) => (
                <th className="h-12 px-4 text-primary-dark font-semibold" data-cy={`tableHeader-${index}`}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job, index) => (
              <tr data-cy="jobData" key={index} className="border-b border-neutral-700 h-12 text-black">
                <td className="px-4">{job?.title}</td>
                <td className="px-4">{job?.dueDate}</td>
                <td className="px-4">{job?.createdAt}</td>
                <td className="px-4">{job?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
