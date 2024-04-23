'use client';

import MainBannerFromArticles from './articles/_components/MainBannerFromArticles';
import { Stack, Typography } from '@mui/material';
import GroupArticlesComp from './articles/_components/GroupArticlesComp';
import { useQueryQuery } from '../generated'

const Home = () => {
  const { data, loading, refetch,error } = useQueryQuery()
  return (
    <div>
      {loading?<Stack width='100vw' height='100vh' alignItems='center' justifyContent='center'><Typography fontWeight={600} fontSize={32}>Page is loading </Typography></Stack>:
      <Stack width={'100vw'} gap={6} bgcolor={'#F7F7F8'}  suppressHydrationWarning={true} alignItems={'center'} pb={3}>
        <MainBannerFromArticles
          articlesTitle="PORSCHE 911 GT3"
          cover="https://pictures.porsche.com/rtt/iris?COSY-EU-100-1711coMvsi60AAt5FwcmBEgA4qP8iBUDxPE3Cb9pNXABuN9dMGF4tl3U0%25z8rMH1spbWvanYb%255y%25oq%25vSTmjMXD4qAZeoNBPUSfUx4RmWBisGK7Zlp0KtYYF%25mVSW8uAVbsqYSt4T0iO5Mi17HcTCkcQoKf2GLfVtSPQrIP7jMNYw3zqx7e2HEq%251UzQKI8rbsqYSf9V0iDRrNSgCR8gfieAHOxJK51%25cdUOoNsMR3"
          date="2024.04.22"
          categories="Porsche"
        />
        {data   && data.getArticlesQuery ? 
          <Stack px={12} gap={6} maxWidth={'85%'}>
            <GroupArticlesComp title="Шинэ контентууд" data={data} />
            <GroupArticlesComp title="Хөтөлбөр болон эвентүүд" data={data}/>
            <GroupArticlesComp title="Сонирхолтой түүхүүд"data={data} />
          </Stack>:<Stack>wait!</Stack> }
      </Stack>}
    </div>
  );
};
export default Home;
