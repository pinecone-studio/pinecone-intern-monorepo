import { Phone } from '../svg';
import { getRatingLabel, renderStars } from '../add-hotel';
import { HotelDetailGeneralInfoDialogProps } from './type';
import { GeneralInfoDialog } from '../ui/dialog';
import { useMemo } from 'react';

const Divider = () => <div className="w-full h-[1px] bg-[#E4E4E7] my-6"></div>;

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[#71717A] font-Inter text-sm font-normal">{label}</p>
    <p className="text-[#09090B] font-Inter text-sm font-medium">{value}</p>
  </div>
);

const PhoneNumberRow = ({ phoneNumber }: { phoneNumber: string }) => (
  <div className="flex items-center gap-2">
    <Phone />
    <p className="text-[#09090B] font-Inter text-sm font-normal">{phoneNumber}</p>
  </div>
);

const RatingRow = ({ rating }: { rating: number }) => (
  <div className="w-full flex flex-col gap-1">
    <p className="text-[#71717A] font-Inter text-sm font-normal">Rating</p>
    <div className="flex items-center gap-2">
      <div className="px-[10px] py-[2px] rounded-full bg-[#2563EB]">
        <p className="text-[#FAFAFA] font-Inter text-xs font-semibold">{rating.toFixed(1)}</p>
      </div>
      <p className="text-[#09090B] font-Inter text-sm font-medium">{getRatingLabel(rating)}</p>
    </div>
  </div>
);

const StarsRow = ({ stars }: { stars: number }) => (
  <div className="w-full flex flex-col gap-1">
    <p className="text-[#71717A] font-Inter text-sm font-normal">Stars Rating</p>
    <div className="flex items-center gap-1">{renderStars(stars)}</div>
  </div>
);

export const GeneralInfo = (props: HotelDetailGeneralInfoDialogProps) => {
  const { data, name, rating, starRating, description, phoneNumber, setName, setRating, setStarRating, setDescription, setPhoneNumber, handleEditHotelGeneralInfo } = props;

  // Memoized fallback values
  const hotelName = useMemo(() => data?.name || name || '-/-', [data?.name, name]);
  const hotelPhone = useMemo(() => data?.phoneNumber || phoneNumber || '-/-', [data?.phoneNumber, phoneNumber]);
  const hotelRating = useMemo(() => Number(data?.rating ?? rating ?? 0), [data?.rating, rating]);
  const hotelStars = useMemo(() => Number(data?.starRating ?? starRating ?? 0), [data?.starRating, starRating]);
  const hotelDescription = useMemo(() => data?.description || description || '-/-', [data?.description, description]);

  const renderDialog = () => (
    <GeneralInfoDialog
      name={name}
      rating={rating}
      starRating={starRating}
      description={description}
      phoneNumber={phoneNumber}
      setName={setName}
      setRating={setRating}
      setStarRating={setStarRating}
      setDescription={setDescription}
      setPhoneNumber={setPhoneNumber}
      handleEditHotelGeneralInfo={handleEditHotelGeneralInfo}
    />
  );

  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">General Info</p>
        {renderDialog()}
      </div>
      <Divider />
      <div className="flex flex-col gap-6">
        <InfoRow label="Name" value={hotelName} />
        <div className="flex items-center gap-4">
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Phone Number</p>
            <PhoneNumberRow phoneNumber={hotelPhone} />
          </div>
          <RatingRow rating={hotelRating} />
          <StarsRow stars={hotelStars} />
        </div>
        <InfoRow label="Description" value={hotelDescription} />
      </div>
    </div>
  );
};
