'use client';

import { useState } from 'react';
import UserListingTable, { Listing } from './_components/UserListingTable';

const statuses: Listing['status'][] = ['Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'];

const UserListingPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Зарууд');

  const listings: Listing[] = new Array(10).fill(null).map((_, i) => ({
    id: `000${i + 1}`,
    name: 'Seoul royal county хотхон',
    owner: 'Н.Мөнхтунгалаг',
    image: '/listingcard.png',
    status: statuses[i % statuses.length],
    price: '880,000,000₮',
  }));

  const filteredListings = selectedTab === 'Зарууд' ? listings : listings.filter((l) => l.status === selectedTab);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Миний зарууд</h1>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setSelectedTab('Зарууд')} className={`px-4 py-1.5 rounded-md text-sm border ${selectedTab === 'Зарууд' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-50'}`}>
          Зарууд
        </button>
        {statuses.map((tab) => (
          <button key={tab} onClick={() => setSelectedTab(tab)} className={`px-4 py-1.5 rounded-md text-sm border ${selectedTab === tab ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      <UserListingTable listings={filteredListings} />
    </div>
  );
};

export default UserListingPage;
