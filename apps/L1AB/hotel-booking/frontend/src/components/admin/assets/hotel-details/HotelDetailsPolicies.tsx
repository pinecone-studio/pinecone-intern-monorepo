import React from 'react';
export const HotelDetailsPolicies = () => {
  return (
    <div data-testid="HotelDetailsPolicies">
      <h3 className="text-lg font-semibold">Policies</h3>

      <div className="border-t w-full my-6"></div>

      <div className="space-y-8 text-sm">
        <div className="w-full">
          <div className="flex-1 flex justify-between ">
            <div className="flex flex-col w-[368px]">
              <h3 className="mb-2 font-semibold text-lg">Check in</h3>
              <div className="flex flex-col">
                <p className="">Check-in start time: noon; </p>
                <p>Check-in end time: 5:30 AM</p>
              </div>

              <p>Minimum check-in age: 16</p>
            </div>

            <div className="flex flex-col w-[368px]">
              <h3 className="mb-2 font-semibold text-lg">Check in</h3>
              <div className="flex flex-col">
                <p className="">Check-in start time: noon; </p>
                <p>Check-in end time: 5:30 AM</p>
              </div>

              <p>Minimum check-in age: 16</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="font-semibold text-lg">Special check-in instructions</h1>
          <p>
            This property offers transfers from the airport (surcharges may apply); guests must contact the property with arrival details before travel, using the contact information on the booking
            confirmation
          </p>
          <p>Front desk staff will greet guests on arrival</p>
          <p>This property does not offer after-hours check-in</p>
        </div>

        <div className="space-y-2">
          <h1 className="font-semibold text-lg">Access methods</h1>
          <p>Staffed front desk</p>
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">Pets</h1>

          <p>No pets or service animals allowed</p>
        </div>

        <div className="space-y-2">
          <h1 className="font-semibold text-lg">Children and extra beds</h1>
          <p>Children are welcome</p>
          <p>Cribs (infant beds) are not available</p>
        </div>
      </div>
    </div>
  );
};
