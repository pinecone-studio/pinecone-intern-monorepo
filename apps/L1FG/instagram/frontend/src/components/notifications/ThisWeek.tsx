import { RequestFollow } from './RequestFollow';

export const ThisWeek = () => {
  return (
    <div className=" border-b">
      <h2 className="font-bold px-6 mt-[22px] mb-[18px]">This Week</h2>
      <RequestFollow />
    </div>
  );
};
