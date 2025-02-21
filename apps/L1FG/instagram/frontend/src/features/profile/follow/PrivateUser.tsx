import { Buttons } from '../../../components/profile/isOwnerId/Buttons';
import { GetUserTogetherQuery } from '@/generated';
import { Private } from '../../../components/profile/privateUser/Private';

export const PrivateUser = ({ data, userId }: { data: GetUserTogetherQuery; userId: string }) => {
  return (
    <div data-testid="private">
      <div className="py-3 flex px-4 gap-5 sm:gap-20 ml-[50px] justify-start ">
        <div
          style={{ backgroundImage: `url(${data?.getUserTogether?.user?.profileImage || './images/profilePic.png'})`, backgroundPosition: 'center' }}
          className=" bg-cover w-[80px] h-[80px] md:w-[150px] md:h-[150px] object-cover rounded-full"
        ></div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <p className="text-[20px] font-medium">{data?.getUserTogether?.user?.userName}</p>

            <Buttons data={data} userId={userId as string} />
          </div>

          <div>
            <div className="flex gap-11">
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
