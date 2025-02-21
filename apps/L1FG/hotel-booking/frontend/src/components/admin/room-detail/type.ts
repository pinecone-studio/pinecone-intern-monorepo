import { Room } from '@/generated';

export type GeneralInfoDetailDialogProps = {
  data: Room | undefined | null;
  bed: string;
  tax: string;
  name: string;
  type: string;
  price: string;
  roomInfo: string[];
  roomNumber: string;
  setBed: (_bed: string) => void;
  setTax: (_tax: string) => void;
  setName: (_name: string) => void;
  setType: (_type: string) => void;
  setPrice: (_price: string) => void;
  setRoomInfo: (_roomInfo: string[]) => void;
  setRoomNumber: (_roomNumber: string) => void;
  handleEditGeneralInfo: () => Promise<void>;
};

export type RoomServicesProps = {
  data: Room | undefined | null;
  accessibility: string[];
  bathroom: string[];
  bedroom: string[];
  foodAndDrink: string[];
  internet: string[];
  other: string[];
  setAccessibility: (_accessibility: string[]) => void;
  setBathroom: (_bathroom: string[]) => void;
  setBedroom: (_bedroom: string[]) => void;
  setFoodAndDrink: (_foodAndDrink: string[]) => void;
  setInternet: (_internet: string[]) => void;
  setOther: (_other: string[]) => void;
  handleEditRoomServices: () => Promise<void>;
};

export type RoomDetailImagesProps = {
  data: Room | undefined | null;
  images: string[];
  setImages: (_images: string[]) => void;
  handleEditHotelImages: () => Promise<void>;
};
