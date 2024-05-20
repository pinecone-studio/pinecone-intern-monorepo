'use client';

import { useState } from 'react';
import { Button } from '../core';
import { useRouter } from 'next/navigation';
import { ApplicantsListTable, JobsListTable } from '../../_features';

export const JobRecruitDashboard = () => {
  const [selected, setSelected] = useState('jobs');
  const router = useRouter();
  const addRecruit = () => {
    router.push('/recruiting/add-job');
  };
  return (
    <div>
      <div style={{ paddingInline: '24px', paddingTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 700, color: 'black' }}> Ажлын зар</h1>
          <div data-testid="jobAdd-button">
            <Button label="Зар нэмэх" plusIcon onClick={addRecruit} />
          </div>
        </div>
      </div>
      <div>
        <div className="border-b mb-10 border-[#ECEDF0]" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className={`text-sm ${selected === 'jobs' ? 'border-b-2' : ''} p-2`} data-testid="jobs-button" onClick={() => setSelected('jobs')}>
            Зар
          </button>
          <button className={`text-sm ${selected === 'applicants' ? 'border-b-2' : ''} p-2`} data-testid="applicants-button" onClick={() => setSelected('applicants')}>
            Ирсэн өргөдөл
          </button>
        </div>
      </div>
      {selected === 'jobs' ? (
        <div data-testid="jobs-table">
          <JobsListTable />
        </div>
      ) : (
        <div data-testid="applications-table">
          <ApplicantsListTable />
        </div>
      )}
    </div>
  );
};
