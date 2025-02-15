import Image from 'next/image';
import { Buttons } from '../isOwnerId/Buttons';
import { GetUserTogetherQuery } from '@/generated';
import { Private } from './Private';

export const PrivateUser = ({ data, userId }: { data: GetUserTogetherQuery; userId: string }) => {
  return (
    <div data-testid="private">
      <div className="flex gap-20 ml-[72px]">
        <Image src="/images/profilePic.png" alt="Profile Picture" width={150} height={150} className="w-[150px] h-[150px] object-cover rounded-full bg-red-700" />

        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center justify-center">
            <p className="text-[20px] font-semibold">{data?.getUserTogether?.user?.userName}</p>

            <Buttons data={data} userId={userId as string} />
          </div>

          <div>
            <div className="flex gap-[32px]">
              <div className="flex gap-1">
                <p className="text-base font-semibold">{data?.getUserTogether?.user?.postCount}</p>
                <p className="text-base font-normal">posts</p>
              </div>

              <div className="flex gap-1" data-testid="profile-followers">
                <p className="text-base font-semibold">{data?.getUserTogether?.user?.followerCount}</p>
                <p className="text-base font-normal">followers</p>
              </div>

              <div className="flex gap-1">
                <p className="text-base font-semibold">{data?.getUserTogether?.user?.followingCount}</p>
                <p className="text-base font-normal">following</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-base font-semibold">{data?.getUserTogether?.user?.fullName}</p>
            <p className="text-xs font-medium text-[#71717A]">{data?.getUserTogether?.user?.bio}</p>
            <p className="text-sm font-medium text-[#2563EB]">{data.getUserTogether.user?.email}</p>
          </div>
        </div>
      </div>
      <Private />
    </div>
  );
};
