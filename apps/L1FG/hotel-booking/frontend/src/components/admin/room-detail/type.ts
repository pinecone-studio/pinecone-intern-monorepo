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

export type RoomDetailServicesProps = {
  data: Room | undefined | null;
  key: string;
  value: string;
  setKey: (_key: string) => void;
  setValue: (_value: string) => void;
  handleEditRoomServices: () => Promise<void>;
};

export type RoomDetailImagesProps = {
  data: Room | undefined | null;
  images: string[];
  setImages: (_images: string[]) => void;
  handleEditHotelImages: () => Promise<void>;
};
