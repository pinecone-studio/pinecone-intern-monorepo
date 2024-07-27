// src/app/home/page.tsx

'use client';

import { useGetArticlesQuery } from '../../generated';
import { FooterButtons, TableContent } from './_features';
import { RefetchProvider } from '@/common/providers/RefetchProvider';
import { ApolloError } from '@apollo/client';

const Home = () => {
  const { data, loading, error, refetch: getArticlesRefetch } = useGetArticlesQuery({});
  const articles = data?.getArticles || [];

  return (
    <RefetchProvider refetch={getArticlesRefetch}>
      <div className="bg-[#F7F7F8]">
        <div data-cy="dashboard-table-cy" className="w-full max-w-screen-xl mx-auto py-6 flex flex-col gap-2" style={{ minHeight: `calc(100vh)` }}>
          <div className="flex-grow m-auto">
            <TableContent articles={articles} loading={loading} error={error as ApolloError} />
          </div>
          <div className="flex justify-center">
            <FooterButtons />
          </div>
        </div>
      </div>
    </RefetchProvider>
  );
};

export default Home;
