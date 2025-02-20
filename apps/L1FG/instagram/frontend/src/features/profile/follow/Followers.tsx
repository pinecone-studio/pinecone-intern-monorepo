import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { GetFollowersQuery, useGetFollowersQuery } from '@/generated';
import { Separator } from '@/components/ui/separator';
import { FriendshipStatusUser } from '@/features/home-post/FriendshipStatusUser';
import { ProfileHover } from '@/features/home-post/ProfileHover';
import { useState } from 'react';

const Followers = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
  const [moreFollowersLoading, setMoreFollowersLoading] = useState(false);
  const { data, loading, fetchMore } = useGetFollowersQuery({
    variables: {
      input: {
        after: '',
        first: 5,
        searchingUserId: userId,
      },
    },
  });
  const updateQueryHandler = (prevResult: GetFollowersQuery, { fetchMoreResult }: { fetchMoreResult?: GetFollowersQuery }): GetFollowersQuery => {
    if (!fetchMoreResult) return prevResult;
    if (prevResult.getFollowers?.pageInfo?.endCursor == fetchMoreResult.getFollowers?.pageInfo?.endCursor) {
      return prevResult;
    }
    const prevEdges = prevResult.getFollowers?.edges ?? [];
    const fetchResultEdges = fetchMoreResult.getFollowers?.edges ?? [];
    return {
      getFollowers: {
        ...fetchMoreResult.getFollowers,
        edges: [...prevEdges, ...fetchResultEdges],
        pageInfo: fetchMoreResult.getFollowers?.pageInfo,
      },
    };
  };
  const handleMoreFollowers = async (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !moreFollowersLoading && data?.getFollowers.pageInfo.hasNextPage) {
      setMoreFollowersLoading(true);
      await fetchMore({
        variables: {
          input: {
            searchingUserId: userId,
            after: data?.getFollowers?.pageInfo?.endCursor,
            first: 6,
          },
        },
        updateQuery: updateQueryHandler,
      });
      setMoreFollowersLoading(false);
    }
  };
  if (loading) {
    return;
  }
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer" data-testid="following">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-[400px] p-0 flex flex-col gap-2">
        <DialogHeader>
          <div className="flex justify-between items-center px-3 py-1">
            <div></div>
            <h3 className="flex justify-center font-semibold">Followers</h3>
            <div className="flex justify-end">
              <DialogTrigger asChild>
                <div className="relative">
                  <p aria-label="Close dialog absolute">
                    <X className="cursor-pointer" />
                  </p>
                </div>
              </DialogTrigger>
            </div>
          </div>
        </DialogHeader>
        <Separator className="w-full" />
        <div className="flex justify-center px-3">
          <div className="items-center justify-center w-full relative  ">
            <Search className="absolute top-1.5 left-3 text-gray-500 h-5 w-5" />
            <input id="search" placeholder="Search" className="  h-8 pl-9  bg-gray-100 outline-none w-full rounded-lg" />
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-y-scroll px-3 mt-2" onScroll={handleMoreFollowers}>
          {data?.getFollowers?.edges.map((item) => (
            <div key={item.node.user._id} className="flex justify-between ">
              <div className=" flex gap-4">
                <ProfileHover searchingUserId={item.node.user._id}>
                  <Image src={'/images/profilePic.png'} alt="zurag" width={50} height={50} className=" object-cover rounded-full bg-red-700" />
                </ProfileHover>
                <div>
                  <ProfileHover searchingUserId={item.node.user._id}>
                    <p className="text-sm font-semibold">{item?.node.user?.userName}</p>
                  </ProfileHover>
                  <p className="text-xs font-normal text-[#71717A]">{item?.node.user?.fullName}</p>
                </div>
              </div>
              {item.node.user && (
                <FriendshipStatusUser
                  preview={item.node.user}
                  requestStyle="flex gap-2"
                  removeStyle="bg-[#EFEFEF] hover:bg-[#C7C7C7] h-[36px] px-5 rounded-lg font-semibold text-sm"
                  followStyle="bg-[#0095F6] hover:bg-[#2563EB] h-[36px] px-5 text-white rounded-lg font-semibold text-sm"
                  requestedStyle="bg-[#EFEFEF] hover:bg-[#C7C7C7] h-[36px] w-[86px] rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Followers;
