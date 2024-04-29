'use client';
import { Stack, Typography } from '@mui/material';
import { Article, useGetArticleByIdQuery } from '../../../../../src/generated';
import { useParams } from 'next/navigation';

const Home = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });
  if (loading) return <Stack>Loading...</Stack>;
  if (error) return <Stack>Error</Stack>;
  const article = data?.getArticleByID as Article | undefined;

  // TODO: create article edit page here using formik and yup
  return (
    <Stack>
      <Typography>TITLE: {article?.title}</Typography>
      <Typography>CONTENT: {article?.content}</Typography>
      <Typography>CATEGORY: {article?.category.name}</Typography>
      <Typography>SLUG: {article?.slug}</Typography>
    </Stack>
  );
};

export default Home;
