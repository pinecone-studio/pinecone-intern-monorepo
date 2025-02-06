import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export const AmenitiesDialog = () => {
  const dataAmenities = ['Airport transfer', 'Gym', 'Non-Smoking', 'Free parking', '24/7 front desk', 'Restaurant', 'Bar', 'Spa', 'Air conditioning', 'Laundry facilities', 'Free WiFi'];

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium hover:bg-[#F4F4F5] rounded-sm transition-all duration-200">Edit</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[626px] w-full gap-6">
        <AlertDialogTitle className="font-Inter text-base font-semibold leading-4 tracking-[-0.4px]">Amenities</AlertDialogTitle>
        <div className="flex flex-col gap-2">
          <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Amenties</p>
          <div className="px-3 py-2 bg-white border border-[#E4E4E7] rounded-[6px] flex flex-wrap gap-2">
            {dataAmenities?.map((amenities, index) => {
              return (
                <p key={index} className="text-[#09090B] font-Inter text-xs font-semibold bg-[#F4F4F5] rounded-full px-[10px] py-[2px]">
                  {amenities}
                </p>
              );
            })}
          </div>
        </div>
        <div className="flex justify-between">
          <AlertDialogCancel className="px-4 py-2 bg-white rounded-[6px] ">Cancel</AlertDialogCancel>
          <AlertDialogAction className="px-4 py-2 bg-[#2563EB] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#256eeb]">Save</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
