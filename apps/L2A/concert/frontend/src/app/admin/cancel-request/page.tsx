'use client';
import { useState } from 'react';
import TableRow from './_components/TableRow';
import TableHeader from './_feature/TableHeader';
import { requests } from './_feature/TestArray';

const itemsPerPage = 5;

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = requests.slice(start, start + itemsPerPage);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="flex flex-col w-full h-screen bg-secondary">
      <div className="flex flex-col items-center w-full h-full p-10">
        <div className="w-10/12 flex flex-col p-5">
          <div>
            <h2 className="font-medium text-lg">Хүсэлтүүд</h2>
            <p className="text-muted-foreground text-sm">Ирсэн цуцлах хүсэлтүүд</p>
          </div>
          <div className="my-6 border-b border-[#E4E4E7]" />
          <div className="bg-white rounded-md border border-[#E4E4E7]">
            <TableHeader />
            {currentItems.map((request) => (
              <TableRow key={request.id} request={request} />
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button className="px-3 py-1 border rounded disabled:opacity-50" onClick={handlePrev} disabled={currentPage === 1}>
              prev
            </button>
            <span className="flex items-center px-2 py-1 text-sm">
              {currentPage} / {totalPages}
            </span>
            <button className="px-3 py-1 border rounded disabled:opacity-50" onClick={handleNext} disabled={currentPage === totalPages}>
              next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
