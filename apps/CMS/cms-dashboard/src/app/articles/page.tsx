'use client';

import { useRouter } from 'next/navigation';
import { ArticlesMain } from './_features';
import { Stack } from '@mui/material';
import SignUpModal from './_components/_signupComps/SignUpModal';

const ArticlesPage = () => {
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div>
      <h1>hello from CMS dashboard Articles Page</h1>
      <h1>
        <Stack width={800} border={1}>
          <SignUpModal />
        </Stack>
        hello from Articles Service Query
      </h1>
      <ArticlesMain />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
    </div>
  );
};

export default ArticlesPage;
