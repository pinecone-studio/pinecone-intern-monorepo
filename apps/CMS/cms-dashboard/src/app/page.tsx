'use client';

import MainBannerFromArticles from './articles/_components/MainBannerFromArticles';
import { Stack} from '@mui/material';
import GroupArticlesComp from './articles/_components/GroupArticlesComp';


const Home = () => {
  console.log('hi');
  
  return (
    <div>
      <Stack width={'100vw'} gap={6} bgcolor={'#F7F7F8'} suppressHydrationWarning={true} alignItems={'center'} pb={3}>
        <MainBannerFromArticles
          articlesTitle="PORSCHE 911 GT3"
          cover="https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXABuN9dMGF4tl3U0%25z8rMH1spbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmWBisGK7Zlp0KtYYF%25mVSW8uAVbsqYSt4T0iO5Mi17HcTCkcQoKf2GLfVtSPQrIP7jMNYw3zqx7e2HEq%251UzQKI8rbsqYSf9V0iDRrNSgCR8gfieAHOxJK51%25cdUOoNsMR3"
          date="2024.04.22"
          categories="Porsche"
        />
        <Stack px={12} gap={6} width={'85%'}>
          <GroupArticlesComp title="Шинэ контентууд" categoryId='662776d1ebfd0e7cf0eed309' />
          <GroupArticlesComp title="Хөтөлбөр болон эвентүүд" categoryId='661c677c6837efa536464cab' />
          <GroupArticlesComp title="Сонирхолтой түүхүүд" categoryId='662771aaebfd0e7cf0eed302' />
        </Stack>
      </Stack>
    </div>
  );
};
export default Home;
