'use client';

import { JobRecruitDashboard } from './_components';
import { JobsListTable } from './_features';
import { DateFilter, StatusFilter } from './_components';
import { JobRecruitTabs } from './_components';

const RecruitPage = () => {
  return (
    <div className="w-full bg-[#F7F7F8] pt-6 px-8">
      <div className="flex flex-col bg-white rounded-xl mb-10">
        <JobRecruitDashboard />
        <div className="pb-6">
          <JobRecruitTabs />
          <div className="border-b border-b-[#ECEDF0]"></div>
        </div>
        <div className="flex gap-2 mx-6 my-8">
          <DateFilter />
          <StatusFilter />
        </div>
        <JobsListTable />
      </div>
    </div>
  );
};

export default RecruitPage;
