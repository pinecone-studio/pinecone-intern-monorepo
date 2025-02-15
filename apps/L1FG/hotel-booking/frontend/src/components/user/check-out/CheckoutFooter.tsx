import { LogoIcon } from '../ui/svg';

export const CheckoutFooter = () => {
  return (
    <div className="container mx-auto">
      <div className="w-full py-10 flex flex-col gap-4">
        <LogoIcon />
        <p className="max-w-[640px] font-Inter font-normal not-italic text-sm">
          Some hotels require you to cancel more than 24 hours before check-in. Details on site. 1 All rights reserved. Pedia and the Pedia logo are trademarks or registered trademarks of Pedia, LP in
          the United States and/or other countries. All other trademarks are the property of their respective owners.
        </p>
      </div>
    </div>
  );
};
