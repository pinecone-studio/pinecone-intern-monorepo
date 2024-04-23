'use client';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import ArticleCard from './ArticleCard';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useState } from 'react';
import { QueryQuery } from '../../../generated';

type Data = { __typename?: 'Article' | undefined; title: string; content: string; coverPhoto?: string | null | undefined; publishedAt?: any };

type GroupArticlesCompProps = {
  title: string;
  data: QueryQuery;
};

const GroupArticlesComp = (props: GroupArticlesCompProps) => {
  const { title, data } = props;
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <Stack data-testid="group-container" p={3} gap={4} bgcolor={'#fff'} borderRadius={2}>
      <Typography data-testid="group-title" fontSize={28} fontWeight={700} color={'primary:main'}>
        {title}
      </Typography>
      <Grid data-testid="group-grid" container spacing={4}>
        {data.getArticlesQuery.length === 0
          ? null
          : data.getArticlesQuery.map((item, index) => {
              return (
                <Grid item xs={6}>
                  <ArticleCard key={index} title={item?.title} cover={item?.coverPhoto} description={item?.content} category={item?.category.name} date={item?.publishedAt} />
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
