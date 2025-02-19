import EmptyFollowing from '@/components/profile/follow/EmptyFollowing';
import Followers from '@/features/profile/follow/Followers';
import FollowersEmpty from '@/components/profile/follow/FollowersEmpty';
import Following from '@/features/profile/follow/Following';
import { Buttons } from '@/components/profile/isOwnerId/Buttons';
import { GetUserTogetherQuery } from '@/generated';
import { IconPostSavedTag } from './comment/IconPostSavedTag';

export const UserProfile = ({ data, userId }: { data: GetUserTogetherQuery; userId: string }) => {
  return (
    <>
      <div className="py-3 flex px-4 gap-5 sm:gap-20 max-w-7xl justify-start md:justify-center" data-testid="user-profile">
        <div
          style={{ backgroundImage: `url(${data?.getUserTogether?.user?.profileImage || './images/profilePic.png'})`, backgroundPosition: 'center' }}
          className=" bg-cover w-[80px] h-[80px] md:w-[150px] md:h-[150px] object-cover rounded-full"
        ></div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 md:flex-row ">
            <p className="text-[20px] font-medium">{data?.getUserTogether?.user?.userName}</p>

            <Buttons userId={userId as string} data={data} />
          </div>

          <div className="hidden md:block">
            <div className="flex gap-11">
              <div className="flex gap-1">
                <p className="text-base font-semibold">{data?.getUserTogether?.user?.postCount}</p>
                <p className="text-base font-normal">posts</p>
              </div>

              {data?.getUserTogether?.user?.followerCount ? (
                <Followers userId={userId as string}>
                  <div className="flex gap-1" data-testid="profile-followers">
                    <p className="text-base font-semibold">{data?.getUserTogether?.user?.followerCount}</p>
                    <p className="text-base font-normal">followers</p>
                  </div>
                </Followers>
              ) : (
                <FollowersEmpty>
                  <div className="flex gap-1" data-testid="profile-followers-empty">
                    <p className="text-base font-semibold">0</p>
                    <p className="text-base font-normal">followers</p>
                  </div>
                </FollowersEmpty>
              )}

              {data?.getUserTogether?.user?.followingCount ? (
                <Following userId={userId as string}>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">{data?.getUserTogether?.user?.followingCount}</p>
                    <p className="text-base font-normal">following</p>
                  </div>
                </Following>
              ) : (
                <EmptyFollowing>
                  <div className="flex gap-1">
                    <p className="text-base font-semibold">0</p>
                    <p className="text-base font-normal">following</p>
                  </div>
                </EmptyFollowing>
              )}
            </div>
          </div>
          <div className="md:block hidden">
            <div className="flex flex-col ">
              <p className="text-base font-semibold">{data?.getUserTogether?.user?.fullName}</p>
              <p className="text-xs font-medium text-[#71717A]">{data?.getUserTogether?.user?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <IconPostSavedTag userId={userId as string} />
    </>
  );
};
