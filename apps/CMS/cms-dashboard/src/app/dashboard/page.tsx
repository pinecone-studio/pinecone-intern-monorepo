'use client';

import { Article, useGetArticlesQueryQuery } from '../../generated';
import { SearchInput } from './_components/SearchInput';
import { AdminNavigateLinksFeature, ArticleStatusTabsFeature } from './_features';
import DashboardTableT from './_features/DashboardTableT';

const Home = () => {
  const { data: article } = useGetArticlesQueryQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;

  return (
    <div data-cy="dashboard-table-cy" className="w-full max-w-screen-xl mx-auto">
      <SearchInput />
      <DashboardTableT articles={articles} />
      <ArticleStatusTabsFeature />
      <AdminNavigateLinksFeature />
    </div>
  );
};
export default Home;
