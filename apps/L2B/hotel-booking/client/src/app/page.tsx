'use client';

import Card from './_components/Card/Page';
import { Footer } from './_components/Footer';
import Header from './_components/Header';

const Page = () => {
  return (
    <div className="flex flex-col gap-5">
      <Header />
      <main>
        <div></div>
        <Card />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
