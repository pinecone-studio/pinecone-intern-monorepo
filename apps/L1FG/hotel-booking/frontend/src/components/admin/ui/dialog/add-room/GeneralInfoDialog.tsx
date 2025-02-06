import { GeneralInfoDialogProps } from '@/components/admin/add-room/type';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

export const GeneralInfoDialog = ({
  tax,
  bed,
  name,
  price,
  roomInfo,
  roomNumber,
  setTax,
  setBed,
  setName,
  setType,
  setPrice,
  setRoomInfo,
  setRoomNumber,
  handleEditGeneralInfo,
}: GeneralInfoDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 text-[#2563EB] font-Inter text-sm font-medium hover:bg-[#F4F4F5] rounded-sm transition-all duration-200">Edit</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[626px] w-full gap-6">
        <AlertDialogTitle className="font-Inter text-base font-semibold leading-4 tracking-[-0.4px]">General Info</AlertDialogTitle>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Name</p>
            <input
              value={name}
              type="text"
              className="bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Type</p>
            <Select onValueChange={setType}>
              <SelectTrigger className="w-full outline-none">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>All</SelectLabel>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Price per night</p>
            <input
              value={price}
              type="number"
              className="bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Bed</p>
            <input
              value={bed}
              type="number"
              className="bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setBed(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Tax</p>
            <input
              value={tax}
              type="number"
              className="bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setTax(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Room number</p>
            <input
              value={roomNumber}
              type="number"
              className="bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => {
                setRoomNumber(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[#09090B] font-Inter text-sm font-medium leading-[14px]">Room Information</p>
            <textarea
              value={roomInfo?.join(', ')}
              className="min-h-[64px] resize-none bg-white border border-[#E4E4E7] rounded-[6px] px-3 py-2 outline-none text-sm text-[#09090B] font-Inter font-normal"
              onChange={(e) => setRoomInfo(e.target.value.split(',').map((item) => item.trim()))}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <AlertDialogCancel className="px-4 py-2 bg-white rounded-[6px] ">Cancel</AlertDialogCancel>
          <AlertDialogAction className="px-4 py-2 bg-[#2563EB] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#256eeb]" onClick={handleEditGeneralInfo}>
            Save
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
