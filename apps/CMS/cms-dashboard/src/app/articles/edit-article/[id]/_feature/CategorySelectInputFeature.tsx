import { Category, useGetCategoriesQuery } from '@/generated';
import { CategorySelectInput, InputLabel } from '../_components';
import { EDIT_INPUT_PROPS } from '../_components/common';

export const CategorySelectInputFeature = (props: EDIT_INPUT_PROPS) => {
  const { name, value, defaultValue, onBlur, onChange } = props;
  const { data, loading, error } = useGetCategoriesQuery();
  const categories = data?.getCategories as [Category] | undefined;

  if (error) {
    throw new Error(`Error: ${error.message}`);
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <InputLabel title="Ангилал" />
      <CategorySelectInput name={name} value={value} defaultValue={defaultValue} onBlur={onBlur} onChange={onChange} loading={loading} categories={categories} />
    </div>
  );
};
