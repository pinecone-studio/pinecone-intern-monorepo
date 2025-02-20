/*eslint-disable*/

import { waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { useGetRoomByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { useRoomDetailImages, useRoomDetailState, useRoomServices } from '@/components/admin/room-detail';

// Mock the generated query and next/navigation
jest.mock('@/generated', () => ({
  useGetRoomByIdQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('Custom Room Hooks', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useRoomDetailImages', () => {
    it('handles array params id correctly', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: ['1', '2'] });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: { getRoomById: { images: ['img1.jpg'] } },
      });

      const { result } = renderHook(() => useRoomDetailImages());

      await waitFor(() => {
        expect(result.current.roomImages.images);
      });
    });

    it('returns images from API when data is available', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: '1' });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: { getRoomById: { images: ['img1.jpg', 'img2.jpg'] } },
      });

      const { result } = renderHook(() => useRoomDetailImages());

      await waitFor(() => {
        expect(result.current.roomImages.images);
      });
    });

    it('returns an empty array when no images are provided', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: '1' });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: { getRoomById: { images: [] } },
      });

      const { result } = renderHook(() => useRoomDetailImages());

      await waitFor(() => {
        expect(result.current.roomImages.images);
      });
    });

    it('returns an empty array when roomData is undefined', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: '1' });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: { getRoomById: undefined },
      });

      const { result } = renderHook(() => useRoomDetailImages());

      await waitFor(() => {
        expect(result.current.roomImages.images);
      });
    });
  });

  describe('useRoomDetailState', () => {
    it('sets state values based on API data', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: '2' });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: {
          getRoomById: {
            name: 'Deluxe Suite',
            bed: 2,
            tax: 10000,
            type: 'Suite',
            price: 200000,
            roomNumber: 101,
            roomInfo: ['Wi-Fi', 'Sea View'],
          },
        },
      });

      const { result } = renderHook(() => useRoomDetailState());

      await waitFor(() => {
        expect(result.current.roomGeneralInfo);
      });
    });

    it('initializes with empty strings when no data is provided', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: '3' });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({ data: { getRoomById: null } });

      const { result } = renderHook(() => useRoomDetailState());

      await waitFor(() => {
        expect(result.current.roomGeneralInfo);
      });
    });

    it('handles undefined roomInfo', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: '1' });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: {
          getRoomById: {
            name: 'Test Room',
            roomInfo: undefined,
          },
        },
      });

      const { result } = renderHook(() => useRoomDetailState());

      await waitFor(() => {
        expect(result.current.roomGeneralInfo.roomInfo);
      });
    });

    it('handles mixed types in roomInfo array', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: '1' });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: {
          getRoomById: {
            name: 'Test Room',
            roomInfo: ['Valid String', null, undefined, 123, true, { key: 'value' }, 'Another Valid String'],
          },
        },
      });

      const { result } = renderHook(() => useRoomDetailState());

      await waitFor(() => {
        expect(result.current.roomGeneralInfo.roomInfo);
      });
    });

    it('handles empty roomInfo array', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: '1' });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: {
          getRoomById: {
            name: 'Test Room',
            roomInfo: [],
          },
        },
      });

      const { result } = renderHook(() => useRoomDetailState());

      await waitFor(() => {
        expect(result.current.roomGeneralInfo.roomInfo);
      });
    });

    it('handles array params id correctly', async () => {
      (useParams as jest.Mock).mockReturnValue({ id: ['1', '2'] });
      (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
        data: {
          getRoomById: {
            name: 'Test Room',
            bed: 1,
            tax: 5000,
            type: 'Standard',
            price: 100000,
            roomNumber: 100,
            roomInfo: ['Info1'],
          },
        },
      });

      const { result } = renderHook(() => useRoomDetailState());

      await waitFor(() => {
        expect(result.current.roomGeneralInfo.name);
      });
    });
  });

  describe('useRoomServices', () => {
    it('updates key and value states correctly', () => {
      const { result } = renderHook(() => useRoomServices());

      act(() => {
        result.current.setterServices.setKey('Service Key');
        result.current.setterServices.setValue('Service Value');
      });

      expect(result.current.roomServices);
    });

    it('initializes with empty strings', () => {
      const { result } = renderHook(() => useRoomServices());
      expect(result.current.roomServices);
    });
  });

  it('initializes with empty strings when no data is provided', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '3' });
    (useGetRoomByIdQuery as jest.Mock).mockReturnValue({
      data: {
        getRoomById: {
          name: null,
          roomInfo: ['Valid String', null, undefined, 123, true, { key: 'value' }, 'Another Valid String'],
        },
      },
    });

    const { result } = renderHook(() => useRoomDetailState());

    await waitFor(() => {
      expect(result.current.roomGeneralInfo.name);
    });
  });
});
