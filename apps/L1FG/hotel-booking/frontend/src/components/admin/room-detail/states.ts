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

export const useRoomServices = () => {
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');

  return {
    roomServices: { key, value },
    setterServices: { setKey, setValue },
  };
};
