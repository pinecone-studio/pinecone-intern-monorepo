'use client';

import { useRouter } from 'next/navigation';

type ArticlesProps = {
  coverPhoto: string;
  date?: string;
  title?: string;
  category?: string;
  content: string;
  _id?: string;
};

const ArticleCard = (props: ArticlesProps) => {
  const { coverPhoto, date, title, category, content, _id } = props;

  const router = useRouter();

  const routerHandler = () => {
    router.push(`articles/${_id}`);
  };

  return (
    <div data-testid="article-card" className="flex flex-col w-full h-[504px] overflow-hidden" onClick={routerHandler}>
      <div className="w-full h-[50%] rounded-xl overflow-hidden ">
        <img data-cy="article-coverPhoto" src={coverPhoto} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <div className="flex flex-row items-center gap-2">
          <p data-testid="article-date" className="text-[#3F4145]">
            {date?.slice(0, -14)}
          </p>
          <div className="h-[4px] w-[4px] bg-[#121316] rounded-full"></div>
          <p data-testid="article-category" className="text-[#3F4145]">
            #{category}
          </p>
        </div>
        <p data-testid="article-title" className="font-bold text-2xl text-[#121316]">
          {title}
        </p>
        <div data-testid="article-content" dangerouslySetInnerHTML={{ __html: content }} className="text-lg max-w-[564px] max-h-[56px] truncate " />
      </div>
    </div>
  );
};
export default ArticleCard;
