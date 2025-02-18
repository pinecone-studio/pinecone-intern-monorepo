'use client';
import { CheckoutFooter } from '@/components/user/check-out/CheckoutFooter';
import { CheckOutMain } from '@/components/user/check-out/CheckOutMain';
import { NavigationWhite } from '@/components/user/main/NavigationWhite';

const CheckOut = () => {
  return (
    <main>
      <NavigationWhite />
      <CheckOutMain />
      <CheckoutFooter />
    </main>
  );
};
export default CheckOut;
