import { Hotel } from '@/generated';

export type HotelDetailLocationProps = {
  data: Hotel | undefined | null;
  locationName: string;
  setLocationName: (_locationName: string) => void;
  handleEditHotelLocation: () => Promise<void>;
};

export type HotelDetailImagesProps = {
  data: Hotel | undefined | null;
  images: string[];
  setImages: (_images: string[]) => void;
  handleEditHotelImages: () => Promise<void>;
};

export type HotelDetailGeneralInfoDialogProps = {
  data: Hotel | undefined | null;
  name: string;
  rating: string;
  starRating: string;
  description: string;
  phoneNumber: string;
  setName: (_name: string) => void;
  setRating: (_rating: string) => void;
  setStarRating: (_starRating: string) => void;
  setDescription: (_description: string) => void;
  setPhoneNumber: (_phoneNumber: string) => void;
  handleEditHotelGeneralInfo: () => Promise<void>;
};

export type HotelDetailAmenitiesDialogProps = {
  data: Hotel | undefined | null;
  amenities: string[];
  setAmenities: (_amenities: string[]) => void;
  handleEditHotelAmenities: () => Promise<void>;
};
