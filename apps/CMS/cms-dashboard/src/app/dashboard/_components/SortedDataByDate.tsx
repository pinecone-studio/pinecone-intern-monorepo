import { Box, Typography } from '@mui/material';
import { Article } from '../../../generated';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const SortedDataByDate = ({ data }: any) => {
  const articles = data?.getAllArticles;  

  return (
    <Box gap={'20px'} sx={{ display: 'flex' }} flexDirection={'column'}>
      {articles?.map((el: Article, i: number) => {
        return (
          <Box mt={2} bgcolor={'pink'} width={'fit-content'} key={i}>
            <Typography>{el?.title}</Typography>
            <Typography>{el?.status}</Typography>
            <Typography>{`${format(el.createdAt, 'dd.MM.yyyy')}`}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default SortedDataByDate;
