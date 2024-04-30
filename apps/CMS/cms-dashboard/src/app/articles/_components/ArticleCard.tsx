'use client';
import { Stack, Typography } from '@mui/material';

type ArticlesProps = {
  cover?: string  ;
  date?: string;
  title?: string;
  category?: string;
  description?: string;
};

const ArticleCard = (props: ArticlesProps) => {
  const { cover, date, title, category, description } = props;
  return (
    <Stack data-cy="article-main-container" width={'100%'} height={504} overflow={'hidden'}>
      <Stack width={'100%'} height={'50%'} position={'relative'} borderRadius={1.5} overflow={'hidden'}>
        <img data-cy="article-cover" src={cover} height={'100%'} style={{ objectFit: 'cover' }} />
      </Stack>
      <Stack gap={1.5} p={3}>
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Typography data-testid="article-date" color={'#3F4145'}>
            {date?.slice(0, -14)}
          </Typography>
          <Stack height={4} width={4} bgcolor={'#3F4145'} borderRadius={'100%'} />
          <Typography data-testid="article-category" color={'#3F4145'}>
            #{category}
          </Typography>
        </Stack>
        <Typography data-testid="article-title" fontSize={24} fontWeight={700}>
          {title}
        </Typography>
        {/* <Typography data-testid="article-description" fontSize={18} color={'#3F4145'} maxWidth={564} maxHeight={56} sx={{ textOverflow: 'ellipsis' ,dangerouslySetInnerHTML:true}} overflow={'hidden'} >
          {description}
        </Typography> */}
         <div style={{maxHeight:"54px", maxWidth:564 ,textOverflow:'ellipsis',overflow:'hidden'}}
      dangerouslySetInnerHTML={{__html: !description?'hah':description}}
    />
      </Stack>
    </Stack>
  );
};
export default ArticleCard;
