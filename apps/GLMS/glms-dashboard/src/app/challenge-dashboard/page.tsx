'use client';

import { fileManagement } from '@/file-management';

export default async function Index() {
  const fileManagementLib = fileManagement();

  console.log(fileManagementLib);

  return (
    <div>
      <h1>hello from GLMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
    </div>
  );
}
