'use client';

import { Article, useGetArticleByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';

const CopyLink = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });
  const article = data?.getArticleByID as Article | undefined;

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <div className="flex flex-col w-full max-w-screen-lg mx-auto gap-8 py-4">
      <div className="flex flex-col gap-1">
        <p className="font-[700] text-[36px] text-[#121316]">{article?.title}</p>
        <p className="font-[300] text-[#8B8E95] text-[16px]">Нийтэлсэн: {article?.publishedAt.slice(0, 10)}</p>
        <p className="bg-[#B7DDFF] py-0.5 px-3 w-fit rounded-[12px] font-normal text-[14px]">{article?.category.name}</p>
      </div>

      <div className="bg-[#D6D8DB] w-full h-[1.6px]"></div>
    </div>
  );
};

export default CopyLink;
