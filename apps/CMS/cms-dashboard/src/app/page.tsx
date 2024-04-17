'use client';

// import { fileManagement } from '@/file-management';
// import { useRouter } from 'next/navigation';
import MainBannerFromArticles from './articles/_components/MainBannerFromArticles';
import { Stack } from '@mui/material';

import GroupArticlesComp from './articles/_components/GroupArticlesComp';

export default async function Home() {
  // const router = useRouter();

  // const handleArticlesPageButton = () => {
  //   router.push('/articles');
  // };

  // const handleCommentsPageButton = () => {
  //   router.push('/comments');
  // };

  // const fileManagementLib = fileManagement();

  // console.log(fileManagementLib);

  return (
    <div>
      {/* <h1>hello from CMS dashboard</h1>
      <h1>This is the environment {process.env.ENVIRONMENT}</h1>
      <button onClick={handleArticlesPageButton}>Go to Articles page</button>
      <button onClick={handleCommentsPageButton}>Go to Comments page</button> */}
      <Stack width={'100vw'} gap={6} bgcolor={'#F7F7F8'}>
        <MainBannerFromArticles articlesTitle="Marphosis Хөтөлбөр: Гадны зах зээлд ажиллах сонирхолтой инженерүүдэд" cover="/ganu.jpeg" date="2024.04.16" categories="Coding" />
        <Stack px={12} gap={6}>
          <GroupArticlesComp title="Шинэ контентууд" columnNumber={2} />
          <GroupArticlesComp title="Хөтөлбөр болон эвентүүд" columnNumber={4} />
          <GroupArticlesComp title="Сонирхолтой түүхүүд" columnNumber={4} />
        </Stack>
      </Stack>
    </div>
  );
}
