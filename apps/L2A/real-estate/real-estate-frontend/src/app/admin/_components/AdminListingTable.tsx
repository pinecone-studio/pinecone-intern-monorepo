'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useGetPostsQuery } from '@/generated';
import { useRouter } from 'next/navigation';

const TABS = ['Хүлээгдэж буй', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'];
const STATUS_MAP: Record<string, string> = {
  'Хүлээгдэж буй': 'PENDING',
  'Зөвшөөрсөн':'APPROVED',
  'Татгалзсан': 'DECLINED',
  'Админ хассан': '',
};

const AdminListingTable = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>('Хүлээгдэж буй');
  const { data, loading, error } = useGetPostsQuery();
  if (loading) return <div className="flex items-center justify-center h-screen bg-[#F9F9F9]">
    <div className="space-y-4 text-center">
      <div className="w-12 h-12 mx-auto border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-lg font-medium text-gray-600">Уншиж байна...</p>
    </div>
  </div>
  if (error) return <p>Error loading posts: {error.message}</p>;
  const filteredListings = (data?.getPosts ?? []).filter((listing) => listing.status === STATUS_MAP[selectedTab]);

  return (
    <div  className="p-6">
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
                <tr key={listing._id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/admin/details/${listing._id}`)}>
                  <td className="px-4 py-2 text-[#00000]  border-x max-w-[100px] truncate whitespace-nowrap">{listing._id}</td>
                  <td className="px-4 py-2 flex items-center gap-2 border-x">
                   <Image
                      src={listing?.images?.[0] ?? '/placeholder.png'}
                      alt="thumb"
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                    {listing.title}
                  </td>
                  <td className="px-4 py-2 border-x">{listing?.ownerName}</td>
                  <td className="px-4 py-2 border-x">{listing?.number}</td>
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
