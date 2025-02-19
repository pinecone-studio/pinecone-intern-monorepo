import { useGetFollowingSuggestionQuery } from '@/generated';
import Image from 'next/image';
import { FriendshipStatus } from '../home-post/FriendshipStatus';
import { ProfileHover } from '@/features/home-post/ProfileHover';

const FooterLinks = ['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language', 'Meta Verified'];

const HomeSuggestionCard = () => {
  const { data, loading } = useGetFollowingSuggestionQuery();
  if (loading) {
    return;
  }
  return (
    <div>
      <div className="flex justify-between text-sm gap-10">
        <p className="text-base leading-5 font-medium text-gray-500">Suggested for you</p>
      </div>
      <div className="mx-auto p-4 text-sm text-gray-500">
        <ul className="space-y-4">
          {data?.getFollowingSuggestion.map((user) => (
            <li key={user._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ProfileHover searchingUserId={user?._id}>
                  <Image width={500} height={500} src={user.profileImage} alt={user.userName} className="w-10 h-10 rounded-full" />
                </ProfileHover>
                <div>
                  <p className="font-medium text-black">{user.userName}</p>
                  <p>{user.fullName}</p>
                </div>
              </div>
              <FriendshipStatus preview={user} followStyle="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-sm" />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-xs leading-4 font-normal text-gray-500">
          <ul className="flex flex-wrap gap-1 justify-start">
            {FooterLinks.map((link, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                {link} ·
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-4 font-normal text-gray-500">© 2025 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default HomeSuggestionCard;
