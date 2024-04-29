'use client';

import { Card, Stack } from '@mui/material';
import { MenuBtn } from '../_components/MenuBtn';
import { Article, ArticleStatus } from '../../../generated';
import { MenuAllBtn } from '../_components/MenuAllBtn';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const getNumberOfArticlesByStatus = (articles: Article[] | undefined, status: string) => {
  return articles?.filter((item) => item.status === status).length;
};

type MenuBarTypes = {
  articles: Article[] | undefined;
};

export const MenuBar = (props: MenuBarTypes) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { articles } = props;
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const currentStatus = searchParams.get('status') || '';

  return (
    <Stack data-cy="menu-bar-cy-id">
      <Card>
        <Stack direction={'row'} alignItems={'center'} sx={{ textDecorationColor: 'gray', cursor: 'pointer' }}>
          <Link href={pathname + '?' + createQueryString('status', 'ALL')}>
            <MenuAllBtn status={currentStatus} number={articles?.length} statusName={'ALL'} />
          </Link>

          {articles &&
            Object.values(ArticleStatus).map((item, index) => {
              const myQty = getNumberOfArticlesByStatus(articles, item);
              return (
                <Link href={pathname + '?' + createQueryString('status', item)} key={index}>
                  <MenuBtn status={currentStatus} number={myQty} statusName={item} />
                </Link>
              );
            })}
        </Stack>
      </Card>
    </Stack>
  );
};
