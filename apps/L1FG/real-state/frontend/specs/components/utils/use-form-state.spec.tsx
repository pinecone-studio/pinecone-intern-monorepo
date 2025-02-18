import { useFormState } from '@/components/utils/use-form-state';
import { act, renderHook } from '@testing-library/react';
import { HouseTypeEnum, PostStats } from '@/generated';

describe('Form Initial State', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useFormState());
    expect(result.current.formData).toEqual({
      title: '',
      description: '',
      price: '',
      houseType: '',
      size: '',
      images: [],
      totalRooms: 0,
      garage: false,
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
      balcony: false,
      totalFloors: 0,
      lift: false,
      status: PostStats.Pending,
    });
  });
});

describe('Form Text Fields', () => {
  it('updates text fields correctly', () => {
    const { result } = renderHook(() => useFormState());
    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        title: 'Test Title',
        description: 'Test Description',
      }));
    });
    expect(result.current.formData.title).toBe('Test Title');
    expect(result.current.formData.description).toBe('Test Description');
  });
});

describe('Form Numeric Fields', () => {
  it('updates numeric fields correctly', () => {
    const { result } = renderHook(() => useFormState());
    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        totalRooms: 3,
        restrooms: 2,
        windowsCount: 4,
      }));
    });
    expect(result.current.formData.totalRooms).toBe(3);
    expect(result.current.formData.restrooms).toBe(2);
    expect(result.current.formData.windowsCount).toBe(4);
  });
});

describe('Form Boolean Fields', () => {
  it('updates boolean fields correctly', () => {
    const { result } = renderHook(() => useFormState());
    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        garage: true,
        balcony: true,
        lift: true,
      }));
    });
    expect(result.current.formData.garage).toBe(true);
    expect(result.current.formData.balcony).toBe(true);
    expect(result.current.formData.lift).toBe(true);
  });
});

describe('Form Image Array', () => {
  it('updates image array correctly', () => {
    const { result } = renderHook(() => useFormState());
    const testImages = ['/test1.jpg', '/test2.jpg'];
    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        images: testImages,
      }));
    });
    expect(result.current.formData.images).toEqual(testImages);
  });
});

describe('Form Status', () => {
  it('updates status correctly', () => {
    const { result } = renderHook(() => useFormState());
    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        status: PostStats.Pending,
      }));
    });
    expect(result.current.formData.status).toBe(PostStats.Pending);
  });
});

describe('Form House Type', () => {
  it('updates house type enum correctly', () => {
    const { result } = renderHook(() => useFormState());
    act(() => {
      result.current.setFormData((prev) => ({
        ...prev,
        houseType: HouseTypeEnum.Apartment,
      }));
    });
    expect(result.current.formData.houseType).toBe(HouseTypeEnum.Apartment);
  });
});

describe('Form Type Safety', () => {
  it('maintains correct data types', () => {
    const { result } = renderHook(() => useFormState());
    const { formData } = result.current;
    expect(typeof formData.title).toBe('string');
    expect(typeof formData.description).toBe('string');
    expect(typeof formData.price).toBe('string');
    expect(typeof formData.totalRooms).toBe('number');
    expect(typeof formData.garage).toBe('boolean');
    expect(typeof formData.balcony).toBe('boolean');
    expect(typeof formData.lift).toBe('boolean');
    expect(Array.isArray(formData.images)).toBe(true);
    expect(formData.status).toBe(PostStats.Pending);
  });
});
