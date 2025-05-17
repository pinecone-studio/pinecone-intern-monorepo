import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="#" className="hover:text-blue-600">
          Hotels
        </Link>
        <span>&gt;</span>
        <Link href="#" className="hover:text-blue-600">
          Hotel Detail
        </Link>
        <span>&gt;</span>
        <Link href="#" className="hover:text-blue-600">
          Room Detail
        </Link>
        <span>&gt;</span>
        <span className="text-gray-700">Guest Info</span>
      </div>
    </div>
  );
};
