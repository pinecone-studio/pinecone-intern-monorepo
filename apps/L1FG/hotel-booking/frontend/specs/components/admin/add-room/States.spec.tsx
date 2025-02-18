import { useRoomImages, useRoomServices, useRoomState } from '@/components/admin/add-room/States';
import { renderHook, act } from '@testing-library/react-hooks';

// Тест 1: useRoomImages
describe('useRoomImages', () => {
  test('should set and get room images', () => {
    const { result } = renderHook(() => useRoomImages());

    // initial state
    expect(result.current.roomImages.images);

    // set new images
    act(() => {
      result.current.setterImages.setImages(['image1.jpg', 'image2.jpg']);
    });

    // updated state
    expect(result.current.roomImages.images);
  });
});

// Тест 2: useRoomState
describe('useRoomState', () => {
  test('should set and get room general info', () => {
    const { result } = renderHook(() => useRoomState());

    // initial state
    expect(result.current.roomGeneralInfo.bed);
    expect(result.current.roomGeneralInfo.tax);
    expect(result.current.roomGeneralInfo.name);
    expect(result.current.roomGeneralInfo.type);
    expect(result.current.roomGeneralInfo.price);
    expect(result.current.roomGeneralInfo.roomNumber);
    expect(result.current.roomGeneralInfo.roomInfo);

    // set new values
    act(() => {
      result.current.setterGeneralInfo.setBed('Queen');
      result.current.setterGeneralInfo.setTax('10');
      result.current.setterGeneralInfo.setName('Deluxe Room');
      result.current.setterGeneralInfo.setType('Double');
      result.current.setterGeneralInfo.setPrice('200');
      result.current.setterGeneralInfo.setRoomNumber('101');
      result.current.setterGeneralInfo.setRoomInfo(['Wi-Fi', 'Air Conditioning']);
    });

    // updated state
    expect(result.current.roomGeneralInfo.bed);
    expect(result.current.roomGeneralInfo.tax);
    expect(result.current.roomGeneralInfo.name);
    expect(result.current.roomGeneralInfo.type);
    expect(result.current.roomGeneralInfo.price);
    expect(result.current.roomGeneralInfo.roomNumber);
    expect(result.current.roomGeneralInfo.roomInfo);
  });
});

// Тест 3: useRoomServices
describe('useRoomServices', () => {
  test('should set and get room services', () => {
    const { result } = renderHook(() => useRoomServices());

    // initial state
    expect(result.current.roomServices.key);
    expect(result.current.roomServices.value);

    // set new values
    act(() => {
      result.current.setterServices.setKey('bathroom');
      result.current.setterServices.setValue('Shower');
    });

    // updated state
    expect(result.current.roomServices.key);
    expect(result.current.roomServices.value);
  });
});
