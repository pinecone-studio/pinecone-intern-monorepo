'use client';

import { useGetArticlesByCategoryNoLimitLazyQuery } from '@/generated';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type HeaderArticleProps = {
  id: string | null;
};

const HeaderArticles = (props: HeaderArticleProps) => {
  const { id } = props;
  const router = useRouter();

  const [getArticles, { data, loading }] = useGetArticlesByCategoryNoLimitLazyQuery();

  useEffect(() => {
    if (id) {
      getArticles({ variables: { categoryId: id } });
    }
  }, [getArticles, id]);

  return (
    <div data-cy="header-article" style={{ display: id ? 'flex' : 'none' }} className="flex flex-row w-full gap-6   overflow-x-scroll">
      {loading ? (
        <div className="w-full h-50 flex justify-center items-center">
          <p className="text-black text-xl">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-row w-fit h-fit gap-6">
          {data?.getArticlesByCategoryNoLimit.map((data, index) => {
            const { title, coverPhoto, id } = data;
            const routerHandler = () => {
              router.push(`articles/${id}`);
            };
            return (
              <div data-cy="each-header-article" key={index} style={{ width: 350, height: 300, position: 'relative' }} onClick={routerHandler}>
                <div className="w-full h-full rounded-[12px] overflow-hidden">
                  <img src={coverPhoto} className="w-full h-full object-cover" />
                </div>
                <div className="absolute w-full h-full bg-transparent top-0 left-0 flex flex-col p-6 justify-end">
                  <p className="text-white text-[18px]">{title}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeaderArticles;
