import React from 'react';
import Image from 'next/image';
import { Loader } from 'lucide-react';

interface ImagePreviewProps {
  images: string[];
  loadingPost: boolean;
}

const ImagePreviewStory: React.FC<ImagePreviewProps> = ({ images, loadingPost }) => {
  return (
    <div className="relative flex-1" data-testid="image-container-story">
      {loadingPost && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10" data-testid="loading-overlay-story">
          <Loader className="w-10 h-10 animate-spin" data-testid="loader-story" />
        </div>
      )}
      <Image src={images[0]} alt="Selected image" fill className="object-cover rounded-bl-lg" priority data-testid="selected-image-story" />
    </div>
  );
};

export default ImagePreviewStory;
