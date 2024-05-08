import { Category, useGetCategoriesQuery } from '@/generated';
import { CategorySelectInput, Title } from '../_components';

export const CategorySelectInputFeature = () => {
  const { data, loading, error } = useGetCategoriesQuery();
  const categories = data?.getCategories as [Category] | undefined;

  if (error) {
    throw new Error(`Error: ${error.message}`);
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <Title title="Ангилал" />
      <CategorySelectInput categories={categories} loading={loading} />
    </div>
  );
};
