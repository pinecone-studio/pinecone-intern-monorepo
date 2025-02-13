import { Phone } from 'lucide-react';
import { GeneralInfoDialog } from '../ui/dialog';
import { OrangeStar, Star } from '../svg';
import { HotelGeneralInfoDialogProps } from './type';

export const getRatingLabel = (rating: number | string) => {
  const numRating = Number(rating);
  if (numRating >= 9) return 'Excellent';
  if (numRating >= 8) return 'Very good';
  if (numRating >= 7) return 'Good';
  return 'None';
};

const renderStars = (starRating: number | string) => {
  const numStars = Number(starRating);
  return Array.from({ length: 5 }).map((_, index) => (index < numStars ? <OrangeStar key={index} data-testid="filled-star" /> : <Star key={index} data-testid="empty-star" />));
};

export const GeneralInfo = ({
  name,
  rating,
  starRating,
  description,
  phoneNumber,
  setName,
  setRating,
  setStarRating,
  setDescription,
  setPhoneNumber,
  handleEditHotelGeneralInfo,
}: HotelGeneralInfoDialogProps) => {
  return (
    <div className="border rounded-[8px] border-[#E4E4E7] bg-white flex flex-col p-6">
      {/* Header with Dialog */}
      <div className="flex justify-between items-center">
        <p className="text-[#09090B] font-Inter text-lg font-semibold">General Info</p>
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
      </div>

      {/* Divider */}
      <div className="py-6">
        <div className="w-full h-[1px] bg-[#E4E4E7]"></div>
      </div>

      {/* Hotel Details */}
      <div className="flex flex-col gap-6">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Name</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">{name || '-/-'}</p>
        </div>

        {/* Phone Number, Rating & Stars */}
        <div className="flex items-center">
          {/* Phone Number */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Phone Number</p>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <p className="text-[#09090B] font-Inter text-sm font-medium">{phoneNumber || '-/-'}</p>
            </div>
          </div>

          {/* Rating */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Rating</p>
            <div className="flex items-center gap-2">
              <div className="px-[10px] py-[2px] rounded-full bg-[#2563EB]">
                <p className="text-[#FAFAFA] font-Inter text-xs font-semibold">{rating || '0.0'}</p>
              </div>
              <p className="text-[#09090B] font-Inter text-sm font-medium">{getRatingLabel(rating)}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="w-full flex flex-col gap-1">
            <p className="text-[#71717A] font-Inter text-sm font-normal">Stars Rating</p>
            <div className="flex items-center gap-1">{renderStars(starRating)}</div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <p className="text-[#71717A] font-Inter text-sm font-normal">Description</p>
          <p className="text-[#09090B] font-Inter text-sm font-medium">{description || '-/-'}</p>
        </div>
      </div>
    </div>
  );
};
