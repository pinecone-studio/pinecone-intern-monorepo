import { HouseTypeEnum, PostInput, PostStats } from '@/generated';
import { EstateFormData } from '@/utils/property-zod-schema';

export const createInput = (data: EstateFormData, userId: string, uploadedImages: string[]): PostInput => {
  return {
    title: String(data.title),
    price: String(data.price),
    description: String(data.description),
    status: PostStats.Pending,
    propertyOwnerId: userId,
    propertyDetail: {
      houseType: data.houseType as HouseTypeEnum,
      size: String(data.size),
      images: uploadedImages,
      totalRooms: Number(data.totalRooms),
      garage: Boolean(data.garage),
      restrooms: Number(data.restrooms),
      location: {
        city: String(data.city),
        district: String(data.district),
        subDistrict: String(data.subDistrict),
        address: String(data.address),
      },
      details: {
        windowsCount: Number(data.windowsCount),
        windowType: String(data.windowType),
        floorMaterial: String(data.floorMaterial),
        floorNumber: Number(data.floorNumber),
        balcony: Boolean(data.balcony),
        totalFloors: Number(data.totalFloors),
        lift: Boolean(data.lift),
        completionDate: data.completionDate,
      },
    },
  };
};
