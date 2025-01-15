'use client';

import { Button } from '@/components/ui/button';

const ImagesSection = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Images Section</h2>
      <p className="border-b-2 mb-4">This is the images section where user images are displayed.</p>

      <main className="w-full max-w-2xl flex flex-col justify-center items-center mt-[20px] ">
        <div className="grid grid-cols-3 gap-6 w-[640px] h-auto">
          <div data-testid="map" className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden w-[200px] h-[300px]">
            <img width={200} height={300} className="w-full h-full object-cover" />
            <button className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1" data-testid="remove">
              ×
            </button>
          </div>

          <div className="w-[200px] h-[300px] flex items-center justify-center border border-dashed rounded-lg relative">
            <input data-testid="addinput" type="file" accept="image/*" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
            <span data-testid="ClickButton" className="text-gray-400 text-xl">
              +
            </span>
          </div>
        </div>

        <div data-testid="check" className="flex justify-center w-full mt-4">
          <Button data-testid="create" className={`bg-[#E11D48E5] text-white rounded-full w-[640px] h-[36px]`}>
            Upload
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ImagesSection;
