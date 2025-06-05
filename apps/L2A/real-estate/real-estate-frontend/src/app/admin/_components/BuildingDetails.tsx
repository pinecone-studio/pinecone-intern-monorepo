'use client';

import { GetPostByIdQuery } from '@/generated';
import React from 'react';

type Props = {
  data: GetPostByIdQuery['getPostById']
}

const BuildingDetails = ({data}:Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Барилгын дэлгэрэнгүй</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 text-sm text-gray-700">
        <div className="py-2 border-b">
          <span className="font-medium">Ашиглалтанд орсон он:</span>
        </div>
        <div className="py-2 border-b text-right">2012</div>

        <div className="py-2 border-b">
          <span className="font-medium">Цонхны тоо:</span>
        </div>
        <div className="py-2 border-b text-right">{data?.windowsCount}</div>

        <div className="py-2 border-b">
          <span className="font-medium">Цонх:</span>
        </div>
        <div className="py-2 border-b text-right">{data?.windowType}</div>

        <div className="py-2 border-b">
          <span className="font-medium">Хаалга:</span>
        </div>
        <div className="py-2 border-b text-right">{data?.door}</div>

        <div className="py-2 border-b">
          <span className="font-medium">Хэдэн давхарт:</span>
        </div>
        <div className="py-2 border-b text-right">{data?.floorNumber} давхарт</div>

        <div className="py-2 border-b">
          <span className="font-medium">Барилгын давхар:</span>
        </div>
        <div className="py-2 border-b text-right">{data?.totalFloors} давхар</div>

        <div className="py-2 border-b">
          <span className="font-medium">Шал:</span>
        </div>
        <div className="py-2 border-b text-right">{data?.roofMaterial}</div>

        <div className="py-2 border-b">
          <span className="font-medium">Тагт:</span>
        </div>
        <div className="py-2 border-b text-right">{data?.balcony ? "Байгаа" : "Байхгүй"}</div>

        <div className="py-2">
          <span className="font-medium">Лифт:</span>
        </div>
        <div className="py-2 text-right">{data?.lift ? "Байгаа" : "Байхгүй"}</div>
      </div>
    </div>
  );
};

export default BuildingDetails;
