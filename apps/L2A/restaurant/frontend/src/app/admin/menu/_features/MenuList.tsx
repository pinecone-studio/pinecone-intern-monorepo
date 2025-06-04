'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useGetCategoriesQuery } from '@/generated';
import DeleteUpdateDialog from './DeleteUpdateDialog';


const MenuList = () => {
  const [success, setSuccess] = useState(false);
  const { data, loading, error, refetch } = useGetCategoriesQuery();

  const handleSuccess = () => {
    setSuccess(true);
    refetch(); 
    setTimeout(() => setSuccess(false), 3000);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching categories: {error.message}</p>;

  return (
    <>
      <div data-cy="food-card" className="w-[515px] flex flex-col">
        <div data-cy="food" className="flex flex-col w-[536px]">
          {data?.getCategories?.map((category) =>
            category ? (
              <div
              data-testid={`category-row-${category._id}`}
                key={category._id}
                className="flex justify-between px-3 py-5 text-[16px] border-b"
              >
                {category.name}
                <DeleteUpdateDialog categoryId={category._id} onSuccess={handleSuccess}/>  
              </div>
            ) : null
          )}
        </div>
      </div>

      {success && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg flex items-center gap-2 z-50">
          <CheckCircle className="w-5 h-5" />
          <span>Амжилттай устгалаа!</span>
        </div>
      )}
    </>
  );
};

export default MenuList;