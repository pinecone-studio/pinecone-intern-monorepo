'use client';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import ArticleCard from './ArticleCard';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState } from 'react';

type GroupArticlesCompProps = {
  title: string;
};

const data = [
  {
    title: 'Morphosis',
    cover: 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Photos-Earth-From-Space-HD.jpg',
    date: '2024.04.16',
    category: 'Coding',
    description: 'it is just a description',
  },
  {
    title: 'Morphosis',
    cover: 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Photos-Earth-From-Space-HD.jpg',
    date: '2024.04.16',
    category: 'Coding',
    description: 'it is just a description',
  },
  {
    title: 'Morphosis',
    cover: 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Photos-Earth-From-Space-HD.jpg',
    date: '2024.04.16',
    category: 'Coding',
    description: 'it is just a description',
  },
  {
    title: 'Morphosis',
    cover: 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Photos-Earth-From-Space-HD.jpg',
    date: '2024.04.16',
    category: 'Coding',
    description: 'it is just a description',
  },
  {
    title: 'Morphosis',
    cover: 'https://www.pixelstalk.net/wp-content/uploads/2016/11/Photos-Earth-From-Space-HD.jpg',
    date: '2024.04.16',
    category: 'Coding',
    description: 'it is just a description',
  },
];

const GroupArticlesComp = (props: GroupArticlesCompProps) => {
  const { title } = props;
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <Stack data-testid="group-container" p={'40px 24px'} gap={4} bgcolor={'#fff'} borderRadius={2}>
      <Typography data-testid="group-title" fontSize={28} fontWeight={700} color={'primary:main'}>
        {title}
      </Typography>
      <Grid data-testid="group-grid" container spacing={4}>
        {data.map((item, index) => {
          return (
            <Grid data-testid="group-grid-item" item xs={6} key={index}>
              <ArticleCard title={item.title} cover={item.cover} date={item.date} category={item.category} description={item.description} />
            </Grid>
          );
        })}
      </Grid>
      <Stack data-testid="group-innerCon" width="100%" alignItems="center">
        <IconButton
          data-testid="group-icon-button"
          onClick={() => {
            clickHandler();
          }}
          sx={{ cursor: 'pointer' }}
        >
          {isClicked ? <KeyboardArrowUp sx={{ width: 49, height: 40 }} /> : <KeyboardArrowDown sx={{ width: 49, height: 40 }} />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default GroupArticlesComp;
