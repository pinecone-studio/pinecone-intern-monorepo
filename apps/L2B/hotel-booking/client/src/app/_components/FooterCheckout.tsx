import Link from 'next/link';

export const FooterCheckout = () => {
  return (
    <div className="w-[640px] h-[112px] mx-10 flex flex-col gap-5">
      <Link href={'/'}>
        <div className=" flex gap-2 items-center ">
          <div className="w-4 h-4 rounded-full bg-[#09090B]"></div>
          <span className="font-medium text-[18px] color-[#09090B]">Pedia</span>
        </div>
      </Link>
      <p className="text-[14px] font-normal ">
        Some hotels require you to cancel more than 24 hours before check-in. Details on site. <br />1 All rights reserved. <br />
        Pedia and the Pedia logo are trademarks or registered trademarks of Pedia, LP in the United <br />
        States and/or other countries. All other trademarks are the property of their respective owners.
      </p>
    </div>
  );
};
