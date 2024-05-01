'use client';
import ArticleCard from '../_components/ArticleCard';
import { useState } from 'react';
import { useGetArticlesByCategoryQuery } from '../../../generated';
import DropDownSvg from '../../../assets/icons/DropDownSvg';

type GroupArticlesCompProps = {
  title: string;
  categoryId: string;
};

const GroupArticlesComp = (props: GroupArticlesCompProps) => {
  const { title, categoryId } = props;
  const [isAll, setIsAll] = useState(false);
  const { data, loading, refetch } = useGetArticlesByCategoryQuery({
    variables: {
      categoryId: categoryId,
      getAll: isAll,
    },
  });
  const clickHandler = () => {
    setIsAll((prev) => !prev);
    refetch();
  };

  return (
    <div data-cy='article-main-container' className="flex flex-col w-full p-6 gap-8 bg-[#fff] rounded-2xl">
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div data-cy="group-container" className="flex flex-col p-6 gap-8 bg-[#fff] rounded-2xl">
          <p data-cy="group-title" className="text-[28px] font-bold text-black">
            {title}
          </p>
          <div data-cy="group-grid" className="grid grid-cols-2 gap-8 ">
            {data?.getArticlesByCategory.length === 0 ? (
              <div></div>
            ) : (
              data?.getArticlesByCategory?.map((item) => {
                return (
                  <div key={item?.id}>
                    <ArticleCard
                      title={item?.title}
                      cover={item?.coverPhoto === null ? '/earth.jpeg' : item?.coverPhoto}
                      description={item?.content}
                      category={item?.category.name}
                      date={item?.publishedAt}
                    />
                  </div>
                );
              })
            )}
          </div>
          <div data-cy="group-innerCon" className="flex w-full justify-center">
            <div
              data-cy="group-icon-button"
              onClick={() => {
                clickHandler();
              }}
              className="w-fit h-fit flex cursor-pointer p-4 rounded-full hover:bg-[#1C202414]"
            >
              <DropDownSvg/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupArticlesComp;
