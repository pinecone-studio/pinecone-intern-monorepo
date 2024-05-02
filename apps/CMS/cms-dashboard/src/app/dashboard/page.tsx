'use client';

import { Article, useGetArticlesQueryQuery } from '../../generated';
import DashboardTableT from './_features/DashboardTableT';

const Home = () => {
  const { data: article } = useGetArticlesQueryQuery();
  const articles = article?.getArticlesQuery as Article[] | undefined;

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <DashboardTableT articles={articles} />
    </div>
  );
};
export default Home;
