'use client';

import Image from 'next/image';
import { useState } from 'react';
import BuildingDetails from './BuildingDetails';
import StatusSelect from './StatusSelect';


const ListingDetailAdminView = () => {

  const [status, setStatus] = useState('Хүлээгдэж буй');
  

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Ерөнхий мэдээлэл</h2>

            <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-800 mb-4">
              <div>
                <p className="text-gray-500">Эзэмшигч</p>
                <p className="font-medium">Н.Мөнхтунгалаг</p>
              </div>
              <div>
                <p className="text-gray-500">Утасны дугаар</p>
                <p className="font-medium">99112233</p>
              </div>
              <div>
                <p className="text-gray-500">Нэр</p>
                <p className="font-medium">Seoul royal county хотхон</p>
              </div>
              <div>
                <p className="text-gray-500">Үнэ</p>
                <p className="font-medium">880,000,000₮</p>
              </div>
              <div>
                <p className="text-gray-500">Талбай</p>
                <p className="font-medium">200.0 м²</p>
              </div>
              <div>
                <p className="text-gray-500">Унтлагын өрөө</p>
                <p className="font-medium">4 өрөө</p>
              </div>
              <div>
                <p className="text-gray-500">Ариун цэврийн өрөө</p>
                <p className="font-medium">2 өрөө</p>
              </div>
              <div>
                <p className="text-gray-500">Дулаан зогсоол</p>
                <p className="font-medium">Байхгүй</p>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-gray-500 mb-1">Дэлгэрэнгүй тайлбар</p>
              <p className="text-gray-800">Seoul Royal County хотхонд тавтай морилно уу! ...</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Зураг</h2>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-full aspect-[4/3] relative">
                  <Image src="/listingcard.png" alt="listing" fill className="rounded-md object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Байршил</h2>
            <p className="text-sm text-gray-500 mb-4">Please tell us the name of the guest...</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 mb-2">
              <div>
                <p className="text-gray-500">Дүүрэг</p>
                <p className="font-medium">Хан-Уул</p>
              </div>
              <div>
                <p className="text-gray-500">Хороо</p>
                <p className="font-medium">1-р хороо</p>
              </div>
            </div>
            <div className="text-sm mt-2">
              <p className="text-gray-500 mb-1">Дэлгэрэнгүй</p>
              <p className="font-medium text-gray-800">Зайсан толгойн урд, америк сургуулийн хажууд</p>
            </div>
          </div>

          <BuildingDetails />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">


          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block">Төлөв</label>
            <StatusSelect value={status} onChange={(newStatus) => setStatus(newStatus)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailAdminView;
