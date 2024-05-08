'use client';

import { useGetArticlesByStatusQuery } from '@/generated';
import SearchedArticle from '../../_components/article-header/SearchedArticle';
import { Loader } from '@/app/sign-up/_components';

type SearchArticleProps = {
  searchValue: string;
};

const SearchArticles = (props: SearchArticleProps) => {
  const { searchValue } = props;
  const { data, loading } = useGetArticlesByStatusQuery({ variables: { status: 'PUBLISHED' } });
  return (
    <div data-cy="search-articles" className="w-full flex flex-col items-start gap-6">
      <p className="text-xl text-black">Search result</p>
      <div data-cy="searched-articles-container" className="w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', padding: '20px' }}>
        {loading ? (
          <div className="w-full h-40 flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          data?.getArticlesByStatus.map((data) => {
            const { title, ...rest } = data;
            return title.toLowerCase().includes(searchValue) ? <SearchedArticle title={title} {...rest} /> : null;
          })
        )}
      </div>
    </div>
  );
};

export default SearchArticles;
