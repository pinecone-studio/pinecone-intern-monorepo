import React from 'react';

export const HotelDetailsMock3 = () => {
  return (
    <div className="flex justify-between mt-8 mb-8">
      <h3 className="font-semibold text-2xl w-[264px]">Important information</h3>
      <div className="flex flex-col space-y-10 w-[736px]">
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold text-xl ">Optional extras</h4>
          <ul className="list-disc pl-6 text-sm ">
            <li>Fee for buffet breakfast: approximately USD 20 for adults and USD 10 for children</li>
            <li>Airport shuttle fee: USD 65.00 per vehicle (roundtrip)</li>
          </ul>

          <p>The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change.</p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-xl ">You need to know</h3>
          <div className='text-sm flex flex-col gap-2'>
          <p className="text-foreground ">Extra-person charges may apply and vary depending on property policy</p>
          <p>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</p>
          <p>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</p>
          <p>This property accepts credit cards and cash</p>
          <p>Safety features at this property include a fire extinguisher, a security system, and a first aid kit</p>
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="font-semibold text-xl ">We should mention</h3>
          <p className="text-foreground text-sm ">No pets and no service animals are allowed at this property</p>
        </div>
      </div>
    </div>
  );
};
