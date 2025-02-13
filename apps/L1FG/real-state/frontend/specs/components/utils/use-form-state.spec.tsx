import { useFormState } from '@/components/utils/use-form-state';
import { act, renderHook } from '@testing-library/react';
import { HouseTypeEnum } from '@/generated';

describe('useFormState', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useFormState());

    expect(result.current.formData).toEqual({
      title: '',
      description: '',
      price: '',
      houseType: '',
      size: '',
      images: [],
      totalRooms: 0,
      garage: '',
      restrooms: 0,
      subDistrict: '',
      district: '',
      city: '',
      address: '',
      completionDate: '',
      windowsCount: 0,
      windowType: '',
      floorMaterial: '',
      floorNumber: 0,
      balcony: '',
      totalFloors: 0,
      lift: '',
    });
  });

  test('should handle basic form updates', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        title: 'Test Property',
        description: 'Test Description',
        price: '100000',
        houseType: HouseTypeEnum.Apartment,
      }));
    });

    expect(result.current.formData.title).toBe('Test Property');
    expect(result.current.formData.description).toBe('Test Description');
    expect(result.current.formData.price).toBe('100000');
    expect(result.current.formData.houseType).toBe(HouseTypeEnum.Apartment);
  });

  test('should handle numeric field updates', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        totalRooms: 3,
        windowsCount: 6,
        floorNumber: 2,
        totalFloors: 4,
      }));
    });

    expect(result.current.formData.totalRooms).toBe(3);
    expect(result.current.formData.windowsCount).toBe(6);
    expect(result.current.formData.floorNumber).toBe(2);
    expect(result.current.formData.totalFloors).toBe(4);
  });

  test('should handle nullable location fields', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        city: 'Test City',
        district: null,
        subDistrict: undefined,
        address: 'Test Address',
      }));
    });

    expect(result.current.formData.city).toBe('Test City');
    expect(result.current.formData.district).toBeNull();
    expect(result.current.formData.subDistrict).toBeUndefined();
    expect(result.current.formData.address).toBe('Test Address');
  });

  test('should maintain data types', () => {
    const { result } = renderHook(() => useFormState());

    const { formData } = result.current;

    expect(typeof formData.title).toBe('string');
    expect(typeof formData.price).toBe('string');
    expect(typeof formData.totalRooms).toBe('number');
    expect(Array.isArray(formData.images)).toBe(true);
  });
});
