import { useGetCommentsCountQuery } from '@/generated';
import { Dispatch, SetStateAction, useEffect } from 'react';

const CommentsTab = ({
  setSelectedStatus,
  selectedStatus,
}: {
  setSelectedStatus: Dispatch<
    SetStateAction<{
      status: string;
      count: number;
    }>
  >;
  selectedStatus: {
    status: string;
    count: number;
  };
}) => {
  const { data } = useGetCommentsCountQuery();
  const chooseStatus = (status: string, count: number | undefined) => {
    setSelectedStatus({ status, count: count ? count : 0 });
  };

  useEffect(() => {
    setSelectedStatus({ status, count: data?.getCommentsCount?.normalCount ? data?.getCommentsCount?.normalCount : 0 });
  }, [data]);

  return (
    <div className="p-3 bg-white rounded-xl w-full">
      <button
        name="normal"
        style={{ backgroundColor: selectedStatus.status === 'NORMAL' ? 'gray' : '' }}
        onClick={() => chooseStatus('NORMAL', data?.getCommentsCount?.normalCount)}
        className="btn btn-ghost"
        id="normal-tab-test-id"
      >
        Бүгд
        <div className="bg-slate-200 rounded-full flex justify-center items-center w-6 h-6">{data?.getCommentsCount?.normalCount}</div>
      </button>
      <button
        id="hidden-tab-test-id"
        onClick={() => chooseStatus('HIDDEN', data?.getCommentsCount?.hiddenCount)}
        className="btn btn-ghost"
        style={{ backgroundColor: selectedStatus.status === 'HIDDEN' ? 'gray' : '' }}
      >
        Нуусан
        <div className="bg-slate-200 rounded-full flex justify-center items-center w-6 h-6">{data?.getCommentsCount?.hiddenCount}</div>
      </button>
      <button
        id="delete-tab-test-id"
        onClick={() => chooseStatus('DELETED', data?.getCommentsCount?.deletedCount)}
        className="btn btn-ghost"
        style={{ backgroundColor: selectedStatus.status === 'DELETED' ? 'gray' : '' }}
      >
        Устгасан
        <div className="bg-slate-200 rounded-full flex justify-center items-center w-6 h-6">{data?.getCommentsCount?.deletedCount}</div>
      </button>
    </div>
  );
};

export default CommentsTab;
