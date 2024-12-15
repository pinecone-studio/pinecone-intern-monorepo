'use client';

import { Room, useGetAvailableRoomsLazyQuery } from '@/generated'; // Use the lazy query hook
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { toast } from 'react-toastify';

type DateRangeType = {
  checkIn: string;
  checkOut: string;
};

type GetAvailableRoomsType = {
  dateRange: DateRangeType;
  traveler: number;
};

type MainContextType = {
  getAvailableRooms: (params: GetAvailableRoomsType) => Promise<void>;
  availableRooms: Room[] | null;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [availableRooms, setAvailableRooms] = useState<Room[] | null>(null);

  const [fetchAvailableRooms] = useGetAvailableRoomsLazyQuery();

  const getAvailableRooms = async ({ dateRange, traveler }: GetAvailableRoomsType) => {
    try {
      const { data } = await fetchAvailableRooms({
        variables: { dateRange, traveler },
      });

      if (data && data.getAvailableRooms) {
        setAvailableRooms(data.getAvailableRooms);
        toast.success('Rooms fetched successfully!');
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return <MainContext.Provider value={{ getAvailableRooms, availableRooms }}>{children}</MainContext.Provider>;
};

export const useMain = (): MainContextType => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMain must be used within a MainProvider');
  }
  return context;
};
