import * as React from 'react';
import { CreatePostHeader } from '../_components/CreatePostHeader';
import { CreatePostType } from '../_components/CreatePostType';
import { CreatePostName } from '../_components/CreatePostName';
import { CreatePostPrice } from '../_components/CreatePostPrice';
import { CreatePostField } from '../_components/CreatePostField';
import { CreatePostRestroom } from '../_components/CreatePostRestroom';
import { CreatePostRoom } from '../_components/CreatePostRoom';
import * as Yup from 'yup';
import { useFormik } from 'formik';


const validationSchema = Yup.object({
  type: Yup.string().required('Төрлөө сонгоно уу'),
  name: Yup.string().required('Нэр заавал оруулна уу'),
  price: Yup.number().required('Үнэ заавал оруулна уу').min(0, 'Үнэ 0-ээс их байх ёстой'),
  field: Yup.number().required('Талбайн утгыг заавал оруулна уу').min(10, 'Талбайн утга 2-оос дээш оронтой байх ёстой'),
  room: Yup.number().required('Өрөөний тоог заавал оруулна уу').min(1, 'Өрөөний тоо 1-ээс их байх ёстой'),
  restroom: Yup.number().required('Ариун цэврийн өрөөний тоог заавал оруулна уу').min(1, 'Ариун цэврийн өрөөний тоо 1-ээс их байх ёстой'),
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
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-2 gap-2">
      <div className="w-full h-screen bg-[#F4F4F5] flex justify-center items-center">
        <div className="w-[728px] h-[842px] flex flex-col gap-4 bg-[#FFFFFF] rounded-lg items-center">
          <div className="w-[680px] h-[692px] space-y-2 mt-2">
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
