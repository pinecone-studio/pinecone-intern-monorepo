import { ObjectId } from 'mongoose';

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
  faqs: { key: string; value: string }[];
  policies: { key: string; value: string }[];
  about: { key: string; value: string }[];
  location: LocationType;
  locationName: string;
  amenities: string[];
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
  bathroom: [String];
  accessibility: [String];
  internet: [String];
  foodAndDrink: [String];
  bedroom: [String];
  other: [String];
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
  cardName: string;
  cardNumber: string;
  expirationDate: Date;
  securityCode: number;
  country: string;
  firstName : string;
  lastName : string;
  middleName : string
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
  password: string;
  otp: number;
};
