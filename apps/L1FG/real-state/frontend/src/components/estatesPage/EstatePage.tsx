import { MainCard } from '@/features/card';
import { Post } from '@/generated';

export const Estates = ({ data }: { data: Post[] | undefined }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p>
          Нийт : <span>{data?.length}</span> илэрц
        </p>
        <div className="w-[240px]"></div>
      </div>
      <div data-testid="estates-grid" className="grid  md:grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.map((item: Post) => {
          return <MainCard key={`${item._id}+${item.price}`} value={item} data-testid="main-card" />;
        })}
      </div>
    </div>
  );
};
