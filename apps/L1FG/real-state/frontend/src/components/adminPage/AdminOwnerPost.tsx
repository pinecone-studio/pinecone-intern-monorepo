'use client';

import { HouseIcon } from '../layout/icons/HouseIcon';

const data = [
  {
    id: '0001',
    name: 'Seoul royal county хотхон',
    owner: 'Н.Мөнхтунгалаг',
    phone: '99112233',
  },
];

export const AdminOwnerPost = () => {
  return (
    <div className="container h-[767px] max-w-[1280px] mx-auto mt-8">
      <div className="mt-6">
        <p className="font-semibold text-xl">Зарууд</p>
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Нэр</th>
                <th className="px-4 py-2 border">Эзэмшигч</th>
                <th className="px-4 py-2 border">Утасны дугаар</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="even:bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                  <td className="px-4 py-2 border">{item.id}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <HouseIcon />
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-2 border">{item.owner}</td>
                  <td className="px-4 py-2 border">{item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
