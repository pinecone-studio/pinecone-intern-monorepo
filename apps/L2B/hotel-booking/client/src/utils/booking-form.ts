import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRoomQuery, useCreateBookingMutation, useGetUserQuery } from '@/generated';
import { useAuth } from '@/app/(main)/_context/AuthContext';

const createInitialFormData = () => ({
  guestDetails: {
    firstName: '',
    lastName: '',
  },
  contactInfo: {
    email: '',
    phone: '',
  },
  cardDetails: {
    nameOnCard: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    country: '',
  },
});

const createGuestDetails = (user: any) => ({
  firstName: user.firstName || '',
  lastName: user.lastName || '',
});

const createContactInfo = (user: any) => ({
  email: user.email || '',
  phone: user.phone || '',
});

const createUpdatedFormData = (userData: any, currentCardDetails: any) => ({
  guestDetails: createGuestDetails(userData.getUser),
  contactInfo: createContactInfo(userData.getUser),
  cardDetails: currentCardDetails,
});

const parseSearchParams = (searchParams: URLSearchParams) => {
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const adults = parseInt(searchParams.get('adults') || '1');
  const children = parseInt(searchParams.get('children') || '0');
  return { from, to, adults, children };
};

const createDateObjects = (from: string | null, to: string | null) => {
  const checkInDate = from ? new Date(from) : null;
  const checkOutDate = to ? new Date(to) : null;
  return { checkInDate, checkOutDate };
};

export const useBookingForm = (roomId: string) => {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const userId = user?._id;

  const { data: userData } = useGetUserQuery({
    skip: !userId,
    variables: { id: userId ?? '' },
  });

  const [formData, setFormData] = useState(createInitialFormData());

  const updateFormDataFromUser = () => {
    if (!userData?.getUser) return;

    const updatedData = createUpdatedFormData(userData, formData.cardDetails);
    setFormData(updatedData);
  };

  useEffect(() => {
    updateFormDataFromUser();
  }, [userData]);

  const { data, loading: roomLoading } = useRoomQuery({
    variables: { roomId },
    skip: !roomId,
  });

  const [createBooking, { loading: bookingLoading }] = useCreateBookingMutation();

  const room = data?.room;
  const { from, to, adults, children } = parseSearchParams(searchParams);
  const { checkInDate, checkOutDate } = createDateObjects(from, to);

  return {
    formData,
    setFormData,
    room,
    checkInDate,
    checkOutDate,
    adults,
    children,
    roomLoading,
    bookingLoading,
    createBooking,
    user,
    userData,
  };
};

export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

export const calculateTotalPrice = (checkIn: Date | null, checkOut: Date | null, pricePerNight: number): number => {
  if (!checkIn || !checkOut) return 0;
  const nights = calculateNights(checkIn, checkOut);
  return nights * pricePerNight;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};
