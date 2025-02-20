'use client';

import { useGetHotelByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useHotelDetailState = () => {
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetHotelByIdQuery({
    variables: { getHotelByIdId: hotelId },
    skip: !hotelId,
  });

  const hotelData = data?.getHotelById;

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [starRating, setStarRating] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const safeString = (value?: number | string | null) => (value != null ? String(value) : '');

  useEffect(() => {
    if (hotelData) {
      setName(safeString(hotelData?.name));
      setDescription(safeString(hotelData?.description));
      setStarRating(safeString(hotelData?.starRating));
      setRating(safeString(hotelData?.rating));
      setPhoneNumber(safeString(hotelData?.phoneNumber));
    }
  }, [hotelData]);

  return {
    hotelGeneralInfo: { name, description, starRating, rating, phoneNumber },
    setterGeneralInfo: { setName, setDescription, setStarRating, setRating, setPhoneNumber },
  };
};

export const useHotelDetailLocation = () => {
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetHotelByIdQuery({
    variables: { getHotelByIdId: hotelId },
    skip: !hotelId,
  });

  const hotelData = data?.getHotelById;

  const [locationName, setLocationName] = useState<string>('');
  const [coordinates, setCoordinates] = useState<number[]>([]);

  useEffect(() => {
    if (hotelData?.location) {
      setLocationName(hotelData?.locationName ?? '');
      setCoordinates(hotelData?.location.coordinates ?? []);
    }
  }, [hotelData]);

  return {
    hotelLocation: { locationName, coordinates },
    setterLocation: { setLocationName, setCoordinates },
  };
};

export const useHotelDetailAmenities = () => {
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetHotelByIdQuery({
    variables: { getHotelByIdId: hotelId },
    skip: !hotelId,
  });

  const hotelData = data?.getHotelById;

  const [amenities, setAmenities] = useState<string[]>([]);

  useEffect(() => {
    if (hotelData?.amenities?.length) {
      const validAmenities = hotelData.amenities.filter((amenity): amenity is string => amenity !== null);
      setAmenities(validAmenities);
    }
  }, [hotelData]);

  return {
    hotelAmenities: { amenities },
    setterAmenities: { setAmenities },
  };
};

export const useHotelDetailImages = () => {
  const params = useParams();
  const hotelId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetHotelByIdQuery({
    variables: { getHotelByIdId: hotelId },
    skip: !hotelId,
  });

  const hotelData = data?.getHotelById;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (hotelData?.images?.length) {
      setImages(hotelData.images);
    }
  }, [hotelData]);

  return {
    hotelImages: { images },
    setterImages: { setImages },
  };
};
