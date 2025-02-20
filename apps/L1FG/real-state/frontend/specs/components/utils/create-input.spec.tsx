import { createInput } from '@/components/utils/create-input';
import { HouseTypeEnum, PostStats } from '@/generated';

describe('createInput', () => {
  const mockUser = { _id: 'user123' };
  const mockUploadedImages = ['sample-image.jpg'];

  test('transforms full form data correctly with all fields', () => {
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

  test('applies defaults for missing optional fields and missing user', () => {
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

    const result = createInput(mockFormData, null, undefined);
    expect(result.propertyDetail.garage).toBe(false);
    expect(result.propertyDetail.restrooms).toBe(0);
    expect(result.propertyDetail.details.windowsCount).toBe(0);
    expect(result.propertyDetail.details.balcony).toBe(false);
    expect(result.propertyDetail.details.lift).toBe(false);
    expect(result.propertyDetail.images).toEqual([]);
    expect(result.propertyOwnerId).toBe('');
  });

  test.each([
    { inputPrice: 700000, expected: '700000' },
    { inputPrice: '00004200', expected: '4200' },
    { inputPrice: '0000', expected: '0' },
    { inputPrice: '12abc', expected: '12abc' },
  ])('returns price as a string and strips leading zeros for $inputPrice', ({ inputPrice, expected }: { inputPrice: number | string; expected: string }) => {
    const mockFormData = {
      title: 'Test House',
      description: 'Test description',
      price: inputPrice,
      houseType: HouseTypeEnum.House,
      size: '80',
      totalRooms: 1,
      garage: 'false',
      subDistrict: '',
      district: '',
      city: '',
      address: '',
    };
    const result = createInput(mockFormData, mockUser, mockUploadedImages);
    expect(result.price).toBe(expected);
    expect(typeof result.price).toBe('string');
  });
});
