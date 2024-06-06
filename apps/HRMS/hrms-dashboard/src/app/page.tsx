'use client';

import GeneralInfo from './payroll/_components/GeneralInfo';

export default async function Index() {
  return (
    <div>
      <h1>hello from HRMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <GeneralInfo />
    </div>
  );
}
