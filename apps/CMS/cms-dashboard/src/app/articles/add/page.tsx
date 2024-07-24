'use client';
import { LeftSection, RightSection } from '../_features/add';
import { Formik, Form, FormikHelpers, FormikTouched } from 'formik';
import { articleSchema } from '@/lib/validation-schema';
import { useState, useCallback } from 'react';

interface Values {
  title: string;
  body: string;
}
export default async function Index() {
  type Values = {
    title: string;
    body: string;
    image: File | null;
  }

  const initialValues: Values = {
    title: '',
    body: '',
    image: null,
  };
  const handleSubmit = (values: Values, { setTouched }:FormikHelpers<Values>) => {
    const touchedFields: FormikTouched<Values> = {
      title: true,
      body: true,
      image: true,
    };
    setTouched(touchedFields);
  };

  return (
    <div className="bg-[#F7F7F8]">
      <Formik initialValues={initialValues} validationSchema={articleSchema} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex items-center justify-center">
              <LeftSection />
              {/* Right container */}
              <RightSection/>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
