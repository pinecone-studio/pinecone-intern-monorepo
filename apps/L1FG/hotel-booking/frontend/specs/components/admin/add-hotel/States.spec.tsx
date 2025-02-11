import { useHotelAmenities, useHotelImages, useHotelLocation, useHotelState } from '@/components/admin/add-hotel/States';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

// Update this with the actual file path

describe('Custom Hooks', () => {
  describe('useHotelState', () => {
    it('should initialize and update hotel state correctly', () => {
      const { result } = renderHook(() => useHotelState());

      // Initial state
      expect(result.current.hotelData).toEqual({
        name: '',
        description: '',
        starRating: '',
        rating: '',
        phoneNumber: '',
      });

      // Update state
      act(() => {
        result.current.setters.setName('Hotel Name');
        result.current.setters.setDescription('A luxury hotel');
        result.current.setters.setStarRating('5');
        result.current.setters.setRating('4.5');
        result.current.setters.setPhoneNumber('123-456-7890');
      });

      expect(result.current.hotelData).toEqual({
        name: 'Hotel Name',
        description: 'A luxury hotel',
        starRating: '5',
        rating: '4.5',
        phoneNumber: '123-456-7890',
      });
    });
  });

  describe('useHotelAmenities', () => {
    it('should initialize and update amenities correctly', () => {
      const { result } = renderHook(() => useHotelAmenities());

      // Initial state
      expect(result.current.hotelAmenities).toEqual({ amenities: [] });

      // Update amenities
      act(() => {
        result.current.setterAmenities.setAmenities(['Pool', 'Gym', 'Spa']);
      });

      expect(result.current.hotelAmenities).toEqual({
        amenities: ['Pool', 'Gym', 'Spa'],
      });
    });
  });

  describe('useHotelLocation', () => {
    it('should initialize and update location correctly', () => {
      const { result } = renderHook(() => useHotelLocation());

      // Initial state
      expect(result.current.hotelLocation).toEqual({
        locationName: '',
        type: '',
        coordinates: [],
      });

      // Update location
      act(() => {
        result.current.setterLocation.setLocationName('Downtown');
        result.current.setterLocation.setType('Point');
        result.current.setterLocation.setCoordinates([40.7128, -74.006]);
      });

      expect(result.current.hotelLocation).toEqual({
        locationName: 'Downtown',
        type: 'Point',
        coordinates: [40.7128, -74.006],
      });
    });
  });

  describe('useHotelImages', () => {
    it('should initialize and update images correctly', () => {
      const { result } = renderHook(() => useHotelImages());

      // Initial state
      expect(result.current.hotelImages).toEqual({ images: [] });

      // Update images
      act(() => {
        result.current.setterImages.setImages(['image1.jpg', 'image2.jpg']);
      });

      expect(result.current.hotelImages).toEqual({
        images: ['image1.jpg', 'image2.jpg'],
      });
    });
  });
});
