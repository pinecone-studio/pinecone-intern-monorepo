import React from 'react';
import { CheckInDialog, ViewGoogleMapsDialog, ViewPricingDialog, ViewRulesDialog } from './assets';
export const BookingDetails = () => {
  return (
    <div>
      <CheckInDialog />
      <ViewGoogleMapsDialog />
      <ViewPricingDialog />
      <ViewRulesDialog />
    </div>
  );
};
