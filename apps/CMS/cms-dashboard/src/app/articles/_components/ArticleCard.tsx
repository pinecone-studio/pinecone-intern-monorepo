'use client';
import { Stack, Typography } from '@mui/material';

type ArticlesProps = {
  cover?: string;
  date?: string;
  title?: string;
  category?: string;
  description?: string;
};

const ArticleCard = (props: ArticlesProps) => {
  const { cover, date, title, category, description } = props;
  
  return (
    // <div data-testid="article-main-container" className="flex flex-col w-full h-[504px] overflow-hidden">
    //   <div className="w-full h-[50%] rounded-xl overflow-hidden relative">
    //     <img data-cy="article-cover" src={cover} height={'100%'} style={{ objectFit: 'cover' }} />
    //   </div>
    //   <div className="flex flex-col gap-3 p-6">
    //     <div className="flex flex-row items-center gap-2">
    //       <p data-testid="article-date" className="text-[#3F4145]">
    //         {date?.slice(0, -14)}
    //       </p>
    //       <div className="h-[4px] w-[4px] bgcolor-[#3F4145] rounded-full"></div>
    //       <p data-testid="article-category" className="text-[#3F4145]">
    //         #{category}
    //       </p>
    //     </div>
    //     <p data-testid="article-title" className="font-bold text-2xl">
    //       {title}
    //     </p>
    //     <p data-testid="article-description" className="text-lg max-w-[564px] max-h-[56px] truncate text-[#3F4145]">{description}</p>
    //   </div>
    // </div>
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
