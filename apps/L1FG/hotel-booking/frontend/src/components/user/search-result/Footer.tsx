import { Headphones, MailIcon, PhoneIcon } from 'lucide-react';
import { JcbCardIcon } from '../svg/JcbIcon';
import { LogoIcon } from '../svg/LogoIcon';
import { MasterCardIcon } from '../svg/MasterCardIcon';
import { VisaCardIcon } from '../svg/VisaIcon';

export const Footer = () => {
  return (

    <main>
      <div className="container mx-auto w-full py-10">
        <div className="flex gap-[120px]">
          <div className="flex flex-col justify-between">
            <div className="w-[313px] flex flex-col gap-3">
              <LogoIcon />
              <p className="font-Inter font-normal not-italic text-sm">© 2024 Booking Mongolia. All Rights Reserved.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <JcbCardIcon />
                <VisaCardIcon />
                <MasterCardIcon />
                <JcbCardIcon />
              </div>
              <p className="font-Inter font-normal not-italic text-sm">Accepted Payment Methods</p>

            </div>
          </div>
          <div className="w-full flex items-start justify-between">
            <div className="w-[158px]  flex flex-col gap-3">
              <p className="font-Inter font-normal not-italic text-sm text-[#09090B]">Contact information</p>
              <div className="flex flex-col gap-[24px]">
                <div className="flex gap-3 items-center">
                  <MailIcon size={16} />
                  <div className="flex flex-col">
                    <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Email:</p>
                    <p className="font-Inter font-normal not-italic text-sm text-[#09090B]">support@pedia.mn</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <PhoneIcon size={16} />
                  <div className="flex flex-col">
                    <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Phone:</p>
                    <p className="font-Inter font-normal not-italic text-sm text-[#09090B]">
                      +976 <span>(11)</span> 123-4567
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <Headphones size={16} />
                  <div className="flex flex-col">
                    <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Customer Support:</p>
                    <p className="font-Inter font-normal not-italic text-sm text-[#09090B]">Available 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 font-Inter font-normal not-italic text-sm text-[#09090B] w-[68px]">
              <p className="font-Inter font-normal not-italic text-sm text-[#09090B]">Follow us</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Facebook</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Instagram</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Twitter</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Youtube</p>
            </div>
            <div className="flex flex-col gap-3 font-Inter font-normal not-italic text-sm text-[#09090B] w-[131px]">
              <p className="font-Inter font-normal not-italic text-sm text-[#09090B]">Policies</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Terms & Conditions</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Privacy</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Cookies</p>
              <p className="">Cancellation Policy</p>
            </div>
            <div className="flex flex-col gap-3 font-Inter font-normal not-italic text-sm text-[#09090B] w-[90px]">
              <p className="font-Inter font-normal not-italic text-sm text-[#09090B]">Other</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">About us</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Careers</p>
              <p className="font-Inter font-medium not-italic text-sm text-[#09090B]">Travel guides</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
