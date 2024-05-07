'use client';
import Link from 'next/link';
import { CommentsMain } from './_features';

const CommentsPage = () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'grey' }}>
      <h1>hello from CMS dashboard Comments Page</h1>
      <CommentsMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};
export default CommentsPage;
