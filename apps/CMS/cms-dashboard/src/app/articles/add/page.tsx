'use client';
import { LeftSection, RightSection } from '../_features';
import { Formik, Form } from 'formik';
import { articleSchema } from '@/lib/validation-schema';
import { useState } from 'react';

export default async function Index() {
  const [file, setFile] = useState<File | null>(null);
  type Values = {
    title: string;
    body: string;
  }

  const initialValues: Values = {
    title: '',
    body: '',
  };
  const handleSubmit = async () => {
  };

  return (
    <div className="bg-[#F7F7F8]">
      <Formik initialValues={initialValues} validationSchema={articleSchema} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex items-center justify-center">
              <LeftSection />
              <RightSection  setFile={setFile} text="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
