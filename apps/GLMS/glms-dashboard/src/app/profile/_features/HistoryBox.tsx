import { useGetChallengeSessionsQuery } from '@/generated';
import { HistoryBar, PaginationBar } from '../_components';
import { useEffect, useState } from 'react';

export const HistoryBox = () => {
  const { data, refetch } = useGetChallengeSessionsQuery();
  const [pageNum, setPageNum] = useState<number>(10);
  const [pageNumInit, setPageNumInit] = useState<number>(0);

  useEffect(() => {
    refetch();
  }, []);

  if (!(data && data.getChallengeSessions && data.getChallengeSessions.length > 0)) {
    return <h1>LOADING</h1>;
  }
  return (
    <div className="w-[856px] h-[1044px] bg-white rounded-xl flex flex-col items-center p-8">
      <div>
        <h3 className="text-[32px] font-bold mb-8">Сорилтын түүх</h3>
        <div className="flex flex-col gap-3">
          {data?.getChallengeSessions.slice(pageNumInit, pageNum).map((a, index) => {
            return <HistoryBar key={index} data={a} />;
          })}
        </div>
        <PaginationBar pageFunc={setPageNum} pageNum={pageNum} initFunc={setPageNumInit} pageNumInit={pageNumInit} />
      </div>
    </div>
  );
};
