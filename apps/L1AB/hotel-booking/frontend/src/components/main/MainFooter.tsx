import React from 'react';
import { Container } from './assets';
import { FooterLogo, HeadPhoneIcon, MailIcon, PhoneIcon } from '../icon';
import Link from 'next/link';

const FollowUsPaths = [
  { path: 'https://www.facebook.com', name: 'Facebook' },
  { path: 'https://www.instagram.com', name: 'Instagram' },
  { path: 'https://www.twitter.com', name: 'Twitter' },
  { path: 'https://www.youtube.com', name: 'YouTube' },
];
const PoliciesPaths = [
  { path: '/', name: 'Terms and Conditions' },
  { path: '/', name: 'Privacy' },
  { path: '/', name: 'Cookies' },
  { path: '/', name: 'Cancellation Policy' },
];
const OtherPaths = [
  { path: '/', name: 'About Us' },
  { path: '/', name: 'Careers' },
  { path: '/', name: 'Travel guides' },
];
export const MainFooter = () => {
  return (
    <Container backgroundColor="bg-white">
      <div className="flex justify-between py-10 text-foreground text-sm">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <FooterLogo />
            <h1>© 2024 Booking Mongolia. All Rights Reserved.</h1>
          </div>
          <div>
            <div></div>
            <p>Accepted Payment Methods</p>
          </div>
        </div>
        <div className="space-y-3">
          <h1>Contact Information</h1>
          <div className="flex flex-col gap-6">
            <Link href={'/'}>
              <div className="flex gap-3 items-center">
                <MailIcon />
                <div>
                  <h1 className="font-medium">Email:</h1>
                  <h1>support@pedia.mn</h1>
                </div>
              </div>
            </Link>
            <Link href={'/'}>
              <div className="flex gap-3 items-center">
                <PhoneIcon />
                <div>
                  <h1 className="font-medium">Phone:</h1>
                  <h1>+976 (11) 123-4567</h1>
                </div>
              </div>
            </Link>
            <Link href={'/'}>
              <div className="flex gap-3 items-center">
                <HeadPhoneIcon />
                <div>
                  <h1 className="font-medium">Customer Support:</h1>
                  <h1>Available 24/7</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Follow us</h1>
          {FollowUsPaths.map((item) => (
            <Link key={item.name} href={item.path}>
              <h2 className="font-medium">{item.name}</h2>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h1>Policies</h1>
          {PoliciesPaths.map((item) => (
            <Link key={item.name} href={item.path}>
              <h2 className="font-medium">{item.name}</h2>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h1>Other</h1>
          {OtherPaths.map((item) => (
            <Link key={item.name} href={item.path}>
              <h2 className="font-medium">{item.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};
