import { Category, useGetCategoriesQuery } from '@/generated';
import { CategorySelectInput, Title } from '../_components';
import { ChangeEventHandler, FocusEventHandler } from 'react';

export type CategorySelectInputFeatureProps = {
  onBlur?: FocusEventHandler<HTMLSelectElement> | undefined;
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  name: string;
  value: string | undefined;
  helperText?: string;
  formikError?: boolean | undefined;
  defaultValue: string | undefined;
};

export const CategorySelectInputFeature = (props: CategorySelectInputFeatureProps) => {
  const { data, loading, error } = useGetCategoriesQuery();
  const categories = data?.getCategories as [Category] | undefined;

  if (error) {
    throw new Error(`Error: ${error.message}`);
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <Title title="Ангилал" />
      <CategorySelectInput {...props} categories={categories} loading={loading} />
    </div>
  );
};
