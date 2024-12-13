'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  pathname == '/' && router.push('/home');

  return <div></div>;
};

export default Page;
