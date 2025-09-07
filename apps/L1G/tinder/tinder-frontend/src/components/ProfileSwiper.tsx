import type React from 'react';
import TinderCard from '@/components/TinderCard';
import type { UserProfile } from '@/app/page';
interface ProfileSwiperProps {
  profiles: UserProfile[];
  currentIndex: number;
  onLike: (_profileId: string, _profileData: UserProfile) => void;
  onDislike: (_profileId: string) => void;
}
const ProfileSwiper: React.FC<ProfileSwiperProps> = ({ profiles, currentIndex, onLike, onDislike }) => {
  const currentProfile = profiles[currentIndex];

  if (!currentProfile) {
    return <div className="text-2xl font-bold text-gray-500 mt-20">No more profiles</div>;
  }

  return <TinderCard key={currentProfile.id} profile={currentProfile} onLike={() => onLike(currentProfile.id, currentProfile)} onDislike={() => onDislike(currentProfile.id)} />;
};

export default ProfileSwiper;
