import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Pencil, X } from 'lucide-react';
import { useUpdateCategoryNameMutation } from '@/generated';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface updateInput {
  refetch: any;
  cateId: string;
}

const CateUpdateDia = ({ cateId, refetch }: updateInput) => {
  const [updateCate, { loading }] = useUpdateCategoryNameMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  const HandleUpdate = async () => {
    try {
      await updateCate({
        variables: {
          input: {
            categoryName: categoryName,
            id: cateId,
          },
        },
      });
      setIsOpen(false);
      toast.success('Амжилттай шинэчлэгдлээ!');
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
        <div className="h-max p-2 bg-[#F4F4F5] rounded-md cursor-pointer" data-testid="delete-button">
          <Pencil width={16} height={16} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[330px] flex pt-4 flex-col gap-4">
        <div className="flex flex-col">
          <div className="w-full flex justify-end">
            <DialogClose>
              <X height={16} width={16} />
            </DialogClose>
          </div>
          <div className="text-[#09090B] text-lg font-semibold pb-4">Цэс шинэчлэх</div>
          <Input onChange={handleInputChange} placeholder="Ангиллын нэр" />
        </div>
        <Button className="mt-1" onClick={HandleUpdate} disabled={loading}>
          {loading ? 'Шинэчлэж байна...' : 'Шинэчлэх'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CateUpdateDia;
