import { Lock } from 'lucide-react';

const PrivateAccPreview = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-2 p-1" data-testid="profile-hover-private-acc">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-full border-2 border-black h-16 w-16 flex justify-center items-center" aria-label="Camera Icon">
          <Lock className="h-10 w-10 " />
        </div>
        <h2 className="font-semibold text-base">The account is private</h2>
        <p className="font-medium">Follow this account to see their photos and videos.</p>
      </div>
    </div>
  );
};

export default PrivateAccPreview;
