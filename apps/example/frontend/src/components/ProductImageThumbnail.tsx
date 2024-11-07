import Image from 'next/image';

export interface ImageViewerProps {
  images: string[];
  selectedImage: string | null;
  setSelectedImage: (_image: string) => void;
}

const ProductImageThumbnails = ({ images, selectedImage, setSelectedImage }: ImageViewerProps) => (
  <div className="h-[640px] top-16">
    <div className="my-36 gap-2 grid" data-cy="Product-Details-Images">
      {images.map((image, index) => (
        <div
          className={`relative w-[70px] h-[70px] rounded-md cursor-pointer ${selectedImage === image ? 'border-2 border-black' : 'border border-gray-300'}`}
          key={index}
          onClick={() => setSelectedImage(image)}
        >
          <Image src={image} alt={`Product Image ${index + 1}`} className="rounded-md object-cover" fill />
        </div>
      ))}
    </div>
  </div>
);

export default ProductImageThumbnails;
