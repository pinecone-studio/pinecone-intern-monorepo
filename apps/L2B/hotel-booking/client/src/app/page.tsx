'use client';

import { useAuth } from './(main)/_context/AuthContext';
import Card from './_components/Card/Page';

const Page = () => {
  const { user } = useAuth();
  console.log('user', user);

  return (
    <div>
      <Card />
    </div>
  );
};
export default Page;
