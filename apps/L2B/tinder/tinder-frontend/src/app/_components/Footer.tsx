import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <div className="flex justify-center items-center w-full py-4 pr-24">
      <Image src={'/header.svg'} width={100} height={35} alt="footer-image" />
      <p>© Copyright 2024</p>
    </div>
  );
};

export default Footer;
