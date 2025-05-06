'use client';

import { useState } from 'react';
import AdminListingTable, { Listing } from './_components/AdminListingTable';
import ListingDetailAdminView from './_components/ListingDetailAdminView';
const AdminPage = () => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const listings: Listing[] = new Array(10).fill(null).map((_, i) => ({
    id: `${i + 1}`.padStart(4, '0'),
    name: 'Seoul royal county хотхон',
    owner: 'Н.Мөнхтунгалаг',
    phone: '99112233',
    image: '/listingcard.png',
    status: ['Хүсэлт илгээсэн', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'][i % 4],
  }));

  return (
    <div className="p-6">{selectedListing ? <ListingDetailAdminView listing={selectedListing} /> : <AdminListingTable listings={listings} onSelect={(listing) => setSelectedListing(listing)} />}</div>
  );
};

export default AdminPage;
