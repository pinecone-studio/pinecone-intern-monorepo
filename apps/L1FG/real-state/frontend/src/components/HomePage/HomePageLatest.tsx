import { MainCard } from '@/features/card';
import { useGetPostsQuery } from '@/generated';
import Link from 'next/link';

export const HomePageLatest = () => {
  const { data, loading, error } = useGetPostsQuery({ variables: { input: { status: 'APPROVED' } } });

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error)
    return (
      <div className="flex h-screen w-screen items-center justify-center" data-testid="error-message">
        Error loading posts: {error.message}
      </div>
    );

  return (
    <div className="w-full max-w-screen-xl flex flex-col items-center gap-4 ">
      <div className="flex justify-between w-full items-center">
        <h1 className=" text-2xl">Сүүлд орсон зарууд</h1>
        <Link className="bg-white rounded-sm border py-2 px-4" href="/estates">
          Цааш үзэх
        </Link>
      </div>
      <div className="w-full max-w-screen-xl grid grid-cols-4 gap-4">
        {data?.getPosts.slice(0, 4).map((data) => {
          return <MainCard key={data.title} value={data} />;
        })}
      </div>
    </div>
  );
};
