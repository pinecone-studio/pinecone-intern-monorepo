'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const authenticate = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) {
    redirect('/login');
  }
};
