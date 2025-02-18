'use client';

import { useState } from 'react';

export const useHotelState = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [starRating, setStarRating] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  return {
    hotelGeneralInfo: { name, description, starRating, rating, phoneNumber },
    setterGeneralInfo: { setName, setDescription, setStarRating, setRating, setPhoneNumber },
  };
};

export const useHotelAmenities = () => {
  const [amenities, setAmenities] = useState<string[]>([]);

  return {
    hotelAmenities: { amenities },
    setterAmenities: { setAmenities },
  };
};

export const useHotelLocation = () => {
  const [locationName, setLocationName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [coordinates, setCoordinates] = useState<number[]>([]);

  return {
    hotelLocation: { locationName, type, coordinates },
    setterLocation: { setLocationName, setType, setCoordinates },
  };
};

export const useHotelImages = () => {
  const [images, setImages] = useState<string[]>([]);

  return {
    hotelImages: { images },
    setterImages: { setImages },
  };
};
