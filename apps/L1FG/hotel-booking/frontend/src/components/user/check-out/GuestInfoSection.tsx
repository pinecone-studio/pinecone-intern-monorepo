'use client';

import { WhosCheckingIn } from '../../../features/user/check-out/WhoCheckingIn';
import { ContactInformation } from '../../../features/user/check-out/ContactInformation';
import { CardDetail } from '../../../features/user/check-out/CardDetail';
import { JcbCardIcon, MasterCardIcon } from '../ui/svg';
import { AmericanExpressCard, VisaCard } from '@/components/admin/svg';
import { CheckOutRoomCard } from './CheckOutRoomCard';

export const GuestInfoSection = () => {
  return (
    <div className="flex justify-center w-screen ">
      <div className="flex gap-16">
        <div className="w-[581px]">
          <ol className="list-decimal list-inside text-xl font-semibold leading-7 text-foreground flex flex-col gap-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <li>Who&#39;s checking in</li>
                <p className="leading-[20px] text-sm text-muted-foreground">
                  Please tell us the name of the guest staying at the hotel as it appears on the ID that they&#39;ll present at check-in. If the guest has more than one last name, please enter them
                  all.
                </p>
              </div>
              <WhosCheckingIn />
            </div>
            <div className="border-b mt-4 mb-4"></div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <li>Contact Information</li>
              </div>
              <ContactInformation />
            </div>
            <div className="border-b py-4"></div>
            <div className="flex flex-col gap-8">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <li>Reservation card detail</li>
                  <p className="leading-[20px] text-sm text-muted-foreground">Safe, secure transactions. Your personal information is protected</p>
                </div>
                <div className="flex gap-1">
                  <button className="w-[24px] h-[16px] hover:ring-2 hover:ring-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <JcbCardIcon width={24} height={16} />
                  </button>
                  <button className="w-[24px] h-[16px] hover:ring-2 hover:ring-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <VisaCard width={24} height={16} />
                  </button>
                  <button className="w-[24px] h-[16px] hover:ring-2 hover:ring-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <MasterCardIcon width={24} height={16} />
                  </button>
                  <button className="w-[24px] h-[16px] hover:ring-2 hover:ring-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <AmericanExpressCard width={24} height={16} />
                  </button>
                </div>
              </div>
              <CardDetail />
            </div>
            <div className="border-b py-4"></div>
          </ol>
          <div className="flex flex-col gap-8 pt-10">
            <div className="flex flex-col gap-4">
              <h1>Important information</h1>
              <ul className="list-disc pl-5">
                <li className="text-sm font-normal leading-5 text-foreground">
                  Guests must contact the property in advance for check-in instructions; front desk staff will greet guests on arrival. To make arrangements for check-in please contact the property
                  ahead of time using the information on the booking confirmation. If you are planning to arrive after 3:30 PM please contact the property in advance using the information on the
                  booking confirmation.
                </li>
              </ul>
              <p className="text-sm font-normal leading-5 text-foreground">
                By clicking on the button below, I confirm I have read the{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  Privacy Statement
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  Government Travel Advice
                </a>
                , and have read and accept the{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  Rules & Restrictions
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-blue-600 hover:text-blue-800">
                  Terms of Service
                </a>
                .
              </p>
            </div>
            <div className="flex justify-end">
              <button className="text-primary-foreground leading-5 text-sm font-medium bg-blue-600 rounded-[6px] py-2 px-8">Complete Booking</button>
            </div>
          </div>
        </div>
        <CheckOutRoomCard />
      </div>
    </div>
  );
};
