'use client';

import MainBannerFromArticles from './articles/_components/MainBannerFromArticles';
import { Stack } from '@mui/material';

import GroupArticlesComp from './articles/_components/GroupArticlesComp';

const Home = () => {
  return (
    <div>
      <Stack width={'100vw'} gap={6} bgcolor={'#F7F7F8'}>
        <MainBannerFromArticles
          articlesTitle="Marphosis Хөтөлбөр: Гадны зах зээлд ажиллах сонирхолтой инженерүүдэд"
          cover="https://www.pixelstalk.net/wp-content/uploads/2016/11/Photos-Earth-From-Space-HD.jpg"
          date="2024.04.16"
          categories="Coding"
        />
        <Stack px={12} gap={6}>
          <GroupArticlesComp title="Шинэ контентууд" />
          <GroupArticlesComp title="Хөтөлбөр болон эвентүүд" />
          <GroupArticlesComp title="Сонирхолтой түүхүүд" />
        </Stack>
      </Stack>
    </div>
  );
};
export default Home;
