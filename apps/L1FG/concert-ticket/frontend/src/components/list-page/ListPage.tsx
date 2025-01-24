'use client';

import Footerr from '@/app/footer/Footer';
import Page from '@/app/search/page';
import { HeaderPart } from '@/components/header/Header';

export const ListPage = () => {
  return (
    <div>
      <HeaderPart />
      <Page />
      <Footerr />
    </div>
  );
};
