import { VisaIconBig } from '../ui/svg/VisaIconBig';
import { MasterCardIconBig } from '../ui/svg/MasterCardIconBig';
import { AmericanExpressBig } from '../ui/svg/AmericanExpressBig';
import { JcbIconBig } from '../ui/svg/JcbIconBig';

export const Policies = () => {
  return (
    <div className="w-full flex justify-between gap-[80px]">
      <h3 className="text-2xl font-semibold font-Inter leading-8">Policies</h3>
      <div className="w-full max-w-[736px] gap-10">
        <div className="flex">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold font-Inter leading-7">Check-in</h4>
            <p className="text-sm font-normal leading-5 font-Inter">Check-in start time: noon; Check-in end time: 5:30 AM</p>
            <p className="text-sm font-normal leading-5 font-Inter">Minimum check-in age: 16</p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-semibold font-Inter leading-7">Check-in</h4> <p>Check-in start time: noon; Check-in end time: 5:30 AM</p> <p>Minimum check-in age: 16</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-12">
          <h4 className="text-xl font-semibold leading-7 font-Inter">Special check-in instructions</h4>
          <p className="text-sm font-normal leading-5 font-Inter">
            This property offers transfers from the airport (surcharges may apply); guests must contact the property with arrival details before travel, using the contact information on the booking
            confirmation
          </p>
          <p>Additional perks include</p> <p>This property doesn&#39;t offer after-hours check-in</p>
        </div>
        <div className="flex flex-col gap-2 mt-12">
          <p className="text-xl font-semibold leading-7 font-Inter">Access methods</p> <p className="text-sm font-normal leading-5 font-Inter">Staffed front desk</p>
        </div>
        <div className="flex flex-col gap-2 mt-12">
          <p className="text-xl font-semibold leading-7 font-Inter">Pets</p> <p className="text-sm font-normal leading-5 font-Inter">Staffed front desk</p>
        </div>
        <div className="flex flex-col gap-2 mt-12">
          <p className="text-xl font-semibold leading-7 font-Inter">Children and extra beds</p> <p className="text-sm font-normal leading-5 font-Inter">Children are welcome</p>
          <p className="text-sm font-normal leading-5 font-Inter">Cribds (infant beds) are not available</p>
        </div>
        <div className="flex flex-col gap-2 mt-12">
          <p className="text-xl font-semibold leading-7 font-Inter">Property payment types</p>
          <div className="flex gap-2">
            <JcbIconBig /> <VisaIconBig /> <MasterCardIconBig /> <AmericanExpressBig />
          </div>
        </div>
      </div>
    </div>
  );
};
