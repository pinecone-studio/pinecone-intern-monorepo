import { MainCard } from '@/features/card';
import { Post } from '@/generated';
import Link from 'next/link';

export const HomePageLatest = ({ data }: { data: Post[] | undefined }) => {
  return (
    <div className="w-full max-w-screen-xl flex flex-col items-center gap-4 ">
      <div className="flex justify-between w-full items-center">
        <h1 className=" text-2xl">Сүүлд орсон зарууд</h1>
        <Link className="bg-white rounded-sm border py-2 px-4" href="/estates">
          Цааш үзэх
        </Link>
      </div>
      <div className="w-full max-w-screen-xl grid grid-cols-4 gap-4">
        {data?.slice(0, 4).map((data: Post) => {
          return <MainCard key={data.title} value={data} />;
        })}
      </div>
    </div>
  );
};
