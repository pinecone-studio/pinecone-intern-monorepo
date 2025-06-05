'use client';

import ExploreCard from './ExploreCard';
import Link from 'next/link';
import { motion } from 'framer-motion';

const exploreItems = [
  {
    title: 'Орон сууц',
    type: 'APARTMENT',
    count: 1209,
    imageUrl: '/apartment.png',
  },
  {
    title: 'Байшин',
    type: 'HOUSE',
    count: 850,
    imageUrl: '/house.png',
  },
  {
    title: 'Оффис',
    type: 'OFFICE',
    count: 670,
    imageUrl: '/office.png',
  },
]

const ExploreSection = () => {
  return (
    <section data-cy="explore-section" className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Explore Mongolia</h2>
          <Link href="/listing">
            <button className="text-sm text-gray-600 hover:text-black border border-gray-300 rounded-md px-3 py-1">
              View all
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {exploreItems.map((item, index) => (
            <Link key={index} href={`/listing?type=${item.type}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              >
                <ExploreCard {...item} />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
