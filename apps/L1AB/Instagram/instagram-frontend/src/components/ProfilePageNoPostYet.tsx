import { Camera } from 'lucide-react';

export const ProfilePageNoPostYet = () => {
  return (
    <div className="flex flex-col items-center mt-[64px] gap-5" data-testId="profilePageNoPostYet">
      <div className="flex flex-col gap-4 items-center">
        <div className="p-[25px] rounded-full border-2 border-[#09090B]">
          <Camera size={40} strokeWidth={1.5} />
        </div>
        <h1 className="text-[30px] font-semibold leading-9 tracking-[-0.75px]">No Post Yet</h1>
      </div>
    </div>
  );
};
