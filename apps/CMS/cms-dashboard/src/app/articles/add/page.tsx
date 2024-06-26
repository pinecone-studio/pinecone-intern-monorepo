'use client';
import { TextField, RightField } from '../_features';
import { Formik, Form } from 'formik';
import { articleSchema } from '@/lib/validation-schema';

export default async function Index() {
  interface Values {
    title: string;
    body: string;
  }

  const initialValues: Values = {
    title: '',
    body: '',
  };
  const handleSubmit = async () => {
    alert('ajillaa');
  };

  return (
    <div className="bg-[#F7F7F8]">
      <Formik initialValues={initialValues} validationSchema={articleSchema} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex items-center justify-center">
              {/* Left container */}
              <TextField />
              {/* Right container */}
              <RightField text="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
