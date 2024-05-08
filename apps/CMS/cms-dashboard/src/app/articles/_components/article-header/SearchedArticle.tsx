'use client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

type SearchedArticleProps = {
  title: string;
  coverPhoto: string;
  createdAt: Date;
  id: string;
};

const SearchedArticle = (props: SearchedArticleProps) => {
  const { id, coverPhoto, createdAt, title } = props;
  const router = useRouter();

  const routerHandler = () => {
    router.push(`articles/${id}`);
  };
  return (
    <div data-testid="searched-article-container" data-cy="searched-article-container" className="w-full flex flex-row p-2 items-center gap-4 max-h-[400]" onClick={routerHandler}>
      <img src={coverPhoto} height={80} width={160} className="object-cover" style={{ borderRadius: '10px', overflow: 'hidden' }} />
      <div className="flex flex-col gap-2 items-start">
        <p data-testid="searched-article-title" className="text-black font-bold text-[14px]">
          {title}
        </p>
        <p data-testid="searched-article-date" className="text-[#121316] text-[12px]">
          {format(createdAt, 'yyyy.MM.dd')}
        </p>
      </div>
    </div>
  );
};

export default SearchedArticle;
