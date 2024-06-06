'use client';

import { ReportMain } from './_report/_features/ReportMain';
import { StudentMain } from './_student/_features';
import { TopicMain } from './_topic/_features';

export default async function Index() {
  return (
    <div>
      <ReportMain />
      <TopicMain />
      <StudentMain />
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
