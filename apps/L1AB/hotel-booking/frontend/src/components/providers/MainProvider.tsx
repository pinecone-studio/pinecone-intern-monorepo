'use client';

import { Room, useGetAvailableRoomsQuery } from '@/generated';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type SimplifiedRoom = Omit<Room, 'hotelId'> & {
  hotelId: {
    __typename?: 'Hotel';
    _id: string;
    name: string;
    description: string;
    images: string[];
    address: string;
    phone: string;
    city: string;
    rating: number;
    stars: number;
  };
};

type DateRangeType = {
  checkIn: Date;
  checkOut: Date;
};

type MainContextType = {
  setDateRange: Dispatch<SetStateAction<DateRangeType>>;
  setTraveler: Dispatch<SetStateAction<number>>;
  data: SimplifiedRoom[];
};

const MainContext = createContext<MainContextType>({} as MainContextType);

export const MainProvider = ({ children }: PropsWithChildren) => {
  const [dateRange, setDateRange] = useState<DateRangeType>({
    checkIn: new Date(),
    checkOut: new Date(),
  });
  const [traveler, setTraveler] = useState<number>(1);

  const { data } = useGetAvailableRoomsQuery({
    onError: (error) => {
      toast.error(error.message);
    },
    variables: {
      dateRange,
      traveler,
    },
  });

  return (
    <MainContext.Provider
      value={{
        data: (data?.getAvailableRooms ?? []) as SimplifiedRoom[],
        setDateRange,
        setTraveler,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMain = (): MainContextType => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMain must be used within a MainProvider');
  }
  return context;
};
