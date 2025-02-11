'use client';

import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <p>Ширээний QR код уншуулна уу</p>
      <Link href={'./order/1'}>
        <Image alt="QR" width={355} height={355} src={'/QR Image.png'} className="rounded-xl" />
      </Link>
    </div>
  );
};

export default Page;
