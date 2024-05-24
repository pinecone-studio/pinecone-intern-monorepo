'use client';

import { Article, ArticleStatus, useGetArticlesQueryQuery } from '../../../generated';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { StatusTab } from '../_components/StatusTab';
import Link from 'next/link';
import { ClearAllFilterIcon } from '@/assets/icons';

const getNumberOfArticlesByStatus = (articles: Article[] | undefined, status: string) => {
  return articles?.filter((item) => item.status === status).length;
};

export const ArticleStatusTabsFeature = () => {
  const { data: articlesRaw } = useGetArticlesQueryQuery();

  const articles = articlesRaw?.getArticlesQuery as Article[] | undefined;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const clearFilter = ({ name }: { name: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete(name);
    return params.toString();
  };
  const currentStatus = searchParams.get('status') || 'ALL';

  return (
    <div data-cy="article-status-tabs-feature-cy-id" className="w-full h-fit flex items-center justify-between border-[1px] bg-white border-border rounded-[8px]">
      <div className="flex">
        <Link href={pathname + '?' + createQueryString('status', 'ALL')} className="h-[100%]">
          <StatusTab selectedStatus={currentStatus} quantity={articles?.length} thisStatus={'ALL'} />
        </Link>
        {Object.values(ArticleStatus).map((item, index) => {
          const myQty = getNumberOfArticlesByStatus(articles, item);
          return (
            <Link href={pathname + '?' + createQueryString('status', item)} key={index} className="h-[100%]">
              <StatusTab selectedStatus={currentStatus} quantity={myQty} thisStatus={item} />
            </Link>
          );
        })}
      </div>
      <div className="px-5">
        <Link href={pathname + '?' + clearFilter({ name: 'status' })}>
          <ClearAllFilterIcon />
        </Link>
      </div>
    </div>
  );
};
