'use client';

import { ActiveZap } from '../svg';
import { GeneralInfoDialog } from '../ui/dialog/add-room/GeneralInfoDialog';

import { GeneralInfoDialogProps } from './type';

export const InfoField = ({ label, value }: { label: string; value: string }) => (
  <div className="w-full flex flex-col gap-1">
    <p className="text-[#71717A] font-Inter text-sm font-normal">{label}</p>
    <p className="text-[#09090B] font-Inter text-sm font-medium">{value || '-/-'}</p>
  </div>
);

export const RoomInfoItem = ({ value }: { value: string }) => (
  <div className="flex items-center gap-2">
    <ActiveZap />
    <p className="text-[#09090B] font-Inter text-sm font-medium">{value}</p>
  </div>
);

export const RoomInformation = ({ roomInfo }: { roomInfo: string[] }) => (
  <div className="flex flex-col gap-2">
    <p className="text-[#71717A] font-Inter text-sm font-normal">Room Information</p>
    <div className="grid grid-cols-3 gap-x-8 gap-y-3">
      {roomInfo.length > 0 ? roomInfo.map((value, index) => <RoomInfoItem key={index} value={value} />) : <p className="text-[#09090B] font-Inter text-sm font-medium">-/-</p>}
    </div>
  </div>
);

export const Divider = () => (
  <div className="py-6">
    <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
  </div>
);

export const formatPrice = (price: string | number) => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) return '-/-';
  return `${new Intl.NumberFormat('en-US').format(numericPrice)}₮`;
};

export const GeneralInfo = ({
  tax,
  bed,
  name,
  type,
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
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">General Info</p>
        <GeneralInfoDialog
          tax={tax}
          bed={bed}
          name={name}
          type={type}
          price={price}
          roomInfo={roomInfo}
          roomNumber={roomNumber}
          setTax={setTax}
          setBed={setBed}
          setName={setName}
          setType={setType}
          setPrice={setPrice}
          setRoomInfo={setRoomInfo}
          setRoomNumber={setRoomNumber}
          handleEditGeneralInfo={handleEditGeneralInfo}
        />
      </div>

      <Divider />

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-8">
          <InfoField label="Name" value={name} />
          <InfoField label="Type" value={type} />
          <InfoField label="Price per night" value={formatPrice(price)} />
        </div>

        <div className="flex items-center gap-8">
          <InfoField label="Bed" value={bed} />
          <InfoField label="Tax" value={formatPrice(tax)} />
          <InfoField label="Room number" value={roomNumber} />
        </div>

        <RoomInformation roomInfo={roomInfo} />
      </div>
    </div>
  );
};
