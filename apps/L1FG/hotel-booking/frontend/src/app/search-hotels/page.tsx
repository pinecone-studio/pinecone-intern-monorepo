'use client';

import { SearchResultPage } from '@/features/user/SearchresultPage';
import { Suspense } from 'react';

const SearchHotels = () => {
  return (
    <main>
      <Suspense>
        <SearchResultPage />
      </Suspense>
    </main>
  );
};

export default SearchHotels;
