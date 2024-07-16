'use client';
import { LeftSection } from '../_features/add';
import { RightSection } from '../_features/add';
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
  };

  return (
    <div className="bg-[#F7F7F8]">
      <Formik initialValues={initialValues} validationSchema={articleSchema} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex items-center justify-center">
              <LeftSection />
              <RightSection typeText="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
