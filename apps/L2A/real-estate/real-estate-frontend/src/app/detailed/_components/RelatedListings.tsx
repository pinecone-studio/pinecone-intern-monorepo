import ListingCard from '@/app/home/_components/ListingCard';
import { GetPostsQuery } from '@/generated';

const RelatedListings = ({ posts }: { posts?: GetPostsQuery['getPosts'] }) => (
  <div className="mt-12">
    <h2 className="text-2xl font-bold mb-4">Төстэй зарууд</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="listing-Grid" data-cy="listing-Grid">
      {posts?.map((item) => (
        <ListingCard
          key={`detailed-${item._id}`}
          image={item?.images?.[0] || '/placeholder.png'}
          price={item?.price}
          title={item?.title}
          totalRooms={item?.totalRooms}
          restrooms={item?.restrooms}
          size={item?.size}
          city={item?.location?.city}
          district={item?.location?.district}
        />
      ))}
    </div>
  </div>
);

export default RelatedListings;
