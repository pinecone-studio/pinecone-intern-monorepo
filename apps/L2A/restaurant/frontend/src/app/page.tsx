'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HomeMain from './_features/HomeMain';

const Page = () => {
  return (
    <div>
      <div className="flex justify-between">
        <HomeMain />
        <Link href={'/login'}>
          <Button>sign in</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
