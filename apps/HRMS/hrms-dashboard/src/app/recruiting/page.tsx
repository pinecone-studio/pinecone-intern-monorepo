'use client';

import Link from 'next/link';
import { JobRecruitDashboard } from './_components/dashboard';

const RecruitPage = () => {
  return (
    <div style={{ width: '100%', backgroundColor: '#F7F7F8' }}>
      <JobRecruitDashboard />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};

export default RecruitPage;
