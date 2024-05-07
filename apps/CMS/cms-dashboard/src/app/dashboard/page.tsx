'use client';

import { Article, useGetArticlesQueryQuery } from '../../generated';
import {  Pagination } from './_components';
import { FilterByDate } from './_components/FilterByDate';
import { Navbar } from './_components/Navbar';
import { SearchInput } from './_components/SearchInput';
import { AdminNavigateLinksFeature, ArticleStatusTabsFeature } from './_features';
import DashboardTable from './_features/DashboardTable';

const Home = () => {
  const { data: article } = useGetArticlesQueryQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;

  return (
    <div className="bg-[#e9eaec] h-[100vh]">
      <Navbar />
      <div data-cy="dashboard-table-cy" className="w-full max-w-screen-xl mx-auto py-6">
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <SearchInput />
              <FilterByDate />
            </div>
            <div className="flex flex-col gap-3">
              <ArticleStatusTabsFeature />
              <DashboardTable articles={articles} />
            </div>
          </div>
          <Pagination />
          <div className="flex justify-center">
            <AdminNavigateLinksFeature />
          </div>
        </div>
      </div>      
    </div>
  );
};
export default Home;
