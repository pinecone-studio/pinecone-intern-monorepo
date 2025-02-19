import { Camera } from 'lucide-react';

const NoPostsYet = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-6 p-2" data-testid="profile-hover-empty-post">
      <div className="flex flex-col justify-center items-center">
        <div className="rounded-full border-2 border-black h-16 w-16 flex justify-center items-center" aria-label="Camera Icon">
          <Camera className="h-10 w-10 " />
        </div>
        <h2 className="font-semibold text-base">No posts yet</h2>
      </div>
    </div>
  );
};

export default NoPostsYet;
