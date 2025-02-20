/*eslint-disable*/

import { renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useGetHotelByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { mocked } from 'jest-mock';
import { useHotelDetailState, useHotelDetailLocation, useHotelDetailAmenities, useHotelDetailImages } from '@/components/admin/hotel-detail';

jest.mock('@/generated', () => ({
  ...jest.requireActual('@/generated'),
  useGetHotelByIdQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('Hotel Detail Hooks', () => {
  const mockHotelData = {
    getHotelById: {
      id: '1',
      name: 'Test Hotel',
      description: 'A lovely place to stay.',
      starRating: 4,
      rating: 8.5,
      phoneNumber: '+1234567890',
      locationName: 'Test City',
      location: { coordinates: [45.0, 90.0] },
      amenities: ['Wi-Fi', 'Pool'],
      images: ['image1.jpg', 'image2.jpg'],
      __typename: 'Hotel',
    },
  };

  beforeEach(() => {
    mocked(useParams).mockReturnValue({ id: 'hotel1' });
    mocked(useGetHotelByIdQuery as jest.Mock).mockReturnValue({ data: mockHotelData });
  });

  it('useHotelDetailState returns correct general info', () => {
    const { result } = renderHook(() => useHotelDetailState(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    expect(result.current.hotelGeneralInfo.name);
    expect(result.current.hotelGeneralInfo.description);
    expect(result.current.hotelGeneralInfo.starRating);
    expect(result.current.hotelGeneralInfo.rating);
    expect(result.current.hotelGeneralInfo.phoneNumber);
  });

  it('useHotelDetailLocation returns correct location data', () => {
    const { result } = renderHook(() => useHotelDetailLocation(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    expect(result.current.hotelLocation.locationName);
    expect(result.current.hotelLocation.coordinates);
  });

  it('useHotelDetailAmenities returns correct amenities', () => {
    const { result } = renderHook(() => useHotelDetailAmenities(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    expect(result.current.hotelAmenities.amenities);
  });

  it('useHotelDetailImages returns correct images', () => {
    const { result } = renderHook(() => useHotelDetailImages(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    expect(result.current.hotelImages.images);
  });

  it('handles missing hotel data gracefully', () => {
    mocked(useParams).mockReturnValue({ id: [''] });
    mocked(useGetHotelByIdQuery as jest.Mock).mockReturnValue({ data: undefined });

    const { result: generalInfoResult } = renderHook(() => useHotelDetailState(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });
    expect(generalInfoResult.current.hotelGeneralInfo.name);
    expect(generalInfoResult.current.hotelGeneralInfo.description);
    expect(generalInfoResult.current.hotelGeneralInfo.starRating);
    expect(generalInfoResult.current.hotelGeneralInfo.rating);
    expect(generalInfoResult.current.hotelGeneralInfo.phoneNumber);

    const { result: locationResult } = renderHook(() => useHotelDetailLocation(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });
    expect(locationResult.current.hotelLocation.locationName);
    expect(locationResult.current.hotelLocation.coordinates);

    const { result: amenitiesResult } = renderHook(() => useHotelDetailAmenities(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });
    expect(amenitiesResult.current.hotelAmenities.amenities);

    const { result: imagesResult } = renderHook(() => useHotelDetailImages(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });
    expect(imagesResult.current.hotelImages.images);
  });

  it('handles array params id correctly with a single value', () => {
    mocked(useParams).mockReturnValue({ id: ['hotel1'] });
    mocked(useGetHotelByIdQuery as jest.Mock).mockReturnValue({ data: mockHotelData });

    const { result } = renderHook(() => useHotelDetailState(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    expect(result.current.hotelGeneralInfo.name);
  });

  it('handles empty string params id correctly', () => {
    mocked(useParams).mockReturnValue({ id: '' });
    mocked(useGetHotelByIdQuery as jest.Mock).mockReturnValue({ data: undefined });

    const { result } = renderHook(() => useHotelDetailState(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    expect(result.current.hotelGeneralInfo.name);
  });

  it('handles array params id correctly with multiple values', () => {
    mocked(useParams).mockReturnValue({ id: ['hotel1', 'hotel2'] });
    mocked(useGetHotelByIdQuery as jest.Mock).mockReturnValue({ data: mockHotelData });

    const { result } = renderHook(() => useHotelDetailState(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    expect(result.current.hotelGeneralInfo.name);
  });

  it('should handle missing hotel data gracefully', () => {
    mocked(useGetHotelByIdQuery as jest.Mock).mockReturnValue({ data: undefined });

    const { result } = renderHook(() => useHotelDetailState(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    // check for default empty values when data is missing
    expect(result.current.hotelGeneralInfo.name);
    expect(result.current.hotelGeneralInfo.description);
    expect(result.current.hotelGeneralInfo.starRating);
    expect(result.current.hotelGeneralInfo.rating);
    expect(result.current.hotelGeneralInfo.phoneNumber);
  });

  it('should handle missing hotel data gracefully', () => {
    mocked(useParams).mockReturnValue({ id: ['hotel1'] });
    const mockHotelData = {
      getHotelById: {
        id: '1',
        name: null,
        description: null,
        starRating: null,
        rating: null,
        phoneNumber: null,
        locationName: null,
        location: { coordinates: null },
        amenities: ['Wi-Fi', 'Pool'],
        images: ['image1.jpg', 'image2.jpg'],
        __typename: 'Hotel',
      },
    };
    mocked(useGetHotelByIdQuery as jest.Mock).mockReturnValue({ data: mockHotelData });

    const { result } = renderHook(() => useHotelDetailState(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    // check for default empty values when data is missing
    expect(result.current.hotelGeneralInfo.name);
    expect(result.current.hotelGeneralInfo.description);
    expect(result.current.hotelGeneralInfo.starRating);
    expect(result.current.hotelGeneralInfo.rating);
    expect(result.current.hotelGeneralInfo.phoneNumber);

    const { result: locationResult } = renderHook(() => useHotelDetailLocation(), {
      wrapper: ({ children }) => <MockedProvider>{children}</MockedProvider>,
    });

    expect(locationResult.current.hotelLocation.locationName);
    expect(locationResult.current.hotelLocation.coordinates);
  });
});
