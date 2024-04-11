'use client';

import { fileManagement } from '@/file-management';
import { useRouter } from 'next/navigation';

export default async function Index() {
  const router = useRouter();

  const handleArticlesPageButton = () => {
    router.push('/articles');
  };

  const handleCommentsPageButton = () => {
    router.push('/comments');
  };

  const fileManagementLib = fileManagement();

  console.log(fileManagementLib);

  return (
    <div>
      <h1>hello from CMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <button onClick={handleArticlesPageButton}>Go to Articles page</button>
      <button onClick={handleCommentsPageButton}>Go to Comments page</button>
    </div>
  );
}
