import { RoomServicesDialog } from '../ui/dialog/add-room/RoomServicesDialog';
import { RoomServicesProps } from './type';

export const RoomServices = ({ key, setKey, value, setValue, handleEditRoomServices }: RoomServicesProps) => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">Room Services</p>
        <RoomServicesDialog key={key} value={value} setKey={setKey} setValue={setValue} handleEditRoomServices={handleEditRoomServices} />
      </div>
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7] "></div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-8">
          <div className="w-full flex flex-col gap-3">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Bathroom</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Accessibility</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="w-full flex flex-col gap-3">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Bathroom</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Internet</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="w-full flex flex-col gap-3">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Food and drink</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Bedroom</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="w-full flex flex-col gap-3">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Other</p>
            <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>
          </div>
        </div>
      </div>
    </div>
  );
};
