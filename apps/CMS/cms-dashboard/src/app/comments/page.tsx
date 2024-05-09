'use client';
import Link from 'next/link';
import { CommentsMain } from './_features';

const CommentsPage = () => {

  return (
    <div className='flex flex-col items-center bg-[#F7F7F8]'>
      <h1>hello from CMS dashboard Comments Page </h1>
      <CommentsMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};
export default CommentsPage;
