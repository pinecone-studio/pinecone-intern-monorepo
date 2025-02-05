import React from 'react';
import Image from 'next/image';
import { Loader } from 'lucide-react';

interface ImagePreviewProps {
  images: string[];
  loadingPost: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, loadingPost }) => {
  return (
    <div className="relative flex-1" data-testid="image-container">
      {loadingPost && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10" data-testid="loading-overlay">
          <Loader className="w-10 h-10 animate-spin" data-testid="loader" />
        </div>
      )}
      <Image src={images[0]} alt="Selected image" fill className="object-cover rounded-bl-lg" priority data-testid="selected-image" />
    </div>
  );
};

export default ImagePreview;
