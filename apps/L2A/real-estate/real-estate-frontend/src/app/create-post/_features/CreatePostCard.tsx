import * as React from 'react';
import { CreatePostHeader } from '../_components/CreatePostHeader';
import { CreatePostName } from '../_components/CreatePostName';
import { CreatePostPrice } from '../_components/CreatePostPrice';
import { CreatePostField } from '../_components/CreatePostField';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
  name: Yup.string().required('Нэр заавал оруулна уу'),
  field: Yup.number().required('Талбайн утгыг заавал оруулна уу').min(10, 'Талбайн утга 2-оос дээш байх ёстой'),
});

export const CreatePostCard = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      field: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 gap-2">
      <div className="w-full h-screen bg-[#F4F4F5] flex justify-center items-center ">
        <div className="w-[728px] h-[842px] flex flex-col gap-4 bg-[#FFFFFF] rounded-lg items-center">
          <div className="w-[680px] h-[692px] space-y-4 mt-6">
            <div className="space-y-2">
              <CreatePostHeader />
            </div>
            <CreatePostName
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
              onBlur={formik.handleBlur}
            />
            <CreatePostPrice />
            <CreatePostField
              name="field"
              value={formik.values.field}
              onChange={formik.handleChange}
              error={formik.touched.field && formik.errors.field ? formik.errors.field : undefined}
              onBlur={formik.handleBlur}
            />
            <div className="w-full"></div>
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
