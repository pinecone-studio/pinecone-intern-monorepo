import { Separator } from '@radix-ui/react-separator';
import { Lock } from 'lucide-react';

export const Private = () => {
  return (
    <div>
      <Separator className="border w-[900px]" />
      <div className="flex flex-col gap-4" data-testid="post-empty">
        <div className="flex flex-col justify-center items-center gap-5 mt-20">
          <div className="flex justify-center items-center gap-3">
            <div className="rounded-full border-2 border-black h-20 w-20 flex justify-center items-center">
              <Lock className="h-10 w-10" />
            </div>
            <div>
              <p className="font-bold text-base">This account is private</p>
              <p className="text-gray-500">Follow to see their photos and videos.</p>
            </div>
          </div>
        </div>

        <div className="text-gray-500 text-xs flex flex-col gap-4 mt-8">
          <p className="flex justify-center">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
          <p className="flex justify-center">© 2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};
