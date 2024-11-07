'use client';

import { Third } from './Third';

export const Second = ({ todos }: { todos: any }) => {
  return (
    <div className="bg-[#101010]  w-[280px] min-h-[672px] rounded-lg px-5 py-5 flex flex-col gap-2">
      <div className="text-white">To do</div>
      <div className="text-white flex flex-col gap-5">
        {todos?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <Third taskName={item.taskName} priority={item.priority} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
