import { ChevronDown, ChevronUp } from 'lucide-react';
import { JcbIconBig } from '../ui/svg/JcbIconBig';
import { VisaIconBig } from '../ui/svg/VisaIconBig';
import { MasterCardIconBig } from '../ui/svg/MasterCardIconBig';
import { AmericanExpressBig } from '../ui/svg/AmericanExpressBig';

export const AboutProperty = () => {
  return (
    <div className="w-full container px-[60px] py-8 flex flex-col mx-auto items-start gap-8">
      <div className='container px-10'>
        <div className="w-full flex gap-[80px] justify-between">
          <strong className="text-2xl font-semibold font-Inter leading-8 ">About this Property</strong>
          <div className="w-full max-w-[736px] gap-[40px]">
            <div className="flex flex-col gap-2">
              <strong className="text-xl font-semibold  font-Inter leading-7">Flower Hotel Ulaanbaatar</strong>
              <p className="text-sm font-normal font-Inter leading-5">Upscale hotel located in Downtown Ulaanbaatar</p>
            </div>
            <p className="text-sm font-normal font-Inter leading-5 mt-3">
              Consider a stay at Flower Hotel Ulaanbaatar and take advantage of a coffee shop/cafe, dry cleaning/laundry services, and a bar. Treat yourself to a massage at the onsite spa. Be sure to
              enjoy Mongolian cuisine at one of the 4 on-site restaurants. In addition to a gym and a business center, guests can connect to free in-room WiFi.
            </p>
            <div className="text-sm font-normal font-Inter leading-5 mt-3">
              <p>Additional perks include</p>
              <ul className="list-disc list-inside ">
                <li>Free self parking</li> <li>Buffet breakfast (surcharge), a roundtrip airport shuttle (surcharge), and a front-desk safe</li>
                <li>A banquet hall, newspapers in the lobby, and concierge services</li> <li> Guest reviews speak highly of the helpful staff</li>
              </ul>
              <p>Room features </p> <p>All 180 rooms boast comforts such as premium bedding and bathrobes, in addition to perks like free WiFi and safes.</p>
              <p>Other conveniences in all rooms include: </p>
              <ul className="list-disc list-inside ">
                <li>Rainfall showers, tubs or showers, and free toiletries </li> <li>TVs with satellite channels</li> <li>Electric kettles, ceiling fans, and daily housekeeping </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <strong className="text-xl font-600 font-Inter leading-7">Languages</strong> <p className="text-sm font-normal font-Inter leading-5">English, Japanese, Mongolia, Russian</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between gap-[80px] mt-20">
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
                This property offers transfers from the airport (surcharges may apply); guests must contact the property with arrival details before travel, using the contact information on the
                booking confirmation
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
        <div className="w-full flex justify-between gap-[80px] mt-24">
          <h3 className="text-2xl font-semibold font-Inter leading-8">Important information</h3>
          <div className="w-full max-w-[736px] gap-[40px]">
            <div className="flex flex-col gap-3">
              <h4 className="text-xl font-semibold leading-7 font-Inter">Optional extras</h4>
              <ul className="list-disc list-inside text-sm font-normal leading-5 font-Inter">
                <li>Fee for buffet breakfast: approximately USD 20 for adults and USD 10 for children</li> <li>Airport shuttle fee: USD 65.00 per vehicle (roundtrip) </li>
              </ul>
              <p className="text-sm font-normal leading-5 font-Inter">The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change.</p>
            </div>
            <div className="flex flex-col gap-2 mt-12">
              <h4 className="text-xl font-semibold leading-7 font-Inter">You need to know</h4>
              <div className="flex flex-col text-sm font-normal leading-5 font-Inter gap-3">
                <p>Extra-person charges may apply and vary depending on property policy</p>
                <p>Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges</p>
                <p>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</p>
                <p>This property accepts credit cards and cash </p> <p>Safety features at this property include a fire extinguisher, a security system, and a first aid kit</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-12">
              <h4 className="text-xl font-semibold leading-7 font-Inter">We should mention</h4>
              <p className="text-sm font-normal leading-5 font-Inter">No pets and no service animals are allowed at this property</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between gap-[80px] mt-24">
          <h4 className="text-2xl font-semibold font-Inter leading-8">Frequently asked questions</h4>
          <div className="w-full max-w-[736px] gap-[40px]">
            <div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
              <p>Is Flower Hotel Ulaanbaatar pet-friendly?</p> <ChevronDown className="w-[16px] h-[16px]" />
            </div>
            <div className="flex flex-col  gap-2">
              <div className="flex justify-between items-center  text-base font-medium font-Inter leading-6 py-2">
                <p>How much is parking at Flower Hotel Ulaanbaatar?</p> <ChevronUp className="w-[16px] h-[16px]" />
              </div>
              <p className="border-b-[1px] text-sm font-normal leading-5 font-Inter py-2">Self parking is free at this property.</p>
            </div>
            <div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
              <p> What time is check-in at Flower Hotel Ulaanbaatar?</p> <ChevronDown className="w-[16px] h-[16px]" />
            </div>
            <div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
              <p> What time is check-out at Flower Hotel Ulaanbaatar?</p> <ChevronDown className="w-[16px] h-[16px]" />
            </div>
            <div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
              <p> Does Flower Hotel Ulaanbaatar provide a shuttle to the airport?</p> <ChevronDown className="w-[16px] h-[16px]" />
            </div>
            <div className="flex justify-between items-center  border-b-[1px] py-4 text-base font-medium font-Inter leading-6">
              <p> Where is Flower Hotel Ulaanbaatar located?</p> <ChevronDown className="w-[16px] h-[16px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
