import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import { useCreateCategoryMutation } from '@/generated';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface addInput {
  refetch: any;
}

const MenuAdd = ({ refetch }: addInput) => {
  const [createCate, { loading }] = useCreateCategoryMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const HandleAdd = async () => {
    try {
      await createCate({
        variables: {
          input: {
            categoryName: categoryName,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCategoryName(value);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#F4F4F5] border border-[#E4E4E7] flex justify-center items-center gap-2 px-4 ">
          <div className="text-sm text-[#18181B] ">Цэс</div>
          <Plus width={16} height={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[330px] flex pt-4 flex-col gap-4">
        <div className="flex flex-col">
          <div className="w-full flex justify-end">
            <DialogClose>
              <X height={16} width={16} />
            </DialogClose>
          </div>
          <div className="text-[#09090B] text-lg font-semibold pb-4">Цэс нэмэх</div>
          <Input onChange={handleInputChange} placeholder="Ангиллын нэр" />
        </div>
        <Button className="mt-1" onClick={HandleAdd} disabled={loading}>
          {loading ? 'Нэмэж байна...' : 'Нэмэх'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MenuAdd;
