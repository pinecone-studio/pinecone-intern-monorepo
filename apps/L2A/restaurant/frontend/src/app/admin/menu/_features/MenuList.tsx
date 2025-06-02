'use client';

import { useGetCategoriesQuery } from '@/generated';
import DeleteUpdateDialog from './DeleteUpdateDialog';

const MenuList = () => {
  const { data, loading, error } = useGetCategoriesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching categories: {error.message}</p>;

  return (
    <div data-cy="food-card" className="w-[515px] flex flex-col">
      <div data-cy="food" className="flex flex-col w-[536px]">
        {data?.getCategories?.map((category) =>
          category ? (
            <div
              data-cy="category-buttons"
              key={category._id}
              className="flex justify-between px-3 py-5 text-[16px] border-b"
            >
              {category.name}
              <DeleteUpdateDialog  />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default MenuList;
