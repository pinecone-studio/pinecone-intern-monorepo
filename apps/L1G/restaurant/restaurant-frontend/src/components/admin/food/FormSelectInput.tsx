'use client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGetCategoriesQuery } from '@/generated';

export const SelectCategoryInput = ({ onChange, defaultValue }: { onChange: () => void; defaultValue: string }) => {
  const { data, error, loading } = useGetCategoriesQuery();
  if (error) {
    throw new Error(`Error: ${error.message}`);
  }

  return (
    <Select data-testid="category-select" onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Категори" />
      </SelectTrigger>
      {loading && <SelectContent>Loading...</SelectContent>}
      <SelectContent>
        {data?.getCategories.map((category) => (
          <SelectItem data-testid="category-select-input" key={category?.categoryId} value={category?.categoryId as string}>
            {category?.categoryName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
