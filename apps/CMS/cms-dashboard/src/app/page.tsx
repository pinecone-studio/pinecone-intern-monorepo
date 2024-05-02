'use client';

import MainBannerFromArticles from './articles/_components/MainBannerFromArticles';
import GroupArticlesComp from './articles/_features/GroupArticlesComp';
import { useGetNewestArticleQuery } from '../generated';

const Home = () => {
  const { data, loading } = useGetNewestArticleQuery(); 
  return (
    <div>
      <div className='flex flex-col w-full gap-12 bg-[#F7F7F8] items-center pb-6'  suppressHydrationWarning={true}>
        {loading ? (
          <div>Loading</div>
        ) : (
          <MainBannerFromArticles
            articlesTitle={data?.getNewestArticle.title}
            cover={data?.getNewestArticle.coverPhoto ?? '/earth.jpeg'}
            date={data?.getNewestArticle.publishedAt}
            categories={data?.getNewestArticle.category.name}
          />
        )}
        <div className='flex flex-col px-24 gap-12 w-[70%]'>
          <GroupArticlesComp title="Шинэ контентууд" categoryId="662776d1ebfd0e7cf0eed309" />
          <GroupArticlesComp title="Хөтөлбөр болон эвентүүд" categoryId="661c677c6837efa536464cab" />
          <GroupArticlesComp title="Сонирхолтой түүхүүд" categoryId="662771aaebfd0e7cf0eed302" />
        </div>
      </div>
    </div>
  );
};
export default Home;
