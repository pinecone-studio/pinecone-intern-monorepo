import React from 'react';
import { NavigationWhite } from '@/components/user/main/NavigationWhite';
import { CancelBookingContent, FooterSmall } from '@/components/user/booking-page';

const CancelBookingPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <NavigationWhite />
      <CancelBookingContent />
      <FooterSmall />
    </main>
  );
};

export default CancelBookingPage;
