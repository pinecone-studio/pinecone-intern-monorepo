'use client';
import { useGetPostsQuery } from '@/generated';
import Link from 'next/link';
import ListingCard from './ListingCard';

const RecentListingsSection = () => {
  const { data, loading } = useGetPostsQuery();
  const isLoading = loading || !data?.getPosts;

  return (
    <section data-cy="recent-listings-section" className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Сүүлд орсон зарууд</h2>
          <Link href="/listing">
            <button className="text-sm text-gray-600 hover:text-black border border-gray-300 rounded-md px-3 py-1">
              View all
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-6 justify-start">
          {isLoading ? (
            Array(4).fill(null).map((_, idx) => (
              <div
                className="w-full sm:w-[48%] lg:w-[32%] xl:w-[24%]"
                key={`skeleton-${idx}`}
              >
                <div data-testid="loading-skeleton" className="animate-pulse rounded-md bg-gray-100 p-4 space-y-4">
                  <div className="h-40 bg-gray-300 rounded-md" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : (
            data?.getPosts?.slice(0, 4).map((item) => (
              <div
                className="w-full sm:w-[48%] lg:w-[32%] xl:w-[24%]"
                key={item._id}
              >
                <Link href={`/detailed/${item._id}`}>
                  <ListingCard
                    image={item?.images?.[0] || '/placeholder.png'}
                    price={item?.price}
                    title={item?.title}
                    totalRooms={item?.totalRooms}
                    restrooms={item?.restrooms}
                    size={item?.size}
                    city={item?.location?.city}
                    district={item?.location?.district}
                  />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentListingsSection;