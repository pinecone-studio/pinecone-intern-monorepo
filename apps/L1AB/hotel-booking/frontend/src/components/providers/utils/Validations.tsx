import * as Yup from 'yup';

export const hotelValidations = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().min(8, 'Phone must be at least 8 characters').required('Phone is required'),
  description: Yup.string(),
  rating: Yup.number().min(0).max(10),
  stars: Yup.number().min(0).max(5),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  images: Yup.array().of(Yup.string().url()),
});
export const roomValidations = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  roomNumber: Yup.string().required('Room number is required'),
  roomType: Yup.string().required('Room type is required'),
  price: Yup.number().required('Price is required'),
  photos: Yup.array().of(Yup.string().url()),
});
