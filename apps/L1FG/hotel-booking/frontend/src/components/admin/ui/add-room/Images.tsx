import { CiImageOff } from 'react-icons/ci';

export const Images = () => {
  return (
    <div className="w-[400px] h-[260px] border p-4  rounded-lg bg-white">
      <div className=" flex items-center justify-between ">
        <div className=" font-Inter text-[#020617] text-lg font-semibold">Images</div>
        <div className=" text-[#2563EB] text-base font-semibold ">Edit</div>
      </div>
      <div className="flex justify-center pt-12">
        <CiImageOff className="w-[24px] h-[24px]" />
      </div>
      <div className="  text-center text-[#09090B] text-lg pt-4">
        <div className="">No Photos Uploaded</div>
      </div>

      <div className=" text-center text-[#71717A] text-sm pt-1">
        <p>Add photos of your rooms, amenities, or property to showcase your hotel.</p>
      </div>
    </div>
  );
};
