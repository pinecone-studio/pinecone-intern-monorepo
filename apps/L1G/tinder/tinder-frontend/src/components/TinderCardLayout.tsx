import { UserProfile } from '@/app/page';
import { CardWithImageAndInfo, LikeDislikeButtons } from './TinderCardParts';

export const TinderCardLayout = ({
  profile,
  images,
  currentImageIndex,
  imageError,
  handleImageError,
  nextImage,
  prevImage,
  handleLike,
  handleDislike,
}: {
  profile: UserProfile;
  images: string[];
  currentImageIndex: number;
  imageError: boolean;
  handleImageError: () => void;
  nextImage: () => void;
  prevImage: () => void;
  handleLike: () => void;
  handleDislike: () => void;
}) => (
  <div className="flex flex-col gap-6">
    <CardWithImageAndInfo
      profile={profile}
      images={images}
      currentImageIndex={currentImageIndex}
      imageError={imageError}
      handleImageError={handleImageError}
      nextImage={nextImage}
      prevImage={prevImage}
    />
    <LikeDislikeButtons onLike={handleLike} onDislike={handleDislike} />
  </div>
);
