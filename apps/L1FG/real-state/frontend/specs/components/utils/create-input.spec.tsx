import { createInput } from '@/components/utils/create-input';
import { HouseTypeEnum, PostStats, User } from '@/generated';
import { EstateFormData } from '@/utils/property-zod-schema';

describe('createInput', () => {
  const mockUploadedImages = ['sample-image.jpg'];
  const mockUser: string = 'user123';

  test('should transform form data correctly with all fields', () => {
    const mockFormData: EstateFormData = {
      title: 'Beautiful House',
      description: 'A lovely property',
      price: 500000,
      houseType: HouseTypeEnum.Apartment,
      size: 150,
      totalRooms: 3,
      garage: true,
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
    /*disable eslint */
    expect(result).toEqual({
      title: 'Beautiful House',
      description: 'A lovely property',
      price: '500000',
      status: PostStats.Pending,
      propertyOwnerId: mockUser,
      propertyDetail: {
        houseType: HouseTypeEnum.Apartment,
        size: '150',
        images: ['sample-image.jpg'],
        totalRooms: 3,
        garage: true,
        restrooms: 2,
        location: {
          city: 'Test City',
          district: 'Test District',
          subDistrict: 'Test Sub District',
          address: 'Test Address',
        },
        details: {
          windowsCount: 6,
          windowType: 'Sliding',
          floorMaterial: 'Wooden',
          floorNumber: 3,
          balcony: true,
          totalFloors: 5,
          lift: true,
          completionDate: '2024-01-01',
        },
      },
    });
  });
});
