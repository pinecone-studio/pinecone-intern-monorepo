'use client';

import ListingCard from './ListingCard';

const recentListings = [
  {
    id: 1,
    title: 'Зайсан seoul royal county хотхон',
    price: '880,000,000₮',
    imageUrl: '/listingcard.png',
    beds: 4,
    baths: 2,
    area: 200,
    location: 'Хан-Уул дүүрэг, 1-р хороо, Зайсан',
    imageCount: '1/9',
  },
  {
    id: 2,
    title: 'River Garden хотхон',
    price: '950,000,000₮',
    imageUrl: '/listingcard.png',
    beds: 3,
    baths: 2,
    area: 180,
    location: 'Хан-Уул дүүрэг, Ривер гарден',
    imageCount: '1/6',
  },
  {
    id: 3,
    title: 'Time Square Residence',
    price: '1,200,000,000₮',
    imageUrl: '/listingcard.png',
    beds: 5,
    baths: 3,
    area: 250,
    location: 'Баянзүрх дүүрэг, 26-р хороо',
    imageCount: '1/7',
  },
];

const RecentListingsSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Сүүлд орсон зарууд</h2>
          <button className="text-sm text-gray-600 hover:text-black border border-gray-300 rounded-md px-3 py-1">
            View all
          </button>
        </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recentListings.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentListingsSection;

