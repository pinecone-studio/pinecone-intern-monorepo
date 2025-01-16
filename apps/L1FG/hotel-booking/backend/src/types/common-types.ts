import { ObjectId } from 'mongoose';

export type Dictionary = {
  [key: string]: string;
};
export type LocationType = {
  type: 'Point';
  coordinates: [number, number];
};

export type HotelType = {
  _id: ObjectId;
  name: string;
  phoneNumber: string;
  rating: number;
  starRating: number;
  description: string;
  images: string[];
  rooms: ObjectId[];
  faqs: Dictionary[];
  policies: Dictionary[];
  about: Dictionary[];
  location: LocationType;
  locationName: string;
};

export type RoomType = {
  _id: ObjectId;
  hotelId: ObjectId;
  name: string;
  roomNumber: string;
  price: number;
  bed: number;
  images: string[];
  roomInfo: string[];
  type: string;
  roomServices: Dictionary[];
  tax: number;
};

export type BookingType = {
  _id: ObjectId;
  userId: ObjectId;
  hotelId: ObjectId;
  roomId: ObjectId;
  startDate: Date;
  endDate: Date;
  phoneNumber: string;
  guestRequest: string;
  email: string;
  status: string;
};

export type UserType = {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  phoneNumber: string;
  emergencyContact: string[];
  status: 'Admin' | 'User';
};
