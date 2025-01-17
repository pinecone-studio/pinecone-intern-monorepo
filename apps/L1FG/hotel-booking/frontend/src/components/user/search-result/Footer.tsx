import { PhoneIcon } from 'lucide-react';
import { JcbCardIcon } from '../svg/JcbIcon';
import { LogoIcon } from '../svg/LogoIcon';
import { MasterCardIcon } from '../svg/MasterCardIcon';
import { MessegaIcon } from '../svg/MessegaIcon';

import { HeadPhoneIcon } from '../svg/HeadPhoneIcon';
import { VisaCardIcon } from '../svg/VisaIcon';

export const Footer = () => {
  return (
    <div className="w-full flex justify-center my-[40px]">
      <div className="container max-w-[1280px] flex gap-[120px] h-[200px]">
        <div className="flex flex-col justify-between">
          <div className="w-[313px] flex flex-col gap-3">
            <LogoIcon />
            <p className="text-[14px] leading-[20px] font-[400]">© 2024 Booking Mongolia. All Rights Reserved.</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <JcbCardIcon />
              <VisaCardIcon />
              <MasterCardIcon />
              <JcbCardIcon />
            </div>
            <p className="text-[14px] leading-[20px] font-[400]">Accepted Payment Methods</p>
          </div>
        </div>
        <div className="w-[847px] flex justify-between h-full">
          <div className="w-[158px]  flex flex-col gap-3">
            <p className="text-[14px] leading-[20px] font-[400] text-[#09090B]">Contact information</p>
            <div className="flex flex-col gap-[24px]">
              <div className="flex gap-3 items-center">
                <MessegaIcon />
                <div className="flex flex-col">
                  <p className="text-[14px] leading-[20px] font-[500]">Email:</p>
                  <p className="text-[14px] leading-[20px] font-[400]">support@pedia.mn</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <PhoneIcon />
                <div className="flex flex-col">
                  <p className="text-[14px] leading-[20px] font-[500]">Phone:</p>
                  <p className="text-[14px] leading-[20px] font-[400]">+976(11)123-4567</p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <HeadPhoneIcon />
                <div className="flex flex-col">
                  <p className="text-[14px] leading-[20px] font-[500]">Customer Support:</p>
                  <p className="text-[14px] leading-[20px] font-[400]">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-[14px] leading-[20px] font-[400] w-[68px]">
            <p>Follow us</p>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
          <div className="flex flex-col gap-3 text-[14px] leading-[20px] font-[400] w-[131px]">
            <p>Policies</p>
            <p>Terms & Conditions</p>
            <p>Privacy</p>
            <p>Cookies</p>
            <p>Cancellation Policy</p>
          </div>
          <div className="flex flex-col gap-3 text-[14px] leading-[20px] font-[400] w-[90px]">
            <p>Other</p>
            <p>About us</p>
            <p>Careers</p>
            <p>Travel guides</p>
          </div>
        </div>
      </div>
    </div>
  );
};
