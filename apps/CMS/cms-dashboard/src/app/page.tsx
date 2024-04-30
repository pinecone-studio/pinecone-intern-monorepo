'use client';

import MainBannerFromArticles from './articles/_components/MainBannerFromArticles';
import { Stack } from '@mui/material';
import GroupArticlesComp from './articles/_features/GroupArticlesComp';
import { useGetNewestArticleQuery, useGetCategoriesQuery } from '../generated';
import { Loader } from './sign-up/_components';

const Home = () => {
  const { data, loading } = useGetNewestArticleQuery();
  const { data: categories, loading: categoriesLoading } = useGetCategoriesQuery();
  return (
    <div>
      <Stack width={'100vw'} gap={6} bgcolor={'#F7F7F8'} suppressHydrationWarning={true} alignItems={'center'} pb={3}>
        {loading ? (
          <Stack width="100vw" height="100vh" alignItems="center" justifyContent="center">
            <Loader />
          </Stack>
        ) : (
          <MainBannerFromArticles
            articlesTitle={data?.getNewestArticle.title}
            cover={data?.getNewestArticle.coverPhoto ?? '/earth.jpeg'}
            date={data?.getNewestArticle.publishedAt}
            categories={data?.getNewestArticle.category.name}
          />
        )}
        <Stack px={12} gap={6} width={'70%'}>
          {categoriesLoading
            ? null
            : categories?.getCategories.map((item) => {
                return <GroupArticlesComp key={item.id} title={item.name} categoryId={item.id} />;
              })}
        </Stack>
      </Stack>
    </div>
  );
};
export default Home;
