import { HotelImagesProps } from '@/components/admin/add-hotel/type';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export const ImagesDialog = ({ images, setImages, handleEditHotelImages }: HotelImagesProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium hover:bg-[#F4F4F5] rounded-sm transition-all duration-200">Edit</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[1160px] w-full gap-6">
        <AlertDialogTitle className="font-Inter text-base font-semibold leading-4 tracking-[-0.4px]">Images</AlertDialogTitle>
        <div className="flex ">
          <textarea
            value={images?.join(', ')}
            className="min-h-[64px] w-full resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
            onChange={(e) => setImages(e.target.value.split(',').map((item) => item.trim()))}
          />
        </div>
        <div className="flex justify-between">
          <AlertDialogCancel className="px-4 py-2 bg-white rounded-[6px] ">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEditHotelImages} className="px-4 py-2 bg-[#2563EB] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#256eeb]">
            Save
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
