'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Food, GetCategoriesQuery, GetDiscountsQuery, useAddFoodToCategoryMutation, useAddFoodToDiscountMutation } from '@/generated';
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ApolloQueryResult } from '@apollo/client';

export const FoodAddDialog = ({
  type,
  activeMenu,
  filteredData,
  refetchCategories,
  refetchDiscounts,
}: {
  type: string;
  activeMenu: string;
  filteredData: Food[];
  refetchCategories: () => Promise<ApolloQueryResult<GetCategoriesQuery>>;
  refetchDiscounts: () => Promise<ApolloQueryResult<GetDiscountsQuery>>;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addFoodToCategory, { loading: categoryLoading }] = useAddFoodToCategoryMutation();
  const [addFoodToDiscount, { loading: discountLoading }] = useAddFoodToDiscountMutation();

  const selectedFood = filteredData?.find((food) => food?.foodId === selectedFoodId);

  const handleAddFoodToCategory = async () => {
    try {
      await addFoodToCategory({
        variables: {
          categoryId: activeMenu,
          foodId: selectedFoodId,
        },
      });
      await refetchCategories();
      setIsOpen(false);
      toast.success('Хоол цэсэнд нэмэгдлээ!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Хоол нэмэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  const handleAddFoodToDiscount = async () => {
    try {
      await addFoodToDiscount({
        variables: {
          discountId: activeMenu,
          foodId: selectedFoodId,
        },
      });
      await refetchDiscounts();
      setIsOpen(false);
      toast.success('Хоол цэсэнд нэмэгдлээ!', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Хоол нэмэхэд алдаа гарлаа!', {
        position: 'bottom-right',
      });
    }
  };

  const resetForm = () => {
    setSelectedFoodId('');
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button data-testid="food-add-dialog-trigger" variant="secondary" className="flex gap-2" onClick={() => resetForm()}>
            Бүтээгдэхүүнээс <Plus className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="flex w-full justify-between items-center">
              <DialogTitle data-testid="food-add-dialog-title" className="text-lg leading-[18px] font-semibold text-[#09090B]">
                Цэсэнд нэмэх
              </DialogTitle>
              <DialogClose>
                <X className="w-4 h-4" />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="relative w-full">
            <button
              type="button"
              data-testid="food-add-select-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="truncate text-sm leading-[20px] text-[#09090B]">
                {selectedFood ? (
                  selectedFood.foodName
                ) : (
                  <div className="flex w-full justify-between items-center">
                    <p className="text-sm leading-[20px] text-gray-500">Бүтээгдэхүүн нэмэх</p>
                    <div>
                      <ChevronsUpDown className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>
            </button>

            {isDropdownOpen && (
              <div data-testid="food-add-dropdown" className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredData?.map((food) => (
                  <button
                    key={food?.foodId}
                    type="button"
                    data-testid={`food-add-option-${food?.foodId}`}
                    onClick={() => {
                      setSelectedFoodId(food?.foodId as string);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex justify-between items-center"
                  >
                    <span>{food?.foodName}</span>
                    {selectedFoodId === food?.foodId && <Check data-testid="select-food-check" className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              data-testid="food-add-submit-button"
              type="submit"
              className="flex w-full h-[36px] rounded-md py-2 px-4 bg-[#1D1F24]"
              disabled={categoryLoading || discountLoading}
              onClick={type === 'category' ? handleAddFoodToCategory : handleAddFoodToDiscount}
            >
              Нэмэх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
