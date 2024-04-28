'use client';

import { Container, Stack } from '@mui/material';
import DashboardTable from './_features/DashboardTable';
import { MenuBar } from './_features/MenuBar';
import { useGetArticlesQueryQuery, Article } from '../../generated';
import { SearchInput } from './_components/SearchInput';
import { FilterByDate } from './_components/FilterByDate';
import { Navbar } from './_components/Navbar';

const Home = () => {
  const { data: article } = useGetArticlesQueryQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;
  return (
    <Stack data-cy="dashboard-page-cy-id" bgcolor={'#ECEDF0'}>
      <Navbar />
      <Stack>
        <Container maxWidth="lg">
          <Stack gap={1} py={3}>
            <Stack direction={'row'} justifyContent={'space-between'}>
              <SearchInput />
              <FilterByDate />
            </Stack>

            <Stack gap={2.7}>
              <MenuBar articles={articles} />
              <DashboardTable articles={articles} />
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </Stack>
  );
};

export default Home;
