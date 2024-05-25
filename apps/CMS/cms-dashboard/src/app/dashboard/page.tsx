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
import { RefetchProvider } from '@/common/providers/RefetchProvider';

const Home = () => {
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const limit = 8;
  const statusFilter = searchParams.get('status') ?? '';
  const searchedValueFilter = searchParams.get('searchedValue') ?? '';
  const startDateFilter = searchParams.get('startDate');
  const endDateFilter = searchParams.get('endDate');
  const {
    data,
    loading,
    error,
    refetch: getArticlesRefetch,
  } = useGetArticlesByPaginateQuery({
    variables: {
      paginationInput: {
        limit,
        page: pageNumber + 1,
      },
      filterInput: {
        status: statusFilter === 'ALL' ? '' : statusFilter,
        searchedValue: searchedValueFilter,
        startDate: startDateFilter,
        endDate: endDateFilter,
      },
    },
  });

  const articles = data?.getArticlesByPaginate.articles as Article[] | undefined;
  const totalArticles = data?.getArticlesByPaginate.totalArticles ?? limit;
  const totalPageQuantity = Math.ceil(totalArticles / limit);

  useEffect(() => {
    setPageNumber(0);
  }, [statusFilter, searchedValueFilter]);
  return (
    <RefetchProvider refetch={getArticlesRefetch}>
      <div className="bg-grayBackground">
        <Navbar />
        <div data-cy="dashboard-table-cy" className="w-full min-h-screen max-w-screen-xl mx-auto py-6 flex flex-col gap-2">
          <div className="flex gap-2">
            <SearchInput />
            <FilterByDate />
          </div>

          <ArticleStatusTabsFeature />
          <DashboardTable articles={articles} loading={loading} error={error} />

          <Pagination totalPageQuantity={totalPageQuantity} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          <div className="flex justify-center">
            <AdminNavigateLinksFeature />
          </div>
        </div>
      </div>
    </RefetchProvider>
  );
};
export default Home;
