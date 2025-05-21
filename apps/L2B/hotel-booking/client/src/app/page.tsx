'use client';
import Card from './_components/Card/Page';
import { Footer } from './_components/Footer';
import Header from './_components/Header';
import { HomeHeadline } from './_components/HomeHeadline';

const Page = () => {
  return (
    <div>
      <Header bg={'blue'} />
      <main>
        <HomeHeadline />
        <Card />
      </main>
      <Footer />
    </div>
  );
};

export default Page;
