import { useFormState } from '@/components/utils/use-form-state';
import { act, renderHook } from '@testing-library/react';

describe('useFormState', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useFormState());

    expect(result.current.formData).toEqual({
      title: '',
      description: '',
      price: 0,
      houseType: null,
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
      result.current.setFormData({
        ...result.current.formData,
        title: 'Test House',
        description: 'Test Description',
        price: 500000,
      });
    });

    expect(result.current.formData).toEqual({
      ...result.current.formData,
      title: 'Test House',
      description: 'Test Description',
      price: 500000,
    });
  });

  test('should update nested fields individually', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        title: 'New House',
      }));
    });

    expect(result.current.formData.title).toBe('New House');
    expect(result.current.formData.description).toBe('');
  });

  test('should handle multiple sequential updates', () => {
    const { result } = renderHook(() => useFormState());

    // First update
    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        title: 'First Title',
        price: 100000,
      }));
    });

    // Second update
    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        description: 'Added description',
        price: 150000,
      }));
    });

    expect(result.current.formData).toEqual({
      ...result.current.formData,
      title: 'First Title',
      description: 'Added description',
      price: 150000,
    });
  });

  test('should maintain type consistency', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        price: 500000,
        totalRooms: 3,
        windowsCount: 6,
        floorNumber: 2,
        totalFloors: 4,
      }));
    });

    expect(typeof result.current.formData.price).toBe('number');
    expect(typeof result.current.formData.totalRooms).toBe('number');
    expect(typeof result.current.formData.windowsCount).toBe('number');
    expect(typeof result.current.formData.floorNumber).toBe('number');
    expect(typeof result.current.formData.totalFloors).toBe('number');
    expect(Array.isArray(result.current.formData.images)).toBe(true);
  });

  test('should handle empty string updates', () => {
    const { result } = renderHook(() => useFormState());

    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        title: 'Test',
        description: 'Test',
      }));
    });

    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        title: '',
        description: '',
      }));
    });

    expect(result.current.formData.title).toBe('');
    expect(result.current.formData.description).toBe('');
  });
});
