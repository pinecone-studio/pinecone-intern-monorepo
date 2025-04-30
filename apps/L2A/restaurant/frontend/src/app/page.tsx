'use client';
import Link from 'next/link';
import HomeBody from './_features/HomeBody';
import { Button } from '@/components/ui/button';
import HomeMain from './_features/HomeMain';

const Page = () => {
  return (
    <div className="flex justify-between">
      <HomeBody />
      <HomeMain />
      <Link href={'/login'}>
        <Button>sign in</Button>
      </Link>
    </div>
  );
};

export default Page;
