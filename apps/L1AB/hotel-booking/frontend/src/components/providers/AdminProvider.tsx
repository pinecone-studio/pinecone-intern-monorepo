'use client';

import { GetHotelByIdQuery, GetRoomByIdQuery, useCreateHotelMutation, useGetHotelByIdQuery, useGetRoomByIdQuery } from '@/generated';
import { FormikErrors, FormikProps, FormikTouched, useFormik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import { hotelValidations, roomValidations } from './utils/Validations';

type HotelFormValues = {
  name: string;
  phone: string;
  description: string;
  rating: number;
  stars: number;
  address: string;
  city: string;
  images: string[];
};
type RoomFormValues = {
  name: string;
  description: string;
  roomNumber: string;
  roomType: string;
  price: number;
  photos?: string[] | null;
};
type AdminContextType = {
  isAdmin: boolean;
  addHotelForm: FormikProps<HotelFormValues>;
  addRoomForm: FormikProps<RoomFormValues>;
  hotelData: GetHotelByIdQuery | undefined;
  roomData: GetRoomByIdQuery | undefined;
  hotelLoading: boolean;
  roomLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  showError: (field: keyof HotelFormValues, errors: FormikErrors<HotelFormValues>, touched: FormikTouched<HotelFormValues>) => boolean;
};
const AdminContext = createContext<AdminContextType>({} as AdminContextType);
export const AdminProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { hotel, room } = useParams();
  const { data: hotelData, loading: hotelLoading } = useGetHotelByIdQuery({ variables: { id: hotel as string } });
  const { data: roomData, loading: roomLoading } = useGetRoomByIdQuery({ variables: { id: room as string } });
  const [createHotel] = useCreateHotelMutation();

  const addHotelForm = useFormik<HotelFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      phone: '',
      description: '',
      rating: 0,
      stars: 0,
      address: '',
      city: 'city',
      images: [],
    },
    validationSchema: hotelValidations,
    onSubmit: async (values) => {
      const { data: newHotelData } = await createHotel({
        variables: {
          input: { ...values },
        },
      });
      const newHotelId = newHotelData?.createHotel._id;
      router.push(`/admin/hotel/${newHotelId}`);
    },
  });
  const addRoomForm = useFormik<RoomFormValues>({
    enableReinitialize: true,
    initialValues: {
      name: '',
      description: '',
      roomNumber: '',
      roomType: '',
      price: 0,
      photos: [],
    },
    validationSchema: roomValidations,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  useEffect(() => {
    if (roomData) {
      addRoomForm.setValues({
        ...roomData.getRoomById[0],
      });
    }
  }, [roomData]);
  useEffect(() => {
    if (hotelData) {
      addHotelForm.setValues({
        ...hotelData.getHotelById,
      });
    }
  }, [hotelData]);
  const showError = (field: keyof HotelFormValues, errors: FormikErrors<HotelFormValues>, touched: FormikTouched<HotelFormValues>) => {
    if (!errors || !touched) {
      return false;
    }
    return Boolean(errors[field] && touched[field]);
  };
  return <AdminContext.Provider value={{ isAdmin: true, addHotelForm, addRoomForm, showError, hotelData, roomData, hotelLoading, roomLoading }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
