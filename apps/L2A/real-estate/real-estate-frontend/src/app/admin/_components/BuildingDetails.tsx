'use client';

import React from 'react';

const BuildingDetails = () => {
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
        <div className="py-2 border-b text-right">6</div>

        <div className="py-2 border-b">
          <span className="font-medium">Цонх:</span>
        </div>
        <div className="py-2 border-b text-right">Төмөр вакум</div>

        <div className="py-2 border-b">
          <span className="font-medium">Хаалга:</span>
        </div>
        <div className="py-2 border-b text-right">Төмөр вакум</div>

        <div className="py-2 border-b">
          <span className="font-medium">Хэдэн давхарт:</span>
        </div>
        <div className="py-2 border-b text-right">4 давхарт</div>

        <div className="py-2 border-b">
          <span className="font-medium">Барилгын давхар:</span>
        </div>
        <div className="py-2 border-b text-right">5 давхарт</div>

        <div className="py-2 border-b">
          <span className="font-medium">Шал:</span>
        </div>
        <div className="py-2 border-b text-right">Ламинат</div>

        <div className="py-2 border-b">
          <span className="font-medium">Тагт:</span>
        </div>
        <div className="py-2 border-b text-right">2 тагттай</div>

        <div className="py-2">
          <span className="font-medium">Лифт:</span>
        </div>
        <div className="py-2 text-right">Байгаа</div>
      </div>
    </div>
  );
};

export default BuildingDetails;
