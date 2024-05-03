'use client';

import { Article, useGetArticlesQueryQuery } from '../../generated';
import { Pagination } from './_components';
import { SearchInput } from './_components/SearchInput';
import { AdminNavigateLinksFeature, ArticleStatusTabsFeature } from './_features';
import DashboardTableT from './_features/DashboardTableT';

const Home = () => {
  const { data: article } = useGetArticlesQueryQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;

  return (
    <div data-cy="dashboard-table-cy" className="w-full max-w-screen-xl mx-auto flex flex-col gap-[10px]">
      <SearchInput />
      <DashboardTableT articles={articles} />
      <ArticleStatusTabsFeature />
      <Pagination />
      <AdminNavigateLinksFeature />
    </div>
  );
};
export default Home;
