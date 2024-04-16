'use client';

import { useRouter } from 'next/navigation';
// import { useHelloQueryFromArticlesServiceQuery } from '../../generated';
import { ArticlesMain } from './_features';
import { Stack } from '@mui/material';
import SignUpModal from './_components/_signupComps/SignUpModal';
import Image from 'next/image';

const ArticlesPage = () => {
  // const { data } = useHelloQueryFromArticlesServiceQuery();
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div>
      <h1>hello from CMS dashboard Articles Page</h1>
      <h1>
        hello from Articles Service Query
        {/* {data?.helloQueryFromArticlesService} */}
      </h1>
      <ArticlesMain />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
      <Stack width={'100%'} height={'100vh'} flexDirection={'row'}>
        <Stack width={'50%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
          <Stack width={400}>
            <SignUpModal />
          </Stack>
        </Stack>
        <Stack width={'50%'} height={'100%'} justifyContent={'center'} alignItems={'center'} bgcolor={'primary.main'}>
          <Stack alignItems={'flex-end'}>
            <Stack flexDirection={'row'} gap={1}>
              <Image src={'/Academy.svg'} alt="Pinecone logo" height={128} width={440} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

export default ArticlesPage;
