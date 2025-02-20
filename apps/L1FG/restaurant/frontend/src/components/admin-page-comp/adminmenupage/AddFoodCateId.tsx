import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import { useGetFoodsQuery, useUpdateFoodCategoryMutation } from '@/generated';
import { toast } from 'sonner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface addInput {
  categoryId: string;
  refetch: any;
}

const AddFoodCateId = ({ categoryId, refetch }: addInput) => {
  const [updateFoodCateId, { loading }] = useUpdateFoodCategoryMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFoodId, setFoodId] = useState('');
  const { data: foodData } = useGetFoodsQuery();

  const handleDelete = async () => {
    try {
      await updateFoodCateId({
        variables: {
          input: {
            categoryId: categoryId,
            foodId: selectedFoodId,
          },
        },
      });
      setIsOpen(false);
      toast.success('Амжилттай нэмэгдлээ!');
      await refetch();
    } catch (err) {
      console.log(err);
      toast.error('Алдаа гарлаа! Дахин оролдоно уу.');
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#F4F4F5] border border-[#E4E4E7] flex justify-center items-center gap-2 px-4 ">
          <div className="text-sm">Бүтээгдэхүүнээс</div>
          <Plus width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[330px] flex pt-4 flex-col gap-4">
        <div className="flex flex-col">
          <div className="w-full flex justify-end">
            <DialogClose data-testid="X">
              <X height={16} width={16} />
            </DialogClose>
          </div>
          <div className="text-[#09090B] text-lg font-semibold pb-4">Цэсэнд нэмэх</div>
          <Select onValueChange={setFoodId}>
            <SelectTrigger className="w-full" data-testid="select-trig">
              <SelectValue placeholder="Бүтээгдэхүүн нэмэх" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {foodData?.getFoods.map((food) => (
                  <SelectItem key={food.id} value={food.id}>
                    {food.foodName}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="mt-1" onClick={handleDelete} disabled={loading}>
          {loading ? 'Нэмэж байна...' : 'Нэмэх'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddFoodCateId;
