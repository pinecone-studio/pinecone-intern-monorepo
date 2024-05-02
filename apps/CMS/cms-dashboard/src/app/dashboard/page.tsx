'use client';

import { useGetArticlesQueryQuery } from '../../generated';
import DashboardTableT from './_features/DashboardTableT';

const Home = () => {
  const { data } = useGetArticlesQueryQuery();
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <DashboardTableT />
    </div>
  );
};
export default Home;
