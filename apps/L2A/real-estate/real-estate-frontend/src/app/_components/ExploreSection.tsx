'use client';

import ExploreCard from './ExploreCard';
import Link from 'next/link';

const exploreItems = [
  {
    title: 'Орон сууц',
    type: 'APARTMENT',
    count: 1209,
    imageUrl: '/listingcard.png',
  },
  {
    title: 'Байшин',
    type: 'HOUSE',
    count: 850,
    imageUrl: '/listingcard.png',
  },
  {
    title: 'Оффис',
    type: 'OFFICE',
    count: 670,
    imageUrl: '/listingcard.png',
  },
];

const ExploreSection = () => {
  return (
    <section data-cy="explore-section" className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Explore Mongolia</h2>
          <Link href="/listing">
            <button className="text-sm text-gray-600 hover:text-black border border-gray-300 rounded-md px-3 py-1">View all</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exploreItems.map((item, index) => (
            <Link key={index} href={`/listing?type=${item.type}`}>
            <ExploreCard key={index} {...item} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
