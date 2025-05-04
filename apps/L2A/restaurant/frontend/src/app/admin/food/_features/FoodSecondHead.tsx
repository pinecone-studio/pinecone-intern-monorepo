'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
const FoodSecHead = () => {
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('active');
  const [image, setImage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!isDialogOpen) resetForm();
  }, [isDialogOpen]);
  const resetForm = () => {
    setFoodName('');
    setPrice('');
    setStatus('active');
    setImage(null);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Only image files are allowed.');
    }
  };
  const handleSubmit = () => {
    if (!foodName || !price || !image) {
      alert('Please fill out all fields and upload an image.');
      return;
    }
    console.log({ foodName, status, image, price });
    setIsDialogOpen(false);
  };
  return (
    <div className="flex justify-between p-4 max-w-4xl mx-auto" data-testid="food-section-header">
      <h1 className="text-2xl font-bold" data-testid="food-title">
        Хоол
      </h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" data-testid="add-food-button">
            Хоол +
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[340px] h-auto" data-testid="food-dialog">
          <DialogHeader>
            <DialogTitle data-testid="dialog-title">Хоол нэмэх</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input placeholder="Хоолны нэр" value={foodName} onChange={(e) => setFoodName(e.target.value)} data-testid="food-name-input" />
            <RadioGroup value={status} onValueChange={setStatus} className="flex justify-around" data-testid="status-radio-group">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="active" id="active" data-testid="active-radio" />
                <Label htmlFor="active" data-testid="active-label">
                  Идэвхитэй
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="inactive" id="inactive" data-testid="inactive-radio" />
                <Label htmlFor="inactive" data-testid="inactive-label">
                  Идэвхигүй
                </Label>
              </div>
            </RadioGroup>
            <div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" data-testid="file-input" />
              <Button className="w-full" variant="secondary" onClick={() => fileInputRef.current?.click()} data-testid="upload-image-button">
                + Зураг нэмэх
              </Button>
              {image && (
                <div className="mt-2 relative aspect-square w-full" data-testid="image-preview-container">
                  <Image src={image} alt="Food preview" className="rounded-md object-cover" fill sizes="100%" data-testid="food-image-preview" />
                </div>
              )}
            </div>
            <Input placeholder="Үнэ" value={price} onChange={(e) => setPrice(e.target.value)} data-testid="price-input" />
          </div>
          <DialogFooter className="pt-4">
            <Button className="w-full" onClick={handleSubmit} data-testid="create-food-button">
              Үүсгэх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default FoodSecHead;
