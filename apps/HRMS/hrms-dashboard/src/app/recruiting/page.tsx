'use client';
import { JobRecruitDashboard } from './_components/feedJob';
import { JobsListTable } from './_features';
const containerStyle = { container: 'inherit', marginBlock: '24px', marginInline: '32px', backgroundColor: 'white', borderRadius: '12px', paddingBottom: 10, color: 'black' };

const RecruitPage = () => {
  return (
    <div className="bg-[#F7F7F8]">
      <div className="flex flex-col gap-4 px-4" style={containerStyle}>
        <JobRecruitDashboard />
        <JobsListTable />
      </div>
    </div>
  );
};

export default RecruitPage;
