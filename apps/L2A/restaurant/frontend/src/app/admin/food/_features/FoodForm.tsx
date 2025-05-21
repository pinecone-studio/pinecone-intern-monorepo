// components/FoodForm.tsx
'use client';

import { gql, useQuery } from '@apollo/client';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useAddProductMutation } from '@/generated';
import uploadImageToCloudinary from '@/lib/upload-image';

export const GET_ALL_CATEGORIES = gql`
  query getCategories {
    getCategories {
      _id
      name
    }
  }
`;

const FoodForm = () => {
  const [open, setOpen] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(true);
  const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addProductInputMutation] = useAddProductMutation();
  const { data: categoryData, loading: categoryLoading } = useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    if (!open) resetForm();
  }, [open]);

  const resetForm = () => {
    setFoodName('');
    setPrice('');
    setStatus(true);
    setImageUrlPreview(null);
    setFile(null);
    setSelectedCategoryId('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setImageUrlPreview(URL.createObjectURL(selectedFile));
    } else {
      toast.warning('Only image files are allowed.');
    }
  };

  const validateForm = () => {
    if (!foodName || !price || !selectedCategoryId) {
      toast.info('Please fill out all fields.');
      return false;
    }
    if (!file) {
      toast.info('Please upload an image.');
      return false;
    }
    return true;
  };

  const submitProduct = async (imageUrl: string) => {
    await addProductInputMutation({
      variables: {
        input: {
          name: foodName,
          price: parseFloat(price),
          status,
          images: [imageUrl],
          category: selectedCategoryId,
        },
      },
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setIsSubmitting(true);
      const imageUrl = await uploadImageToCloudinary(file as File);
      await submitProduct(imageUrl);
      toast.success('Food item added successfully!');
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.warning('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" data-testid="add-food-button">Хоол +</Button>
      </DialogTrigger>
      <DialogContent className="w-[340px] h-auto" data-testid="food-dialog">
        <DialogHeader>
          <DialogTitle data-testid="dialog-title">Хоол нэмэх</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <Input placeholder="Хоолны нэр" value={foodName} onChange={(e) => setFoodName(e.target.value)} data-testid="food-name-input" />
          <RadioGroup value={status ? 'true' : 'false'} onValueChange={(val) => setStatus(val === 'true')} className="flex justify-around" data-testid="status-radio-group">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="active" data-testid="status-active" />
              <Label htmlFor="active">Идэвхитэй</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="inactive" data-testid="status-inactive" />
              <Label htmlFor="inactive">Идэвхигүй</Label>
            </div>
          </RadioGroup>
          <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId} data-testid="category-select">
            <SelectTrigger className="w-full bg-white py-3 px-4">
              <SelectValue placeholder="Select category" data-testid="category-select-value" />
            </SelectTrigger>
            <SelectContent data-testid="category-select-content">
              {categoryLoading ? (
                <div className="px-4 py-2 text-sm text-gray-500">Түр хүлээнэ үү...</div>
              ) : (
                categoryData?.getCategories?.map((cat: { _id: string; name: string }) => (
                  <SelectItem key={cat._id} value={cat._id} data-testid={`category-${cat._id}`}>{cat.name}</SelectItem>
                ))
              )}
            </SelectContent> 
          </Select>
          <div>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" data-testid="image-input" />
            <Button className="w-full" variant="secondary" onClick={() => fileInputRef.current?.click()} data-testid="add-image-button">+ Зураг нэмэх</Button>
            {imageUrlPreview && (
              <div className="mt-2 relative aspect-square w-full" data-testid="image-preview">
                <Image src={imageUrlPreview} alt="food-image-preview" className="rounded-md object-cover" fill sizes="100%" />
              </div>
            )}
          </div>
          <Input placeholder="Үнэ" value={price} onChange={(e) => setPrice(e.target.value)} data-testid="price-input" />
        </div>
        <DialogFooter className="pt-4">
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting} data-testid="submit-button">{isSubmitting ? 'Үүсгэж байна...' : 'Үүсгэх'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default FoodForm;
