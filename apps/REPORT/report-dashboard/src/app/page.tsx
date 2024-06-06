'use client';

import { StudentMain } from './_student/_features';
import { AddClassButton } from './_topic/_components/AddClassButton';
import { TopicMain } from './_topic/_features';

export default async function Index() {
  return (
    <div>
      <h1>hello from REPORT dashboard</h1>
      <TopicMain />
      <StudentMain />
      <AddClassButton />
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
