'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '../Logo';
import { Title } from '../common/Title';
import { Tinder } from '../common/Tinder2024';

export const ImageUpload = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6">
      <main className="w-full max-w-2xl mx-auto flex flex-col justify-center items-center mt-[80px] gap-6">
        <Logo />
        <Title text="Upload your image" desc="Please choose an image that represents you." />
        <div className="grid grid-cols-3 gap-6 w-[640px] h-[616px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden w-[200px] h-[300px]">
              <div className="w-full h-full bg-[#F4F4F5]" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mb-6">
          <label htmlFor="image-upload">
            <Button asChild className="w-[640px] border-[#E11D48E5] border" variant="ghost">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="text-red-[E11D48E5]">
                  +
                </span>
                Upload image
              </span>
            </Button>
          </label>
          <input id="image-upload" type="file" accept="image/*" multiple className="sr-only" aria-label="Upload images" />
        </div>

        <div className="flex justify-between w-full">
          <Button className="bg-white border rounded-full w-16 h-9 text-black">Back</Button>
          <Button className="bg-[#E11D48E5] text-white rounded-full w-16 h-9">Next</Button>
        </div>
        <Tinder />
      </main>
    </div>
  );
};
