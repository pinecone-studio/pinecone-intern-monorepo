import { HeadphonesIcon, MailIcon, PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-screen py-10 flex justify-center ">
      <div className="max-w-[1135px] h-[200px] flex gap-[120px] text-[14px] m-auto">
        <div className="flex flex-col ">
          <Link href={'/'}>
            <div className=" flex gap-2 items-center ">
              <div className="w-4 h-4 rounded-full bg-[#09090B]"></div>
              <span className="font-medium text-[18px] color-[#09090B]">Pedia</span>
            </div>
          </Link>
          <p>© 2024 Booking Mongolia. All Rights Reserved</p>
          <Image width={250} height={200} alt="" src="/payment.png" className="mt-8" />
        </div>
        <div className=" flex flex-col gap-3 w-[158px] h-40 ">
          <p>Contact Information</p>
          <p className="flex gap-3 ">
            <MailIcon className="mt-2" />
            Email: support@pedia.mn
          </p>
          <p className="flex gap-3  ">
            <PhoneIcon className="mt-2" />
            Phone: +976 (11) 123-4567
          </p>
          <p className="flex gap-3 ">
            <HeadphonesIcon className="mt-2" />
            Customer Support: Available 24/7
          </p>
        </div>
        <div className="flex flex-col gap-3 w-17 h-37">
          <p>Follow us</p>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>Youtube</p>
        </div>
        <div className="flex flex-col gap-3  h-[148px] ">
          <p>Policies</p>
          <p>Terms & Conditions</p>
          <p>Privacy</p>
          <p>Cookies</p>
          <p>Cancellation Policy</p>
        </div>
        <div className="flex flex-col gap-3 w-[90px] h-29 ">
          <p>Other</p>
          <p>About us</p>
          <p>Careers</p>
          <p>Travel guides</p>
        </div>
      </div>
    </footer>
  );
};
