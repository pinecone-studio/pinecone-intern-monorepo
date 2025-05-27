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
