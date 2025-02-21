'use client';

import { useGetRoomByIdQuery } from '@/generated';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useRoomDetailImages = () => {
  const params = useParams();
  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetRoomByIdQuery({
    variables: { getRoomByIdId: roomId },
    skip: !roomId,
  });

  const roomData = data?.getRoomById;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (roomData?.images?.length) {
      setImages(roomData.images);
    }
  }, [roomData]);

  return {
    roomImages: { images },
    setterImages: { setImages },
  };
};

export const useRoomDetailState = () => {
  const params = useParams();
  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetRoomByIdQuery({
    variables: { getRoomByIdId: roomId },
    skip: !roomId,
  });

  const roomData = data?.getRoomById;

  const [bed, setBed] = useState<string>('');
  const [tax, setTax] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [roomInfo, setRoomInfo] = useState<string[]>([]);

  const safeString = (value?: string | number | null) => String(value ?? '');

  useEffect(() => {
    if (!roomData) return;

    setBed(safeString(roomData.bed));
    setTax(safeString(roomData.tax));
    setName(safeString(roomData.name));
    setType(safeString(roomData.type));
    setPrice(safeString(roomData.price));
    setRoomNumber(safeString(roomData.roomNumber));
    setRoomInfo((roomData?.roomInfo ?? []).filter((info): info is string => typeof info === 'string'));
  }, [roomData]);

  return {
    roomGeneralInfo: { bed, tax, name, type, price, roomNumber, roomInfo },
    setterGeneralInfo: { setBed, setTax, setName, setType, setPrice, setRoomNumber, setRoomInfo },
  };
};

export const useRoomDetailServices = () => {
  const params = useParams();
  const roomId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data } = useGetRoomByIdQuery({
    variables: { getRoomByIdId: roomId },
    skip: !roomId,
  });

  const roomData = data?.getRoomById;

  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [bathroom, setBathroom] = useState<string[]>([]);
  const [bedroom, setBedroom] = useState<string[]>([]);
  const [foodAndDrink, setFoodAndDrink] = useState<string[]>([]);
  const [internet, setInternet] = useState<string[]>([]);
  const [other, setOther] = useState<string[]>([]);

  useEffect(() => {
    if (!roomData) return;

    setAccessibility((roomData?.accessibility ?? []).filter((info): info is string => typeof info === 'string'));
    setBathroom((roomData?.bathroom ?? []).filter((info): info is string => typeof info === 'string'));
    setBedroom((roomData?.bedroom ?? []).filter((info): info is string => typeof info === 'string'));
    setFoodAndDrink((roomData?.foodAndDrink ?? []).filter((info): info is string => typeof info === 'string'));
    setInternet((roomData?.internet ?? []).filter((info): info is string => typeof info === 'string'));
    setOther((roomData?.other ?? []).filter((info): info is string => typeof info === 'string'));
  }, [roomData]);

  return {
    roomServices: { accessibility, bathroom, bedroom, foodAndDrink, internet, other },
    setterServices: { setAccessibility, setBathroom, setBedroom, setFoodAndDrink, setInternet, setOther },
  };
};
