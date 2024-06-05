'use client';

import { HeaderButton } from './_report/_components';
// import { StudentMain } from './_student/_features';
// import { TopicMain } from './_topic/_features';

export default async function Index() {
  return (
    <div>
      {/* <h1 className="text-white">hello from REPORT dashboard</h1> */}
      {/* <TopicMain />
      <StudentMain /> */}
      <HeaderButton />
      {/* <h1>This is the environment {process.env.ENVIRONMENT}</h1> */}
    </div>
  );
}
