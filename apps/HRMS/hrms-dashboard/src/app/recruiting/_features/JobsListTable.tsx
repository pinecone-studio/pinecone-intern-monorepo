import { useGetJobsQuery, Job } from '../../../generated';
import Link from 'next/link';

export const JobsListTable = () => {
  const tableHeader = ['Ажлын байр', 'Хүлээн авах эцсийн хугацаа', 'Огноо', 'Төлөв'];

  const { data, loading } = useGetJobsQuery();
  const jobs = data?.getJobs;

  if (loading)
    return (
      <div className="flex w-full justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <div data-cy="jobsList" className="flex rounded-xl overflow-scroll tracking-tight mx-6 mb-6">
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
          {jobs?.slice(2).map((job: Job, index: number) => {
            return (
              <tr key={index} className="border-b border-b-[#EDE6F0] text-[#3F4145] text-sm text-left">
                <Link href="/recruiting/job-detail">
                  <td className="p-6 cursor-pointer hover:underline">{job.title}</td>
                </Link>
                <td className="p-6">2024/04/23</td>
                <td className="p-6">3/12 - Лхагва</td>
                <td className="p-6">{job.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
