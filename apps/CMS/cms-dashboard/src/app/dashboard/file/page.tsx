'use client';

import { useFormik } from 'formik';
import { FileUpload } from '../_components/FileUpload';
import * as yup from 'yup';

const validatinSchema = yup.object({
  thumbnail: yup.string().required(),
});

const Uploader = () => {
  const formik = useFormik({
    initialValues: {
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: () => {},
  });

  return (
    <div className="p-6">
      <FileUpload thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
    </div>
  );
};

export default Uploader;
