import { useGetFollowingSuggestionQuery } from '@/generated';
import { FriendshipStatus } from '../home-post/FriendshipStatus';
import { ProfileHover } from '@/features/home-post/ProfileHover';
import { ProfileOrStory } from '@/components/home-post/ProfileOrStory';
import { SuggestionProfile } from './SuggestionProfile';

const FooterLinks = ['About', 'Help', 'Press', 'API', 'Jobs', 'Privacy', 'Terms', 'Locations', 'Language', 'Meta Verified'];

const HomeSuggestionCard = () => {
  const { data, loading } = useGetFollowingSuggestionQuery();
  if (loading) {
    return;
  }
  return (
    <div className="">
      <div className="flex justify-between items-center text-sm mb-4">
        <p className="text-base font-semibold text-gray-600">Suggested for you</p>
      </div>
      <ul className="space-y-2">
        {data?.getFollowingSuggestion.map((user) => {
          const hasStoryToSee = user?.latestStoryTimestamp > user?.seenStoryTime;
          const image = user?.profileImage;
          return (
            <li key={user._id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <ProfileHover searchingUserId={user?._id}>
                  <ProfileOrStory hasStory={hasStoryToSee} urlWhenHasStory={`/stories/${user?.userName}/${user?._id}`} urlWhenNoStory={`/${user?._id}`}>
                    <SuggestionProfile hasStoryToSee={hasStoryToSee} image={image} />
                  </ProfileOrStory>
                </ProfileHover>
                <div>
                  <ProfileHover searchingUserId={user?._id}>
                    <p className="font-bold text-base text-gray-900 cursor-pointer">{user.userName}</p>
                    <p className="text-sm text-gray-500 cursor-pointer">{user.fullName}</p>
                  </ProfileHover>
                </div>
              </div>
              <FriendshipStatus
                requestedStyle="text-[11px] font-bold"
                preview={user}
                followStyle="text-[11px] font-bold text-[#0095F6] hover:text-[#1E3A8A]"
                followingStyle="text-[11px] font-bold text-black"
              />
            </li>
          );
        })}
      </ul>
      <div className="mt-6 text-xs text-gray-300 text-center border-t pt-4">
        <ul className="flex flex-wrap justify-center gap-2">
          {FooterLinks.map((link, index) => (
            <li key={index} className="hover:underline cursor-pointer inline-block">
              {link}
            </li>
          ))}
        </ul>
        <p className="mt-2">© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default HomeSuggestionCard;
