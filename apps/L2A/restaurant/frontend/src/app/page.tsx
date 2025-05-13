'use client';
import Link from 'next/link';
import HomeMain from './_features/HomeMain';
import Footer from './_components/Footer';

const Page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <HomeMain />
      </div>
      <Link href={'/login'}>
        <Footer />
      </Link>
    </div>
  );
};
export default Page;
