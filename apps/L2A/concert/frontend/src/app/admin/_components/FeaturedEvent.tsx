'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HiOutlinePlus } from 'react-icons/hi';
import { IoIosClose } from 'react-icons/io';

const FeaturedEvent = () => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      setError('Гарчиг шаардлагатай');
      return;
    }
    setError('');
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} data-cy="featured-event">
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-end text-2xl">
            <button aria-label="Close" onClick={() => setOpen(false)}>
              <IoIosClose />
            </button>
          </div>
          <DialogTitle>Онцлох тоглолт болгох</DialogTitle>
          <RadioGroup defaultValue="comfortable" className="flex pt-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Тийм</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Үгүй</Label>
            </div>
          </RadioGroup>
        </DialogHeader>
        <div className="grid gap-2 mb-2">
          <div className="grid grid-cols-4 items-center">
            <Input placeholder="Гарчиг оруулах" className="col-span-3 w-[375px]" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="w-[375px] h-[160px] bg-[#E4E4E7] rounded-lg relative">
          <label htmlFor="image-upload" className="cursor-pointer w-full h-full flex flex-col justify-center items-center">
            <div className="text-[#2563EB] text-2xl mb-2">
              <HiOutlinePlus />
            </div>
            <div>Зураг оруулах</div>
          </label>
          <input id="image-upload" data-testid="file-input" type="file" className="hidden" />
        </div>
        <DialogFooter>
          <Button type="submit" className="w-[436px]" onClick={handleSave} disabled={submitting}>
            Хадгалах
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeaturedEvent;
