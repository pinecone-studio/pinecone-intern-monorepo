'use client';

import OrderPageComponent from '@/components/order/OrderPageComponent';
import { useEffect, useState } from 'react';

function Notification() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <OrderPageComponent />;
}
export default function Page() {
  return (
    <div>
      <OrderPageComponent />
    </div>
  );
}
