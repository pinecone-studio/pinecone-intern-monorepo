'use client';
import { LeftSection } from '../_features/add';
import { RightSection } from '../_features/add';
import { Formik, Form } from 'formik';
import { articleSchema } from '@/lib/validation-schema';
// import { SelectedCategoriesProvider, useSelectedCategories } from '@/common/providers/CategoryContext';


interface Values {
  title: string;
  body: string;
}
export default async function Index() {
  const initialValues: Values = {
    title: '',
    body: '',
  };

  // const { selectedCategories } = useSelectedCategories();

  const handleSubmit = async () => {
    // console.log(selectedCategories);
    
  };

  return (
    <div className="bg-[#F7F7F8]">
      <Formik initialValues={initialValues} validationSchema={articleSchema} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div className="flex items-center justify-center">
              <LeftSection />
              <RightSection typeText="submit"  />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
