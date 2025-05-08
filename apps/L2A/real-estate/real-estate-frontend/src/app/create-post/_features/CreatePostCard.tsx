import * as React from 'react';
import { CreatePostHeader } from '../_components/CreatePostHeader';
import { CreatePostType } from '../_components/CreatePostType';
import { CreatePostName } from '../_components/CreatePostName';
import { CreatePostPrice } from '../_components/CreatePostPrice';
import { CreatePostField } from '../_components/CreatePostField';
import { CreatePostRestroom } from '../_components/CreatePostRestroom';
import { CreatePostRoom } from '../_components/CreatePostRoom';
import { CreatePostParking } from '../_components/CreatePostParking';
import { CreatePostText } from '../_components/CreatePostText';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { CreatePostLocation } from '../_components/CreatePostLocation';
import { CreatePostDistrict } from '../_components/CreatePostDistrict';
import { CreatePostSection } from '../_components/CreatePostSection';
import { CreatePostApartment } from '../_components/CreatePostApartment';
import { CreatePostYear } from '../_components/CreatePostYear';
import { CreatePostWindow } from '../_components/CreatePostWindow';

const validationSchema = Yup.object({
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
  district: Yup.string().required('Дүүрэг заавал оруулна уу!'),
  section: Yup.string().required('Хороо заавал оруулна уу!'),
  year: Yup.number()
    .required('Ашиглалтанд орсон он заавал оруулна уу!'),
  windows: Yup.number()
    .required('Цонхны тоо заавал оруулна уу!')
    .min(1, 'Цонхны тоо 1-ээс их байх ёстой!'),
});

const getFieldError = (touched: { [key: string]: boolean }, errors: { [key: string]: string }, field: string) => (touched[field] && errors[field] ? errors[field] : undefined);

export const CreatePostCard = () => {
  const formik = useFormik({
    initialValues: {
      type: '',
      name: '',
      price: '',
      field: '',
      room: '',
      restroom: '',
      parking: '',
      text: '',
      location: '',
      district: '',
      section: '',
      year: '',
      windows: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2 gap-2">
      <div className="w-full py-6 px-6 bg-[#F4F4F5] flex justify-center items-center">
        <div>
          <div className="p-4 flex flex-col gap-4 bg-[#FFFFFF] rounded-lg items-center">
            <div className="p-2 space-y-2 mt-1">
              <CreatePostHeader />
              <CreatePostType name="type" value={formik.values.type} onChange={(value) => formik.setFieldValue('type', value)} error={getFieldError(formik.touched, formik.errors, 'type')} />
              <CreatePostName name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'name')} />
              <CreatePostPrice name="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'price')} />
              <CreatePostField name="field" value={formik.values.field} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'field')} />
              <CreatePostRoom name="room" value={formik.values.room} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'room')} />
              <CreatePostRestroom
                name="restroom"
                value={formik.values.restroom}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched, formik.errors, 'restroom')}
              />
              <CreatePostParking
                name="parking"
                value={formik.values.parking}
                onChange={(value) => formik.setFieldValue('parking', value)}
                error={getFieldError(formik.touched, formik.errors, 'parking')}
              />
              <CreatePostText name="text" value={formik.values.text} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'text')} />
            </div>
          </div>
          <div className="p-4 flex flex-col mt-4 gap-4 bg-[#FFFFFF] rounded-lg items-center">
            <div className="p-2 space-y-2 mt-1">
              <CreatePostLocation />
              <CreatePostDistrict
                name="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched, formik.errors, 'district')}
              />
              <CreatePostSection
                name="section"
                value={formik.values.section}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={getFieldError(formik.touched, formik.errors, 'section')}
              />
              <CreatePostText name="text" value={formik.values.text} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'text')} />
            </div>
          </div>
          <div className="p-4 flex flex-col mt-4 gap-4 bg-[#FFFFFF] rounded-lg items-center">
            <div className="p-2 space-y-2 mt-1">
              <CreatePostApartment />
              <CreatePostYear name="year" value={formik.values.year} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'year')} />
              <CreatePostWindow name='windows' value={formik.values.windows} onChange={formik.handleChange} onBlur={formik.handleBlur} error={getFieldError(formik.touched, formik.errors, 'windows')} />
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="bg-green-200 p-2 rounded-lg">
            Зар оруулах хүсэлт илгээх
          </button>
        </div>
      </div>
    </form>
  );
};
