import * as Yup from 'yup';
import { useFormik } from 'formik';

export const useCreatePostFormik = () =>
  useFormik({
    initialValues: {
      type: '',
      name: '',
      price: '',
      field: '',
      room: '',
      restroom: '',
      parking: '',
      text: '',
      images: [],
      location: '',
      district: '',
      section: '',
      year: '',
      windows: '',
      window: '',
      door: '',
      floor: '',
      aptfloor: '',
      ground: '',
      balcony: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Төрлөө сонгоно уу!'),
      name: Yup.string().required('Нэр заавал оруулна уу!'),
      price: Yup.number()
        .transform((_value, originalValue) => Number(originalValue))
        .required('Үнэ заавал оруулна уу!')
        .min(0, 'Үнэ 0-ээс их байх ёстой!'),
      field: Yup.number()
        .transform((_value, originalValue) => Number(originalValue))
        .required('Талбайн утгыг заавал оруулна уу!')
        .min(10, 'Талбайн утга 2-оос дээш оронтой байх ёстой!'),
      room: Yup.number()
        .transform((_value, originalValue) => Number(originalValue))
        .required('Өрөөний тоог заавал оруулна уу!')
        .min(1, 'Өрөөний тоо 1-ээс их байх ёстой!'),
      restroom: Yup.number()
        .transform((_value, originalValue) => Number(originalValue))
        .required('Ариун цэврийн өрөөний тоог заавал оруулна уу!')
        .min(1, 'Ариун цэврийн өрөөний тоо 1-ээс их байх ёстой!'),
      parking: Yup.string().required('Зогсоол сонгоно уу!'),
      text: Yup.string().required('Дэлгэрэнгүй тайлбар оруулна уу!'),
      images: Yup.array().min(1, 'Зураг заавал оруулна уу!'),
      district: Yup.string().required('Дүүрэг заавал оруулна уу!'),
      section: Yup.string().required('Хороо заавал оруулна уу!'),
      year: Yup.number().required('Ашиглалтанд орсон он заавал оруулна уу!'),
      windows: Yup.number().required('Цонхны тоо заавал оруулна уу!').min(1, 'Цонхны тоо 1-ээс их байх ёстой!'),
      window: Yup.string().required('Цонхны загварыг заавал оруулна уу!'),
      door: Yup.string().required('Хаалганы загварыг заавал оруулна уу!'),
      floor: Yup.number().required('Давхар заавал оруулна уу!').min(1, 'Давхар 1-ээс их байх ёстой!'),
      aptfloor: Yup.number().required('Давхрын тоог заавал оруулна уу!').min(1, 'Давхрын тоо 1-ээс их байх ёстой!'),
      ground: Yup.string().required('Шалны загвар заавал оруулна уу!'),
      balcony: Yup.string().required('Тагтны тоо заавал оруулна уу!'),
    }),
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });
