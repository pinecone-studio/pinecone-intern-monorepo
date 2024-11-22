import React from 'react';
export const HotelDetailsMock2 = () => {
  return (
    <div className="flex justify-between mt-8 mb-8 ">
      <h3 className="font-semibold text-2xl w-[264px]">Policies</h3>
      <div className="flex flex-col space-y-10 w-[736px]">
        <div className="flex">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-xl">Check in</h4>
            <div className="text-sm flex flex-col gap-2 pr-[7px]">
              <p>Check-in start time: noon; Check-in end time: 5:30 AM</p>
              <p>Minimum check-in age: 16</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-xl">Check in</h4>
            <div className="text-sm flex flex-col gap-2 ">
              <p className="">Check-in start time: noon; Check-in end time: 5:30 AM</p>
              <p>Minimum check-in age: 16</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-xl">Special check-in instructions</h4>
          <p className="text-sm">
            This property offers transfers from the airport (surcharges may apply); guests must contact the property with arrival details before travel, using the contact information on the booking
            confirmation
          </p>

          <p className="text-sm">Front desk staff will greet guests on arrival</p>
          <p className="text-sm">This property does not offer after-hours check-in</p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-xl">Access methods</h4>
          <p className="text-sm">Staffed front desk</p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-xl">Pets</h4>
          <p className="text-sm">No pets or service animals allowed</p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-xl">Children and extra beds</h4>
          <p className="text-sm">Children are welcome</p>
          <p className="text-sm">Cribs (infant beds) are not available</p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-xl">Property payment types</h4>?
        </div>
      </div>
    </div>
  );
};
