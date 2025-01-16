'use client';

import Link from 'next/link';

const Page = () => {
  return (
    <div>
      <Link href={'/Detail'}>
        <div>Home Page</div>
      </Link>
    </div>
  );
};

export default Page;
