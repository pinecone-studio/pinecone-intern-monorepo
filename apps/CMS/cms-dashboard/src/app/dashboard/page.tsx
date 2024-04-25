'use client';

import { Container, Stack } from '@mui/material';
import DashboardTable from './_features/DashboardTable';
import { MenuBar } from './_features/MenuBar';
import { useGetArticlesQueryQuery, Article } from '../../generated';

import { SearchInput } from './_components/SearchInput';

const Home = () => {
  const { data: article } = useGetArticlesQueryQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;
  return (
    <Container data-cy="dashboard-page-cy-id" maxWidth="lg">
      <Stack gap={2} py={4}>
        <MenuBar articles={articles} />
        <DashboardTable articles={articles} />
        <SearchInput />
      </Stack>
    </Container>
  );
};

export default Home;
