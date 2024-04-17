'use client';
import { Button, Stack, Typography } from '@mui/material';

type MainBannerFromArticlesProps = {
  date: string;
  categories: string;
  articlesTitle: string;
  cover: string;
};
const MainBannerFromArticles = (props: MainBannerFromArticlesProps) => {
  const { date, categories, articlesTitle, cover } = props;
  return (
    <Stack data-testid="mainBannerComp" width={'100%'} height={656} position={'relative'}>
      <img width={'100%'} height={'100%'} data-testid="cover" src={cover} alt="article-cover" style={{ objectFit: 'cover' }} />
      <Stack
        data-testid="innerComp"
        position={'absolute'}
        bottom={0}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={3}
        p={3}
        paddingBottom={'50px'}
        sx={{
          background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,2,1) 29%, rgba(0,0,0,1) 40%, rgba(255,255,255,0) 100%)',
        }}
      >
        <Stack direction={'row'} gap={1} alignItems={'center'}>
          <Typography data-testid="date" fontWeight={500} fontSize={15} color={'#fff'}>
            {date}
          </Typography>
          <Stack width={4} height={4} borderRadius={'100%'} bgcolor={'#fff'}></Stack>

          <Typography data-testid="categories" color={'#fff'}>
            #{categories}
          </Typography>
        </Stack>
        <Typography data-testid="articlesTitle" fontWeight={700} fontSize={32} color={'#fff'} maxWidth={'850px'} textAlign={'center'}>
          {articlesTitle}
        </Typography>
        <Button
          data-testid="mainBtn"
          sx={{
            borderRadius: '999px',
            bgcolor: '#fff',
            color: '#000',
            padding: '12px 16px',
            '&:hover': {
              color: '#fff',
            },
          }}
        >
          Унших
        </Button>
      </Stack>
    </Stack>
  );
};
export default MainBannerFromArticles;
