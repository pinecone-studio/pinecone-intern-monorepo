'use client';

import Image from 'next/image';
import { Eye, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';

export type Listing = {
  id: string;
  name: string;
  owner: string;
  image: string;
  status: 'Хүлээгдэж буй' | 'Зарагдаж байгаа' | 'Зарагдсан' | 'Буцаагдсан' | 'Хадгалсан';
  price: string;
};

type Props = {
  listings: Listing[];
};

const statusColor = {
  'Хүлээгдэж буй': 'text-blue-600 bg-blue-50',
  'Зарагдаж байгаа': 'text-green-600 bg-green-50',
  Зарагдсан: 'text-yellow-700 bg-yellow-100',
  Буцаагдсан: 'text-red-600 bg-red-50',
  Хадгалсан: 'text-gray-700 bg-gray-100',
};

const UserListingTable = ({ listings }: Props) => {
  console.log('UserListingTable listings:', listings);
  return (
    <div className="overflow-x-auto">
      <table className="table-auto text-sm border w-full">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-2 py-2 text-left border-r w-[1%] whitespace-nowrap">ID</th>
            <th className="px-4 py-2 text-left border-r">Нэр</th>
            <th className="px-4 py-2 text-left border-r w-[150px]">Төлөв</th>
            <th className="px-4 py-2 text-left border-r w-[1%] whitespace-nowrap">Үнэ</th>
            <th className="px-4 py-2 text-center">Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="px-2 py-2 border-r w-[1%] whitespace-nowrap">{l.id}</td>
              <td className="px-4 py-2 border-r flex items-center gap-2">
                <Image src={l.image} alt="img" width={40} height={40} className="rounded-md object-cover" />
                {l.name}
              </td>
              <td className="px-4 py-2 border-r">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[l.status]}`}>{l.status}</span>
              </td>
              <td className="px-4 py-2 border-r">{l.price}</td>
              <td className="px-6 py-2 text-center w-[1%] whitespace-nowrap">
                <div className="flex justify-center gap-6">
                  <Link className="flex justify-center gap-6" href={`/user-listing/edit/${l?.id}`}>
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-400 transition-all" />
                    <Pencil className="w-4 h-4 cursor-pointer hover:text-green-400 transition-all" />
                  </Link>
                  <Trash className="w-4 h-4 cursor-pointer hover:text-red-400 transition-all" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListingTable;
