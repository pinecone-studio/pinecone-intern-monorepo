import { HistoryBar, PaginationBar } from '../_components';

export const HistoryBox = () => {
  return (
    <>
      <h3 className="text-[32px] font-bold mb-8">Сорилтын түүх</h3>
      <HistoryBar />
      <PaginationBar />
    </>
  );
};
