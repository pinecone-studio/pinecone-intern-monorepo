'use client';
import Link from 'next/link';
import HomeBody from './_features/HomeBody';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <div className='flex justify-between'>
      <HomeBody />
      <Link href={"/login"}>
      <Button>sign in</Button>
      </Link>
    </div>
  );
};

export default Page;
