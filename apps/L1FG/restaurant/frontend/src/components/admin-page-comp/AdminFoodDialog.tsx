/* eslint-disable */

'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import { useCreateFoodMutation } from '@/generated';
import uploadImage from '../utils/upload';
interface FoodData {
  foodName: string;
  price: string;
  status: 'Идэвхитэй' | 'Идэвхигүй';
  imageUrl: string;
}
const AdminFoodDialog = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [createFood] = useCreateFoodMutation();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FoodData>({
    foodName: '',
    price: '',
    status: 'Идэвхитэй',
    imageUrl: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  uploadImage;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const fileInput = formElement.querySelector<HTMLInputElement>('input[type="file"]');
    const files = fileInput?.files;

    setIsLoading(true);
    const imageUrl = await uploadImage(files?.[0] as File);
    setIsLoading(false);

    try {
      setIsLoading(true);
      await createFood({
        variables: {
          input: {
            foodName: formData.foodName,
            imageUrl: imageUrl,
            price: parseFloat(formData.price),
            status: formData.status,
          },
        },
      });

      alert('Хоол амжилттай үүсгэгдлээ!');

      setFormData({
        foodName: '',
        price: '',
        status: 'Идэвхитэй',
        imageUrl: '',
      });

      setPreviewImage(null);
      setOpen(false);
    } catch (error) {
      alert('Failed to create food item');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="food-d-trig" variant="outline" className="border border-[#E4E4E7] px-4 py-2 gap-2">
          <div className="font-medium text-sm text-[#09090B]">Хоол</div>
          <Plus width={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[379px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle data-testid="food-add-test">Хоол нэмэх</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 my-4">
            <Input id="foodName" name="foodName" value={formData.foodName} onChange={handleInputChange} placeholder="Хоолны нэр" className="col-span-3 w-full" />
            <RadioGroup className="flex w-full" defaultValue="available" onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value as 'Идэвхитэй' | 'Идэвхигүй' }))}>
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
                  <Image width={100} height={40} src={previewImage} alt="Preview" data-tesid="preview-test" className="max-h-40 w-full object-contain" />
                ) : (
                  <>
                    <Plus width={16} />
                    <div>Зураг нэмэх</div>
                  </>
                )}
                <input type="file" data-testid="input-test" className="hidden" accept="image/*" onChange={handleImageChange} />
              </div>
            </label>
            <Input id="price" name="price" value={formData.price} onChange={handleInputChange} placeholder="Үнэ" className="col-span-3 w-full" />
          </div>
          <DialogFooter>
            <Button data-testid="uusgeh-btn" className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              Үүсгэх
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AdminFoodDialog;
