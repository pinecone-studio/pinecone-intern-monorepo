'use client';

import { useState } from 'react';
import AdminListingTable, { Listing } from './_components/AdminListingTable';
import ListingDetailAdminView from './_components/ListingDetailAdminView';

const AdminPage = () => {
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const statuses = ['Хүлээгдэж буй', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'];

  const listings: Listing[] = new Array(12).fill(null).map((_, i) => ({
    id: `${i + 1}`.padStart(4, '0'),
    name: `Зар #${i + 1}`,
    owner: `Эзэмшигч ${i + 1}`,
    phone: `9911${String(1000 + i).slice(-4)}`,
    image: '/listingcard.png',
    status: statuses[i % 4],
  }));

  return <div>{selectedListing ? <ListingDetailAdminView listing={selectedListing} /> : <AdminListingTable listings={listings} onSelect={(listing) => setSelectedListing(listing)} />}</div>;
};

export default AdminPage;
