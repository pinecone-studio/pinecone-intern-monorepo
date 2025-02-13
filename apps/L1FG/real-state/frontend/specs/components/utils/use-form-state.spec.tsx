import { useFormState } from '@/components/utils/use-form-state';
import { act, renderHook } from '@testing-library/react';

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

  test('should update form data correctly', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        title: 'Test House',
        price: '500000',
        totalRooms: 3,
      }));
    });

    expect(result.current.formData.title).toBe('Test House');
    expect(result.current.formData.price).toBe('500000');
    expect(result.current.formData.totalRooms).toBe(3);
  });

  test('should handle location fields correctly', () => {
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

  test('should maintain type consistency', () => {
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

    expect(typeof result.current.formData.totalRooms).toBe('number');
    expect(typeof result.current.formData.windowsCount).toBe('number');
    expect(typeof result.current.formData.floorNumber).toBe('number');
    expect(typeof result.current.formData.totalFloors).toBe('number');
    expect(Array.isArray(result.current.formData.images)).toBe(true);
  });
});
