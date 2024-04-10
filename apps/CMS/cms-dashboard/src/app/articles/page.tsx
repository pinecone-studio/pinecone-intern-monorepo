'use client';

import { useRouter } from 'next/navigation';
import { useHelloQueryFromArticlesServiceQuery } from '../../generated';
import { ArticlesMain } from './_features';

const ArticlesPage = () => {
  const { data } = useHelloQueryFromArticlesServiceQuery();
  const router = useRouter();

  const handleNavigateToHomePageButton = () => router.push('/');

  return (
    <div>
      <h1>hello from CMS dashboard Articles Page</h1>
      <h1>
        hello from Articles Service Query
        {data?.helloQueryFromArticlesService}
      </h1>
      <ArticlesMain />
      <button onClick={handleNavigateToHomePageButton}>Go back to home page</button>
    </div>
  );
};

export default ArticlesPage;
