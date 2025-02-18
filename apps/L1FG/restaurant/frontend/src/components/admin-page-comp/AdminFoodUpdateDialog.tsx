import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2, Edit } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';

import uploadImage from '../utils/upload';
import { useUpdateFoodMutation } from '@/generated';

interface FoodData {
  foodId: string;
  foodName: string;
  price: string;
  status: 'Идэвхитэй' | 'Идэвхигүй';
  imageUrl: string;
}

interface AdminFoodUpdateDialogProps {
  food: FoodData & { foodId: string };
}

const AdminFoodUpdateDialog = ({ food }: AdminFoodUpdateDialogProps) => {
  const [formData, setFormData] = useState<FoodData>({
    foodId: food.foodId,
    foodName: food.foodName,
    price: food.price,
    status: food.status,
    imageUrl: food.imageUrl,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [updateFood] = useUpdateFoodMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formElement = e.currentTarget;
    const fileInput = formElement.querySelector<HTMLInputElement>('input[type="file"]');
    const files = fileInput?.files;
    const imageUrl = await uploadImage(files?.[0] as File);

    try {
      await updateFood({
        variables: {
          input: {
            foodId: food.foodId, // Assuming you have the food's ID to update the existing record
            foodName: formData.foodName,
            price: parseFloat(formData.price),
            status: formData.status,
            imageUrl: imageUrl,
          },
        },
      });
      alert('Хоол амжилттай шинэчлэгдлээ!');

      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger data-testid="up-dialog-trigger" asChild>
        <div className="h-max p-2 bg-[#F4F4F5] rounded-md cursor-pointer">
          <Edit width={16} height={16} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[379px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle data-testid="food-add-test">Хоол засах</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-4">
            <Input id="foodName" name="foodName" value={formData.foodName} onChange={handleInputChange} placeholder="Хоолны нэр" className="col-span-3 w-full" />
            <RadioGroup className="flex w-full" value={formData.status} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as 'Идэвхитэй' | 'Идэвхигүй' }))}>
              <div className="flex items-center w-[50%] justify-center py-2 px-4 space-x-2">
                <RadioGroupItem value="Идэвхитэй" id="r2" />
                <Label htmlFor="r2">Идэвхитэй</Label>
              </div>
              <div className="flex items-center w-[50%] justify-center py-2 px-4 space-x-2">
                <RadioGroupItem value="Идэвхигүй" id="r1" />
                <Label htmlFor="r1">Идэвхигүй</Label>
              </div>
            </RadioGroup>
            <label className="cursor-pointer">
              <div className="flex p-4 justify-center items-center bg-[#F4F4F5] gap-2 rounded-md border border-[#E4E4E7] relative">
                {isLoading ? (
                  <Loader2 className="animate-spin" width={16} />
                ) : previewImage ? (
                  <Image width={100} height={40} src={previewImage} alt="Preview" className="max-h-40 w-full object-contain" />
                ) : (
                  <>
                    <Plus width={16} />
                    <div>Зураг нэмэх</div>
                  </>
                )}
                <input type="file" className="hidden" data-testid="file-input" accept="image/*" onChange={handleImageChange} />
              </div>
            </label>
            <Input id="price" name="price" value={formData.price} onChange={handleInputChange} placeholder="Үнэ" className="col-span-3 w-full" />
          </div>
          <DialogFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              Шинэчлэх
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminFoodUpdateDialog;
