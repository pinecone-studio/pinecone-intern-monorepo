import { HomeLogo } from './icons/HomeLogo';
import { FacebookIcon } from './icons/FacebookIcon';
import { YoutubeIcon } from './icons/YoutubeIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { EmailIcon } from './icons/EmailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { CustomerSupportIcon } from './icons/CustomerSupportIcon';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="w-screen flex h-[181px] py-10 mt-20">
      <div className="max-w-[1280px] w-screen h-[101px] flex justify-between mx-auto">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-3">
            <Link href={'/'}>
              <HomeLogo />
            </Link>
            <p>© 2024 Booking Mongolia. All Rights Reserved.</p>
          </div>
          <div className="flex gap-4 items-center">
            <FacebookIcon />
            <YoutubeIcon />
            <InstagramIcon />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-3">
            <EmailIcon />
            <div>
              <label>Email:</label>
              <p>support@pedia.mn</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PhoneIcon />
            <div>
              <label>Phone:</label>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CustomerSupportIcon />
            <div>
              <label>Customer Support:</label>
              <p>Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
