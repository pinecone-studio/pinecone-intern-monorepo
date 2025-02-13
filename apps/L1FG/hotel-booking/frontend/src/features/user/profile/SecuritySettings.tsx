import { Button } from '@/components/ui/button';
import { ChevronRight, KeyIcon, MailIcon } from 'lucide-react';
import { TitleSecurity } from './TitleSecurity';

export const SecuritySettings = () => {
  return (
    <div className="flex flex-col gap-4 lg:w-[672px]  sm:w-[200px] md:w-[300px] space-y-3  ">
      <TitleSecurity />
      <div className="w-full flex justify-center">
        <div className="w-full border-[0.5px] border-[#E4E4E7]"></div>
      </div>
      <div className="flex gap-4 w-full">
        <Button className="flex w-full justify-start py-5 px-8 items-center gap-4 border" variant="outline">
          <MailIcon />
          <div className="flex flex-col items-start">
            <p className="text-sm font-semibold leading-5">Email</p>
            <p className="text-sm font-normal leading-5 text-[#71717A] ">n.shagai@pinecone.mn</p>
          </div>
        </Button>

        <Button className="flex w-full justify-between py-5 px-8 items-center gap-4 border" variant="outline">
          <div className="flex gap-4">
            <KeyIcon />
            <p className="text-md font-medium leading-5">Change password</p>
          </div>

          <div>
            <ChevronRight />
          </div>
        </Button>
      </div>
    </div>
  );
};
