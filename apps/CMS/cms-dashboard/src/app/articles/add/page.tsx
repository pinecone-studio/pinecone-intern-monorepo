'use client';
import { ImageInput } from '@/app/articles/_components/index';
import { useState } from 'react';
import { TextField } from '../_features';
import { Formik, Form, FormikHelpers } from 'formik';
import { articleSchema } from '@/lib/validation-schema';

export default async function Index() {
  const [file, setFile] = useState<File | null>(null);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  console.log(file);

  interface Values {
    title: string;
    body: string;
  }

  const initialValues: Values = {
    title: '',
    body: '',
  };

  const handleSubmit = async () => {
    console.log('testing');
  };

  return (
    <div className="bg-[#F7F7F8]">
      <Formik initialValues={initialValues} validationSchema={articleSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="flex items-center justify-center">
              {/* Left container */}
              <TextField />
              {/* Right container */}
              <div className="bg-white flex-1 p-6">
                <ImageInput setFile={setFile} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
