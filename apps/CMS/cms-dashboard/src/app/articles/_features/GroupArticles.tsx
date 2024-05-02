'use client';
import ArticleCard from '../_components/ArticleCard';
import { useState } from 'react';
import { useGetArticlesByCategoryQuery } from '../../../generated';
import DropDownSvg from '../../../assets/icons/DropDownSvg';

type GroupArticlesProps = {
  title: string;
  categoryId: string;
};

const GroupArticles = (props: GroupArticlesProps) => {
  const { title, categoryId } = props;
  const [quantity, setQuantity] = useState(2);
  const { previousData, data, loading } = useGetArticlesByCategoryQuery({
    variables: {
      categoryId: categoryId,
      quantity: quantity,
    },
  });
  const clickHandler = () => setQuantity((prev) => prev + 2);

  return (
    <div data-cy="article-main-container" className="flex flex-col w-full p-6 gap-8 bg-[#fff] rounded-2xl">
      <div data-cy="group-container" className="flex flex-col p-6 gap-8 bg-[#fff] rounded-2xl">
        <p data-cy="group-title" className="text-[28px] font-bold text-black">
          {title}
        </p>
        <div data-cy="group-grid" className="grid grid-cols-2 gap-8 ">
          {loading
            ? previousData?.getArticlesByCategory?.map((item) => (
                <ArticleCard key={item.id} title={item?.title} cover={item.coverPhoto} description={item?.content} category={item?.category.name} date={item?.publishedAt} />
              ))
            : data?.getArticlesByCategory?.map((item) => (
                <ArticleCard key={item.id} title={item.title} cover={item.coverPhoto} description={item.content} category={item.category.name} date={item.publishedAt} />
              ))}
        </div>
        <div data-cy="group-innerCon" className="flex w-full justify-center">
          <div data-cy="group-icon-button" onClick={clickHandler} className="w-fit h-fit flex cursor-pointer p-4 rounded-full hover:bg-[#1C202414]">
            <DropDownSvg />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupArticles;
