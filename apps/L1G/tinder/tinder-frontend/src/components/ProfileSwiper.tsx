import TinderCard from '@/components/TinderCard';
import { UserProfile } from '@/app/page';

interface ProfileSwiperProps {
  profiles: UserProfile[];
  currentIndex: number;
  onLike: (_profileId: string) => void;
  onDislike: (_profileId: string) => void;
}

const ProfileSwiper: React.FC<ProfileSwiperProps> = ({ profiles, currentIndex, onLike, onDislike }) => {
  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return <div className="text-2xl font-bold text-gray-500 mt-20">No more profiles</div>;
  }

  return <TinderCard profile={currentProfile} onLike={() => onLike(currentProfile.id)} onDislike={() => onDislike(currentProfile.id)} />;
};

export default ProfileSwiper;
