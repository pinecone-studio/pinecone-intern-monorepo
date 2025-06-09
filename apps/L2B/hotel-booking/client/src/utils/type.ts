import { RoomType } from '@/generated';

export type UserType = {
  _id: string;
  birth: Date;
  email: string;
  firstName: string;
  id?: string;
  isAdmin?: boolean;
  lastName: string;
  phone: string;
  relation: string;
  emergencyPhone: string;
};

export type HotelForm = {
  name: string | null;
  description: string | null;
  starRating?: number | null;
  phone: string | null;
  rating?: number | null;
};

export type Room = {
  __typename?: 'Room';
  _id?: string | null;
  name?: string | null;
  type?: RoomType;
  pricePerNight?: number | null;
  roomNumber?: number | null;
  isAvailable?: boolean | null;
  information?: string[] | null;
  images?: string[] | null;
  services?: Record<string, string[]> | null;
};

export type RoomFormData = {
  name: string;
  type: RoomType;
  pricePerNight: number;
  roomNumber: number;
  isAvailable: boolean;
  information: string[];
};
export interface GuestDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
}

export interface CardDetails {
  nameOnCard: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  country: string;
}

export interface BookingFormData {
  guestDetails: GuestDetails;
  contactInfo: ContactInfo;
  cardDetails: CardDetails;
}
