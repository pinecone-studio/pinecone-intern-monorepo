type PropertyDetail = {
  createdAt: string;
  details: {
    balcony: boolean;
    completionDate: string;
    floorMaterial: string;
    floorNumber: number;
    lift: boolean;
    totalFloors: number;
    windowType: string;
    windowsCount: number;
  };
};

type LocationType = {
  address: string;
  city: string;
  district: string;
  subDistrict: string;
};

type PropertyOwner = {
  createdAt: string;
  email: string;
  isAdmin: boolean;
  name: string;
  phone: string;
  updatedAt: string;
  __typename: string;
  _id: string;
};

export type PropertyPostProps = {
  createdAt: string;
  description: string;
  price: string;
  propertyDetail: PropertyDetail;
  garage: boolean;
  houseType: string;
  images: string[];
  location: LocationType;
  restrooms: number;
  size: string;
  totalRooms: number;
  uploadedAt: string;
  __typename: string;
  propertyOwnerId: PropertyOwner;
  status: string;
  title: string;
  updatedAt: string;
  _id: string;
};
