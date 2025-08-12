'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useGetCategoriesQuery } from '@/generated';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaFood } from '@/utils/FormSchemas';

type SelectInputProps = {
  control: Control<z.infer<typeof formSchemaFood>>;
};

export const SelectCategoryInput = ({ control }: SelectInputProps) => {
  const { data, error, loading } = useGetCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  if (error) {
    throw new Error(`Error: ${error.message}`);
  }

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
                data-testid="create-food-category-select"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <span>{field.value ? data?.getCategories.find((cat) => cat?.categoryId === field.value)?.categoryName : loading ? 'Loading...' : 'Категори'}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </FormControl>

            {isOpen && (
              <div
                data-testid="create-food-category-dropdown"
                className="absolute top-full z-50 w-full rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80"
                role="listbox"
              >
                {loading ? (
                  <div className="px-2 py-1.5 text-sm" data-testid="select-category-loading">
                    Loading...
                  </div>
                ) : (
                  data?.getCategories.map((category) => (
                    <button
                      key={category?.categoryId}
                      type="button"
                      className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      data-testid={`create-food-category-option-${category?.categoryId}`}
                      onClick={() => {
                        field.onChange(category?.categoryId);
                        setIsOpen(false);
                      }}
                      role="option"
                    >
                      {category?.categoryName}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
