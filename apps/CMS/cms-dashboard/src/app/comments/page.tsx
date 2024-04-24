'use client';

import Link from 'next/link';
import { useHelloQueryFromCommentsServiceQuery } from '../../generated';
import { CommentsMain } from './_features';

const CommentsPage = () => {
  const { data } = useHelloQueryFromCommentsServiceQuery();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'grey' }}>
      <h1>hello from CMS dashboard Comments Page</h1>
      <h1>hello from Comments Service Query {data?.helloQueryFromCommentsService}</h1>
      <CommentsMain />
      <Link href="/">
        <button>Go back to home page</button>
      </Link>
    </div>
  );
};
export default CommentsPage;
