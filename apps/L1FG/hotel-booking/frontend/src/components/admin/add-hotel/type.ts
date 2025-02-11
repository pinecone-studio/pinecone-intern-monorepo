export type HotelGeneralInfoDialogProps = {
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

export type HotelAmenitiesProps = {
  amenities: string[];
  setAmenities: (_amenities: string[]) => void;
  handleEditHotelAmenities: () => Promise<void>;
};

export type HotelLocationProps = {
  locationName: string;
  setLocationName: (_locationName: string) => void;
  handleEditHotelLocation: () => Promise<void>;
};

export type HotelImagesProps = {
  images: string[];
  setImages: (_images: string[]) => void;
  handleEditHotelImages: () => Promise<void>;
};
