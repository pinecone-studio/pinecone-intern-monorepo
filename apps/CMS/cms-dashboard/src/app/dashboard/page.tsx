'use client';

import { useSearchParams } from 'next/navigation';
import { Article, useGetArticlesByPaginateQuery } from '../../generated';
import { Pagination } from './_components';
import { FilterByDate } from './_components/FilterByDate';
import { Navbar } from './_components/Navbar';
import { SearchInput } from './_components/SearchInput';
import { AdminNavigateLinksFeature, ArticleStatusTabsFeature } from './_features';
import { DashboardTable } from './_features/DashboardTable';
import { useEffect, useState } from 'react';

const Home = () => {
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const statusFilter = searchParams.get('status') ?? '';
  const searchedValueFilter = searchParams.get('searchedValue') ?? '';

  const { data, loading, error } = useGetArticlesByPaginateQuery({
    variables: {
      paginationInput: {
        limit: 3,
        page: pageNumber + 1,
      },
      filterInput: {
        status: statusFilter === 'ALL' ? '' : statusFilter,
        searchedValue: searchedValueFilter,
      },
    },
  });

  const articles = data?.getArticlesByPaginate.articles as Article[] | undefined;
  const totalArticles = data?.getArticlesByPaginate.totalArticles ?? 3;
  const totalPageQuantity = Math.ceil(totalArticles / 3);

  useEffect(() => {
    setPageNumber(0);
  }, [statusFilter, searchedValueFilter]);
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
              <DashboardTable articles={articles} loading={loading} error={error} />
            </div>
          </div>
          <Pagination totalPageQuantity={totalPageQuantity} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          <div className="flex justify-center">
            <AdminNavigateLinksFeature />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
