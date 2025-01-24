import { NoImageIcon } from '../../svg';
import { ImagesDialog } from '../dialog';

export const Images = () => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col px-6 pt-4 pb-6 gap-4">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Images</p>
        <ImagesDialog />
      </div>
      <div className="flex flex-col items-center gap-4 py-8">
        <NoImageIcon />
        <div className="flex flex-col gap-1 items-center">
          <p className="text-[#09090B] font-Inter text-sm font-medium text-center">No Photos Uploaded</p>
          <p className="text-[#71717A] font-Inter text-sm font-normal text-center">Add photos of your rooms, amenities, or property to showcase your hotel.</p>
        </div>
      </div>
    </div>
  );
};
