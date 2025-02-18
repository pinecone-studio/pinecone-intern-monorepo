import Image from 'next/image';
import { NoImageIcon } from '../svg';
import { ImagesDialog } from '../ui/dialog';
import { HotelImagesProps } from '../add-hotel/type';

export const Images = ({ images, setImages, handleEditHotelImages }: HotelImagesProps) => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col px-6 pt-4 pb-6 gap-4">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Images</p>
        <ImagesDialog images={images} setImages={setImages} handleEditHotelImages={handleEditHotelImages} />
      </div>
      {images?.[0] ? (
        <div className="w-full flex flex-col gap-1">
          <div className="relative w-full h-[264px] rounded-sm overflow-hidden">
            <Image src={images[0]} alt="Hotel Image" width={352} height={264} className="rounded-md w-full h-full object-cover" />
          </div>
          {images?.length > 1 && (
            <div className="w-full grid grid-cols-2 grid-rows-2 gap-1 mt-1">
              {images?.slice(1, 5).map((img, index) => (
                <div key={index} className="relative w-full h-[130px] rounded-sm overflow-hidden">
                  <Image src={img} alt={`Hotel Image ${index + 1}`} width={174} height={130} className="rounded-md w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-8">
          <NoImageIcon data-testid="no-image-icon" />
          <div className="flex flex-col gap-1 items-center">
            <p className="text-[#09090B] font-Inter text-sm font-medium text-center">No Photos Uploaded</p>
            <p className="text-[#71717A] font-Inter text-sm font-normal text-center">Add photos of your rooms, amenities, or property to showcase your hotel.</p>
          </div>
        </div>
      )}
    </div>
  );
};
