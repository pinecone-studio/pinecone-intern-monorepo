'use client';

import { useRouter } from 'next/navigation';

export const ForbiddenComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-6">Access Denied</h2>
      <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
      <a href="/" className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-lg">
        Go Back Home
      </a>
    </div>
  );
};
