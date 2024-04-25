'use client'
 
import { Container } from '@mui/material';
import DashboardTable from './_features/DashboardTable';
import { MenuBar } from './_features/MenuBar';
import { useGetArticlesQueryQuery, Article } from '../../generated';
 
const Home = () => {
  const { data: article } = useGetArticlesQueryQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;
  return (
    <Container data-cy="dashboard-page-cy-id" maxWidth="lg">
      <MenuBar articles={articles} />
      <DashboardTable />
    </Container>
  );
};
 
export default Home;