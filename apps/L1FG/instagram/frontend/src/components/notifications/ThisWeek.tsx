import { RequestFollow } from './RequestFollow';

export const ThisWeek = () => {
  return (
    <div className="p-4 border-b">
      <h2 className="font-bold">This Week</h2>
      <RequestFollow />
    </div>
  );
};
