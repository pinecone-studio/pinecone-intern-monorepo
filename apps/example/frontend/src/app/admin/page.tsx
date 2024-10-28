"use client";
import { SalesBarChart } from "@/components/admin";
import { FaDollarSign, FaRegClipboard } from "react-icons/fa6";

export default function Admin() {
  return (
    <div className="flex gap-6 w-full mx-6">
      <div className="flex-1">
        <div className="h-36 flex flex-col justify-between bg-white my-8 rounded-xl px-6 py-4">
          <div className="font-semibold flex items-center gap-2">
            <FaDollarSign />
            Орлого
          </div>
          <h3 className="font-bold text-4xl">235,000₮</h3>
          <p className="text-gray-500 text-sm">Өнөөдөр</p>
        </div>
        <div className="h-96 bg-green-200"></div>
      </div>
      <div className="flex-1">
        <div className="h-36 flex flex-col justify-between bg-white my-8 rounded-xl px-6 py-4">
          <div className="font-semibold flex items-center gap-2">
            <FaRegClipboard />
            Захиалга
          </div>
          <h3 className="font-bold text-4xl">58</h3>
          <p className="text-gray-500 text-sm">Өнөөдөр</p>
        </div>
        <SalesBarChart />
      </div>
    </div>
  );
}
