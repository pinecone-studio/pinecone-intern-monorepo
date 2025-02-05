import { createInput } from '@/components/utils/create-input';
import { HouseTypeEnum, PostStats } from '@/generated';

describe('createInput', () => {
  const mockUploadedImages = ['sample-image.jpg'];
  const mockUser = { _id: 'user123' };

  test('should transform form data correctly with all fields', () => {
    const mockFormData = {
      title: 'Beautiful House',
      description: 'A lovely property',
      price: 500000,
      houseType: HouseTypeEnum.Apartment,
      size: '150',
      totalRooms: 3,
      garage: 'true',
      restrooms: 2,
      subDistrict: 'Test Sub District',
      district: 'Test District',
      city: 'Test City',
      address: 'Test Address',
      completionDate: '2024-01-01',
      windowsCount: 6,
      windowType: 'Sliding',
      floorMaterial: 'Wooden',
      floorNumber: 3,
      balcony: 'true',
      totalFloors: 5,
      lift: 'true',
    };

    const result = createInput(mockFormData, mockUser, mockUploadedImages);

    expect(result).toEqual({
      title: 'Beautiful House',
      description: 'A lovely property',
      price: '500000',
      propertyOwnerId: 'user123',
      status: PostStats.Pending,
      propertyDetail: {
        houseType: HouseTypeEnum.Apartment,
        size: '150',
        images: mockUploadedImages,
        totalRooms: 3,
        garage: true,
        restrooms: 2,
        location: {
          subDistrict: 'Test Sub District',
          district: 'Test District',
          city: 'Test City',
          address: 'Test Address',
        },
        details: {
          completionDate: '2024-01-01',
          windowsCount: 6,
          windowType: 'Sliding',
          floorMaterial: 'Wooden',
          floorNumber: 3,
          balcony: true,
          totalFloors: 5,
          lift: true,
        },
      },
    });
  });

  test('should handle missing optional fields', () => {
    const mockFormData = {
      title: 'Simple House',
      description: 'Basic property',
      price: 300000,
      houseType: HouseTypeEnum.House,
      size: '100',
      totalRooms: 2,
      subDistrict: 'Test Sub District',
      district: 'Test District',
      city: 'Test City',
      address: 'Test Address',
      completionDate: '2024-01-01',
      windowType: 'Fixed',
      floorMaterial: 'Tile',
      floorNumber: 1,
      totalFloors: 2,
    };

    const result = createInput(mockFormData, mockUser, mockUploadedImages);

    expect(result.propertyDetail.garage).toBe(false);
    expect(result.propertyDetail.restrooms).toBe(0);
    expect(result.propertyDetail.details.windowsCount).toBe(0);
    expect(result.propertyDetail.details.balcony).toBe(false);
    expect(result.propertyDetail.details.lift).toBe(false);
  });

  test('should handle missing user', () => {
    const mockFormData = {
      title: 'Test House',
      description: 'Test description',
      price: 200000,
      houseType: HouseTypeEnum.House,
      size: '80',
      totalRooms: 1,
      subDistrict: 'Sub',
      district: 'Dist',
      city: 'City',
      address: 'Address',
    };

    const result = createInput(mockFormData, null, mockUploadedImages);

    expect(result.propertyOwnerId).toBe('');
  });

  test('should convert boolean strings correctly', () => {
    const mockFormData = {
      title: 'Test House',
      description: 'Test description',
      price: 100000,
      houseType: HouseTypeEnum.House,
      size: '60',
      totalRooms: 1,
      garage: 'true',
      balcony: 'false',
      lift: 'true',
      subDistrict: 'Sub',
      district: 'Dist',
      city: 'City',
      address: 'Address',
    };

    const result = createInput(mockFormData, mockUser, mockUploadedImages);

    expect(result.propertyDetail.garage).toBe(true);
    expect(result.propertyDetail.details.balcony).toBe(false);
    expect(result.propertyDetail.details.lift).toBe(true);
  });
});
