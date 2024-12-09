'use client';

import { useCreateHotelMutation, useGetHotelByIdQuery } from '@/generated';
import { FormikErrors, FormikProps, FormikTouched, useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useEffect } from 'react';
import * as Yup from 'yup';

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

type AdminContextType = {
  isAdmin: boolean;
  addHotelForm: FormikProps<HotelFormValues>;
  // eslint-disable-next-line no-unused-vars
  showError: (field: keyof HotelFormValues, errors: FormikErrors<HotelFormValues>, touched: FormikTouched<HotelFormValues>) => boolean;
};
const AdminContext = createContext<AdminContextType>({} as AdminContextType);
export const AdminProvider = ({ children }: PropsWithChildren) => {
  const { hotel } = useParams();
  const { data: hotelData } = useGetHotelByIdQuery({ variables: { id: hotel as string } });
  const [createHotel] = useCreateHotelMutation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().min(8, 'Phone must be at least 8 characters').required('Phone is required'),
    description: Yup.string(),
    rating: Yup.number().min(0).max(10),
    stars: Yup.number().min(0).max(5),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    images: Yup.array().of(Yup.string().url()),
  });
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
    validationSchema,
    onSubmit: async (values) => {
      const { data: newHotelData } = await createHotel({
        variables: {
          input: { ...values },
        },
      });
      const newHotelId = newHotelData?.createHotel._id;
      console.log(newHotelId);
    },
  });
  useEffect(() => {
    if (hotelData) {
      addHotelForm.setValues({
        ...hotelData.getHotelById,
      });
    }
  }, [addHotelForm, hotelData]);
  const showError = (field: keyof HotelFormValues, errors: FormikErrors<HotelFormValues>, touched: FormikTouched<HotelFormValues>) => {
    if (!errors || !touched) {
      return false;
    }
    return Boolean(errors[field] && touched[field]);
  };
  // useEffect(() => {
  //   console.log('Is form valid:', addHotelForm.isValid); // Logs true/false based on validation status
  //   console.log('Validation errors:', addHotelForm.errors); // Logs validation errors, if any
  // }, [addHotelForm.isValid, addHotelForm.errors]);
  return <AdminContext.Provider value={{ isAdmin: true, addHotelForm, showError }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => useContext(AdminContext);
