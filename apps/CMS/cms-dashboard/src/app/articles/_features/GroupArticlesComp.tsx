'use client';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import ArticleCard from '../_components/ArticleCard';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useState } from 'react';
import { useGetArticlesByCategoryQuery } from '../../../generated';

type GroupArticlesCompProps = {
  title: string;
  categoryId: string;
};

const GroupArticlesComp = (props: GroupArticlesCompProps) => {
  const { title, categoryId } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const { previousData, data, loading } = useGetArticlesByCategoryQuery({
    variables: {
      categoryId: categoryId,
      quantity: quantity,
    },
  });

  const clickHandler = () => {
    setQuantity((prev) => prev + 2);
  };

  return (
    <Stack p={3} gap={4} bgcolor={'#fff'} borderRadius={2}>
      {loading ? (
        <Stack data-cy="group-container" p={3} gap={4} bgcolor={'#fff'} borderRadius={2}>
          <Typography data-cy="group-title" fontSize={28} fontWeight={700} color={'primary:main'}>
            {title}
          </Typography>
          <Grid data-cy="group-grid" container spacing={4}>
            {previousData?.getArticlesByCategory?.map((item) => {
              return (
                <Grid item xs={6} key={item?.id}>
                  <ArticleCard title={item.title} cover={item?.coverPhoto} description={item.content} category={item.category.name} date={item.publishedAt} />
                </Grid>
              );
            })}
          </Grid>
          <Stack data-cy="group-innerCon" width="100%" alignItems="center">
            <IconButton data-cy="group-icon-button" onClick={clickHandler} sx={{ cursor: 'pointer' }}>
              <KeyboardArrowDown sx={{ width: 49, height: 40 }} />
            </IconButton>
          </Stack>
        </Stack>
      ) : (
        <Stack data-cy="group-container" p={3} gap={4} bgcolor={'#fff'} borderRadius={2}>
          <Typography data-cy="group-title" fontSize={28} fontWeight={700} color={'primary:main'}>
            {title}
          </Typography>
          <Grid data-cy="group-grid" container spacing={4}>
            {
              data?.getArticlesByCategory?.map((item) => {
                return (
                  <Grid item xs={6} key={item?.id}>
                    <ArticleCard title={item.title} cover={item?.coverPhoto} description={item.content} category={item.category.name} date={item.publishedAt} />
                  </Grid>
                );
              })
            }
          </Grid>
          <Stack data-cy="group-innerCon" width="100%" alignItems="center">
            <IconButton data-cy="group-icon-button" onClick={clickHandler} sx={{ cursor: 'pointer' }}>
              <KeyboardArrowDown sx={{ width: 49, height: 40 }} />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default GroupArticlesComp;
