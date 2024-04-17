'use client';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import ArticleCard from './ArticleCard';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState } from 'react';

type GroupArticlesCompProps = {
  title: string;
  columnNumber: number;
};

const data = [
  { title: 'Morphosis', cover: '/ganu.jpeg', date: '2024.04.16', category: 'Coding', description: 'it is just a description' },
  { title: 'Morphosis', cover: '/ganu.jpeg', date: '2024.04.16', category: 'Coding', description: 'it is just a description' },
  { title: 'Morphosis', cover: '/ganu.jpeg', date: '2024.04.16', category: 'Coding', description: 'it is just a description' },
  { title: 'Morphosis', cover: '/ganu.jpeg', date: '2024.04.16', category: 'Coding', description: 'it is just a description' },
  { title: 'Morphosis', cover: '/ganu.jpeg', date: '2024.04.16', category: 'Coding', description: 'it is just a description' },
];

const GroupArticlesComp = (props: GroupArticlesCompProps) => {
  const { title, columnNumber } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [articleNumber, setArticleNumber] = useState(columnNumber);

  return (
    <Stack p={'40px 24px'} gap={4} bgcolor={'#fff'} borderRadius={2}>
      <Typography fontSize={28} fontWeight={700} color={'primary:main'}>
        {title}
      </Typography>
      <Grid container spacing={4}>
        {data.map((item, index) => {
          if (articleNumber > index) {
            return (
              <Grid item xs={6} key={index}>
                <ArticleCard title={item.title} cover={item.cover} date={item.date} category={item.category} description={item.description} />
              </Grid>
            );
          }
        })}
      </Grid>
      <Stack width="100%" alignItems="center">
        <IconButton
          onClick={() => {
            if (isClicked) {
              setArticleNumber(columnNumber);
              setIsClicked(false);
            } else {
              articleNumber >= data.length ? setIsClicked(true) : setArticleNumber((prev) => prev + 2);
            }
          }}
        >
          {isClicked ? <KeyboardArrowUp sx={{ width: 49, height: 40 }} /> : <KeyboardArrowDown sx={{ width: 49, height: 40 }} />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default GroupArticlesComp;
