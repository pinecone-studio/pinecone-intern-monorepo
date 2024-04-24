'use client';

import MainBannerFromArticles from './articles/_components/MainBannerFromArticles';
import { Stack } from '@mui/material';
import GroupArticlesComp from './articles/_features/GroupArticlesComp';

const Home = () => {
  return (
    <div>
      <Stack width={'100vw'} gap={6} bgcolor={'#F7F7F8'} suppressHydrationWarning={true} alignItems={'center'} pb={3}>
        <MainBannerFromArticles
          articlesTitle="PORSCHE 911 GT3"
          cover="/earth.jpeg"
          date="2024.04.22"
          categories="Porsche"
        />
        <Stack px={12} gap={6} width={'85%'}>
          <GroupArticlesComp title="Шинэ контентууд" categoryId="662776d1ebfd0e7cf0eed309" />
          <GroupArticlesComp title="Хөтөлбөр болон эвентүүд" categoryId="661c677c6837efa536464cab" />
          <GroupArticlesComp title="Сонирхолтой түүхүүд" categoryId="662771aaebfd0e7cf0eed302" />
        </Stack>
      </Stack>
    </div>
  );
};
export default Home;
