import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Story = () => {
  return (
    <div className="w-screen h-screen bg-[#18181B] p-6">
      <div className="flex justify-between">
        <div className="text-white text-xl font-semibold">Instagram</div>
        <div className="text-white text-xl cursor-pointer">x</div>
      </div>

      <div className="flex items-center gap-14 pt-6">
        <div className="w-[245px] h-[433px] bg-blue-900 flex items-center justify-center rounded-xl">
          <div className="w-[106px] h-[104px] flex flex-col justify-between items-center">
            <div className="w-14 h-14 bg-yellow-900 rounded-full"></div>

            <p className="text-white">name</p>

            <p className="text-gray-400">time</p>
          </div>
        </div>
        <div className="w-[245px] h-[433px] bg-blue-900 flex items-center justify-center rounded-xl">
          <div className="w-[106px] h-[104px] flex flex-col justify-between items-center">
            <div className="w-14 h-14 bg-yellow-900 rounded-full"></div>

            <p className="text-white">name</p>

            <p className="text-gray-400">time</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <ChevronLeft />
          </button>

          <div className="w-[522px] h-[926px] bg-gray-400 rounded-xl relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{}} />
          </div>

          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <ChevronRight />
          </button>
        </div>

        <div className="w-[245px] h-[433px] bg-blue-900 flex items-center justify-center rounded-xl">
          <div className="w-[106px] h-[104px] flex flex-col justify-between items-center">
            <div className="w-14 h-14 bg-yellow-900 rounded-full"></div>
            <p className="text-white">name</p>
            <p className="text-gray-400">time</p>
          </div>
        </div>

        <div className="w-[245px] h-[433px] bg-blue-900 flex items-center justify-center rounded-xl">
          <div className="w-[106px] h-[104px] flex flex-col justify-between items-center">
            <div className="w-14 h-14 bg-yellow-900 rounded-full"></div>
            <p className="text-white">name</p>
            <p className="text-gray-400">time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
