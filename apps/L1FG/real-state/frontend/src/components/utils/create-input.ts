import { HouseTypeEnum, PostStats } from '@/generated';

export const createInput = (formData: any, user: any, uploadedImages: string[]) => {
  const updatedFormData = {
    ...formData,
    images: uploadedImages,
    garage: formData.garage === 'true',
    balcony: formData.balcony === 'true',
    lift: formData.lift === 'true',
    restrooms: formData.restrooms || 0,
    windowsCount: formData.windowsCount || 0,
  };

  return {
    title: updatedFormData.title,
    description: updatedFormData.description,
    price: updatedFormData.price.toString(),
    propertyOwnerId: user?._id || '',
    status: PostStats.Pending,
    propertyDetail: {
      houseType: updatedFormData.houseType as HouseTypeEnum,
      size: updatedFormData.size,
      images: updatedFormData.images,
      totalRooms: updatedFormData.totalRooms,
      garage: updatedFormData.garage,
      restrooms: updatedFormData.restrooms,
      location: {
        subDistrict: updatedFormData.subDistrict,
        district: updatedFormData.district,
        city: updatedFormData.city,
        address: updatedFormData.address,
      },
      details: {
        completionDate: updatedFormData.completionDate,
        windowsCount: updatedFormData.windowsCount,
        windowType: updatedFormData.windowType,
        floorMaterial: updatedFormData.floorMaterial,
        floorNumber: updatedFormData.floorNumber,
        balcony: updatedFormData.balcony,
        totalFloors: updatedFormData.totalFloors,
        lift: updatedFormData.lift,
      },
    },
  };
};
