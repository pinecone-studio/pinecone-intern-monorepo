'use client';

import Image from 'next/image';

const mockListings = new Array(10).fill(null).map((_, i) => ({
  id: `${i + 1}`.padStart(4, '0'),
  name: 'Seoul royal county хотхон',
  owner: 'Н.Мөнхтунгалаг',
  phone: '99112233',
  image: '/listingcard.png',
}));

const AdminListingTable = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Зарууд</h1>
      <div className="flex justify-between items-center mb-4">
        <input type="text" placeholder="Хайлт" className="border rounded px-3 py-2 text-sm w-[783px]" />

        <div className="flex gap-2">
          {['Хүсэлт илгээсэн', 'Зөвшөөрсөн', 'Татгалзсан', 'Админ хассан'].map((tab, i) => (
            <button key={i} className={`px-4 py-1.5 text-sm border rounded-full hover:bg-gray-100 ${i === 0 ? 'bg-gray-100 font-semibold' : ''}`}>
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
              <th className="px-4 py-2 border-x">Утасны дугаар</th>
            </tr>
          </thead>
          <tbody>
            {mockListings.map((listing, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer border-x">{listing.id}</td>
                <td className="px-4 py-2 flex items-center gap-2 border-x">
                  <Image src={listing.image} alt="thumb" width={40} height={40} className="rounded-md object-cover" />
                  {listing.name}
                </td>
                <td className="px-4 py-2 border-x">{listing.owner}</td>
                <td className="px-4 py-2 border-x">{listing.phone}</td>
              </tr>
            ))}
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
