import { HouseTypeEnum, PostStats } from '@/generated';

function processPrice(price: unknown): string {
  if (typeof price === 'string') {
    const trimmed = price.replace(/^0+/, '');
    return trimmed === '' ? '0' : trimmed;
  }
  return String(price);
}

function buildPropertyDetail(updatedFormData: any) {
  return {
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
  };
}

function prepareUpdatedFormData(formData: any, uploadedImages?: string[]) {
  return {
    ...formData,
    images: uploadedImages ?? [],
    garage: formData.garage === 'true',
    balcony: formData.balcony === 'true',
    lift: formData.lift === 'true',
    restrooms: formData.restrooms || 0,
    windowsCount: formData.windowsCount || 0,
  };
}

export const createInput = (formData: any, user: any, uploadedImages?: string[]) => {
  const updatedFormData = prepareUpdatedFormData(formData, uploadedImages);
  const processedPrice = processPrice(updatedFormData.price);

  return {
    title: updatedFormData.title,
    description: updatedFormData.description,
    price: processedPrice,
    propertyOwnerId: user?._id || '',
    status: PostStats.Pending,
    propertyDetail: buildPropertyDetail(updatedFormData),
  };
};
