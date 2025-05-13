'use client';

import { useState } from 'react';
import Image from 'next/image';

export type Listing = {
  id: string;
  name: string;
  owner: string;
  phone: string;
  image: string;
  status: string;
};

type AdminListingTableProps = {
  listings: Listing[];
  onSelect: (_listing: Listing) => void;
};

const TABS = ['Хүлээгдэж буй', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'];

const AdminListingTable = ({ listings, onSelect }: AdminListingTableProps) => {
  const [selectedTab, setSelectedTab] = useState<string>('Хүлээгдэж буй');

  const filteredListings = listings.filter((listing) => listing.status === selectedTab);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Зарууд</h1>

      <div className="flex justify-between items-center mb-4">
        <input type="text" placeholder="Хайлт" className="border rounded px-3 py-2 text-sm w-[783px]" />

        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setSelectedTab(tab)} className={`px-4 py-1.5 text-sm border rounded-full hover:bg-gray-100 ${selectedTab === tab ? 'bg-gray-100 font-semibold' : ''}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm text-left border-separate border-spacing-0">
          <thead className="bg-gray-100 text-gray-700 border-b">
            <tr>
              <th className="px-4 py-2 border-x">ID</th>
              <th className="px-4 py-2 border-x">Нэр</th>
              <th className="px-4 py-2 border-x">Эзэмшигч</th>
              <th className="px-4 py-2 border-x">Утас</th>
            </tr>
          </thead>
          <tbody>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <tr key={listing.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => onSelect(listing)}>
                  <td className="px-4 py-2 text-blue-600 underline border-x">{listing.id}</td>
                  <td className="px-4 py-2 flex items-center gap-2 border-x">
                    <Image src={listing.image} alt="thumb" width={40} height={40} className="rounded-md object-cover" />
                    {listing.name}
                  </td>
                  <td className="px-4 py-2 border-x">{listing.owner}</td>
                  <td className="px-4 py-2 border-x">{listing.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Энэ төлөвт зар алга.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-600">
          <span>Page 1 of 10</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 border rounded">&laquo;</button>
            <button className="px-2 py-1 border rounded">&lsaquo;</button>
            <button className="px-2 py-1 border rounded">&rsaquo;</button>
            <button className="px-2 py-1 border rounded">&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListingTable;
