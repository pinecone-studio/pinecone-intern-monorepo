'use client';

import { First } from '@/components/First';
import { Second } from '@/components/Second';
import { Second2 } from '@/components/Second2';
import { useGetAllTasksQuery } from '@/generated';

const Page = () => {
  const { data, refetch } = useGetAllTasksQuery();
  const todos = data?.getAllTasks;
  const gg = () => {
    refetch();
  };
  return (
    <div className="w-[1440px] py-10 px-10 flex flex-col gap-5">
      <First refetch={gg} />
      <div className="flex gap-5 justify-center">
        <Second todos={todos} />
        <Second2 />
      </div>
    </div>
  );
};

export default Page;
