'use client';

import MainBannerFromArticles from './articles/_components/MainBannerFromArticles';
import { useGetNewestArticleQuery, useGetCategoriesQuery } from '../generated';
import GroupArticles from './articles/_features/GroupArticles';
import { AdminNavigateLinksFeature } from './dashboard/_features';
import { Loader } from './sign-up/_components';

const Home = () => {
  const { data, loading } = useGetNewestArticleQuery();
  const { data: categories, loading: categoriesLoading } = useGetCategoriesQuery();
  return (
    <div>
      <div className="flex flex-col w-full gap-12 bg-[#F7F7F8] items-center pb-6" suppressHydrationWarning={true}>
        {loading ? (
          <div className="flex w-[100vw] h-[100vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <MainBannerFromArticles
            articlesTitle={data?.getNewestArticle.title}
            cover={data?.getNewestArticle.coverPhoto}
            date={data?.getNewestArticle.publishedAt}
            categories={data?.getNewestArticle.category.name}
            id={data?.getNewestArticle.id}
          />
        )}
        {categoriesLoading ? null : (
          <div className="flex flex-col md:px-24 sm:px-[48px] gap-12 xl:w-[65%] lg:w-[70%] md:w-[85%] sm:w-[100vw] pb-28">
            {categories?.getCategories.map((item) => (
              <GroupArticles key={item.id} title={item.name} categoryId={item.id} />
            ))}
          </div>
        )}
        <div className="fixed opacity-100 bottom-8 z-10">
          <AdminNavigateLinksFeature />
        </div>
      </div>
    </div>
  );
};
export default Home;
