'use client';

import { Stack, Typography } from '@mui/material';
import { Article, useGetArticleByIdQuery } from 'apps/CMS/cms-dashboard/src/generated';
import { useParams } from 'next/navigation';

const Copy = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });
  const article = data?.getArticleByID as Article | undefined;

  if (loading) {
    return (
      <Stack p={6} fontSize={22} fontWeight={700}>
        Loading...
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack p={6} color={'red'} fontSize={22} fontWeight={700}>
        Error
      </Stack>
    );
  }

  return (
    <Stack>
      <Typography>Title: {article?.title}</Typography>
      <Typography>Published: {article?.publishedAt}</Typography>
      <Typography>Category: {article?.category.name}</Typography>
      <Typography>Content: {article?.content}</Typography>
    </Stack>
  );
};

export default Copy;
