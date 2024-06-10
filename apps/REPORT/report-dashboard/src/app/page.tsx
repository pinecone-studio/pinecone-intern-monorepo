'use client';

import { HeaderComp } from './_report/_components';

// import { StudentMain } from './_student/_features';
// import { TopicMain } from './_topic/_features';

export default async function Index() {
  return (
    <div>
      {/* <h1>hello from REPORT dashboard</h1>
      <TopicMain />
      <StudentMain />
      <h1>This is the environment {process.env.ENVIRONMENT}</h1> */}
      <HeaderComp />
    </div>
  );
}
