'use client';

import { TableContent } from './_components';

export default async function Index() {
  return (
    <div className="bg-[#F7F7F8] h-[93.5vh]">
      <h1 data-cy="Articles-Page">hello from Articles Page</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <TableContent></TableContent>
    </div>
  );
}
