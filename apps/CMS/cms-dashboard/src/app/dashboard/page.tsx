'use client'
import { Stack } from '@mui/material';
import { PaginationFooter } from './_components/PaginationFooter';
import { MenuBar } from './_features';
import { useGetArticlesQuery, Article } from "../../generated";
import { useState } from 'react';

const Home = () => {
  const [ status, setStatus ] = useState('Бүгд')
  const { data: article, loading, error } = useGetArticlesQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;
  if(loading) return <Stack>Loading...</Stack>
  if(error) return <Stack>Error</Stack>
  return ( 
    <Stack data-cy="dashboard-page-cy-id">
      <MenuBar articles={articles} setStatus={setStatus} status={status}/>
      Welcome to Cms Dashboard hello
      <PaginationFooter />
    </Stack>
  );
};
export default Home;
