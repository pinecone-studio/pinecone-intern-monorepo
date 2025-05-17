'use client';
import Link from 'next/link';


const RecentListingsSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Сүүлд орсон зарууд</h2>
          <Link href="/listing">
            <button className="text-sm text-gray-600 hover:text-black border border-gray-300 rounded-md px-3 py-1">View all</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        </div>
      </div>
    </section>
  );
};

export default RecentListingsSection;
