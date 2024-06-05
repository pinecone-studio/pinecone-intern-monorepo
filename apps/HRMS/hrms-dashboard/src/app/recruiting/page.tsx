'use client';

import { JobRecruitDashboard } from './_components';
import { ApplicantsListTable, JobsListTable } from './_features';
import { useState } from 'react';

const RecruitPage = () => {
  const [selected, setSelected] = useState('jobs');

  return (
    <div className="w-full bg-[#F7F7F8] pt-6 px-8">
      <div className="flex flex-col bg-white rounded-xl">
        <JobRecruitDashboard />
        <div className="mb-6 mt-3 px-6 text-sm flex border-b border-[#ECEDF0]">
          <button onClick={() => setSelected('jobs')} className={`${selected === 'jobs' ? 'font-semibold border-b-2 border-black' : ''} py-3 px-3`}>
            Зар
          </button>
          <button onClick={() => setSelected('applicants')} className={`${selected === 'applicants' ? 'font-semibold border-b-2 border-black' : ''} py-3 px-3`}>
            Ирсэн өргөдөл
          </button>
        </div>

        {selected === 'jobs' ? <JobsListTable /> : <ApplicantsListTable />}
      </div>
    </div>
  );
};

export default RecruitPage;
