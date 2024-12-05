import { Lock } from 'lucide-react';

const ProfilePagePrivate = () => {
  return (
    <div className="flex justify-center mt-8 gap-5">
      <div className="w-[52px] h-[52px] rounded-full border-[1.5px] border-[#09090B] flex justify-center items-center">
        <Lock strokeWidth={1.5} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold leading-6 text-[#09090B]" data-testId="private">
          This account is private
        </h2>
        <p className="text-[#71717A] font-light">Follow to see their photos and videos</p>
      </div>
    </div>
  );
};

export default ProfilePagePrivate;
