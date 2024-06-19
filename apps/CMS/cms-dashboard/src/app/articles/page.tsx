'use client';

import { TableContent } from './_components';

export default async function Index() {
  return (
    <div>
      {/* <h1 data-cy="Articles-Page">hello from Articles Page</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1> */}
      <TableContent></TableContent>
    </div>
  );
}
