'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useGetCategoriesQuery } from '@/generated';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaFood } from '@/helpers/form-schemas';

type SelectInputProps = {
  control: Control<z.infer<typeof formSchemaFood>>;
};

export const SelectCategoryInput = ({ control }: SelectInputProps) => {
  const { data, error, loading } = useGetCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  const isButtonDisabled = () => {
    return !loading && (!data?.getCategories || data.getCategories.length === 0);
  };

  const handleCategorySelect = (categoryId: string | undefined, onChange: (_value: string | undefined) => void) => {
    onChange(categoryId);
    setIsOpen(false);
  };

  const getButtonText = (fieldValue: string | undefined) => {
    if (error) return 'Категори сонгоход алдаа гарлаа!';
    if (loading) return 'Loading...';
    if (!fieldValue) return 'Категори';

    const category = data?.getCategories.find((cat) => cat?.categoryId === fieldValue);
    return category?.categoryName || 'Категори';
  };

  const renderDropdownContent = (onChange: (_value: string | undefined) => void) => {
    if (loading) {
      return (
        <div className="px-2 py-1.5 text-sm" data-testid="select-category-loading">
          Loading...
        </div>
      );
    }

    return data?.getCategories.map((category) => (
      <button
        key={category?.categoryId}
        type="button"
        className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        data-testid={`create-food-category-option-${category?.categoryId}`}
        data-cy={`create-food-category-option-${category?.categoryName}`}
        onClick={() => handleCategorySelect(category?.categoryId, onChange)}
        role="option"
        aria-selected
      >
        {category?.categoryName}
      </button>
    ));
  };

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <div className="relative">
            <FormControl>
              <button
                type="button"
                data-cy="create-food-category-select"
                data-testid="create-food-category-select"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls="category-listbox"
                aria-busy={loading}
                disabled={isButtonDisabled() || !!error}
              >
                <span>{getButtonText(field.value)}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </FormControl>

            {isOpen && (
              <div
                data-testid="create-food-category-dropdown"
                className="absolute top-full z-50 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80"
                role="listbox"
              >
                {renderDropdownContent(field.onChange)}
              </div>
            )}
          </div>
          <FormMessage data-cy="create-food-category-select-error-message" />
        </FormItem>
      )}
    />
  );
};
