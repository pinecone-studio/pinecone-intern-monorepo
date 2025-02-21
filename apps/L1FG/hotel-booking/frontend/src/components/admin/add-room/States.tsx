'use client';

import { useState } from 'react';

export const useRoomImages = () => {
  const [images, setImages] = useState<string[]>([]);

  return {
    roomImages: { images },
    setterImages: { setImages },
  };
};

export const useRoomState = () => {
  const [bed, setBed] = useState<string>('');
  const [tax, setTax] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [roomInfo, setRoomInfo] = useState<string[]>([]);

  return {
    roomGeneralInfo: { bed, tax, name, type, price, roomNumber, roomInfo },
    setterGeneralInfo: { setBed, setTax, setName, setType, setPrice, setRoomNumber, setRoomInfo },
  };
};

export const useRoomServices = () => {
  const [accessibility, setAccessibility] = useState<string[]>([]);
  const [bathroom, setBathroom] = useState<string[]>([]);
  const [bedroom, setBedroom] = useState<string[]>([]);
  const [foodAndDrink, setFoodAndDrink] = useState<string[]>([]);
  const [internet, setInternet] = useState<string[]>([]);
  const [other, setOther] = useState<string[]>([]);

  return {
    roomServices: { accessibility, bathroom, bedroom, foodAndDrink, internet, other },
    setterServices: { setAccessibility, setBathroom, setBedroom, setFoodAndDrink, setInternet, setOther },
  };
};
