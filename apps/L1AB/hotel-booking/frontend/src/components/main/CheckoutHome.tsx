'use client';

import { CheckingBookingRight } from './assets/CheckingBookingRight';
import { CheckingBookingLeft } from './assets/CheckingBookingLeft';
import { CreateBookingInput, Room, useGetMeQuery } from '@/generated';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type CheckingBookingLeftType = {
  setFormData: Dispatch<SetStateAction<CreateBookingInput>>;
  formData: CreateBookingInput;
};

export type CheckingBookingRightType = {
  formData: CreateBookingInput;
  roomData: Room;
};

export const CheckOutHome = ({ roomData }: { roomData: Room }) => {
  const { data } = useGetMeQuery();

  const [formData, setFormData] = useState<CreateBookingInput>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userId: '',
    checkIn: '',
    checkOut: '',
    isPaid: true,
    traveler: 1,
    roomId: roomData._id,
  });

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        ...prev,
        userId: data.getMe._id,
      }));
    }
    const dateNtraveler = localStorage.getItem('dateNtraveler');
    if (dateNtraveler) {
      const parsedData = JSON.parse(dateNtraveler);
      setFormData((prev) => ({
        ...prev,
        checkIn: parsedData.startDate,
        checkOut: parsedData.endDate,
        traveler: parsedData.traveler,
      }));
    }
  }, []);

  console.log({ roomData });

  return (
    <div className="w-full p-3">
      <div className=" flex justify-center "></div>
      <div className="flex justify-center p-3">
        <div className="w-full p-3 flex flex-row gap-12 justify-center ">
          <CheckingBookingLeft setFormData={setFormData} formData={formData} />
          <CheckingBookingRight roomData={roomData} formData={formData} />
        </div>
      </div>
    </div>
  );
};
