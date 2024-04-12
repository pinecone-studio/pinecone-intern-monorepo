import { Stack, Typography } from '@mui/material';
import { props } from 'cypress/types/bluebird';
import Image from 'next/image';

type ArticlesProps = {
  cover: string;
  date: string;
  title: string;
  category: string;
  description: string;
};

const ArticleCard = (props: ArticlesProps) => {
  const { cover, date, title, category, description } = props;
  return (
    <Stack data-testid="main-container" width={'100%'} height={404} overflow={'hidden'}>
      <Stack width={'100%'} height={'50%'} position={'relative'} borderRadius={1.5} overflow={'hidden'}>
        <Image src={'/ganu.jpeg'} alt="article-cover" fill style={{ objectFit: 'cover' }} />
      </Stack>
      <Stack gap={1.5} p={3}>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Typography color={'#3F4145'}>{date}</Typography>
          <Stack height={4} width={4} bgcolor={'#000'} borderRadius={'100%'} />
          <Typography color={'#3F4145'}>#{category}</Typography>
        </Stack>
        <Typography fontSize={24} fontWeight={700}>
          {title}
        </Typography>
        <Typography fontSize={18} color={'#3F4145'} maxWidth={564} maxHeight={56} sx={{ textOverflow: 'ellipsis' }} overflow={'hidden'}>
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
};
export default ArticleCard;
