import React from 'react';
export const HotelDetailsPolicies2 = () => {
  return (
    <div data-testid="HotelDetailsPolicies2" className="text-sm">
      <h3 className="text-lg font-semibold">Policies</h3>

      <div className="border-t w-full my-6"></div>

      <div className="w-full">
        <h3 className="mt-2 font-semibold text-lg">Optional extras</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          <li>Fee for buffet breakfast: approximately USD 20 for adults and USD 10 for children</li>
          <li>Airport shuttle fee: USD 65.00 per vehicle (roundtrip)</li>
        </ul>
        <p className="mt-2">The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change.</p>
      </div>

      <div>
        <h1 className="font-semibold text-lg">You need to know</h1>
        <p>Extra-person charges may apply and vary depending on property policy</p>
        <p>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</p>
        <p>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</p>
        <p>This property accepts credit cards and cash</p>
        <p>Safety features at this property include a fire extinguisher, a security system, and a first aid kit</p>
      </div>

      <div>
        <h1 className="font-semibold text-lg">We should mention</h1>
        <p>No pets and no service animals are allowed at this property</p>
      </div>
    </div>
  );
};
