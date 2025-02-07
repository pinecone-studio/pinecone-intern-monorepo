import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const ImagesSection = () => {
  const { control, watch, setValue } = useFormContext();
  const [isUploading, setIsUploading] = useState(false);
  const watchedImages = watch('images');
  const images = watchedImages ? Array.from(watchedImages as FileList) : [];

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    try {
      setIsUploading(true);
      setValue('images', files, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } catch (error) {
      console.error('Error handling images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setValue('images', updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <FormField
      control={control}
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block text-gray-700 font-bold mb-2">Зураг оруулах:</FormLabel>
          <FormControl>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="images" data-cy="upload-image" data-testid="upload-image" />
              <label htmlFor="images" className="cursor-pointer text-black">
                {isUploading ? <Loader2 className="h-6 w-6 animate-spin mx-auto" /> : 'Энд дарж зураг сонгоно уу'}
              </label>
            </div>
          </FormControl>
          <FormMessage />

          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {(images as File[]).map((file, index) => (
                <div key={index} className="relative group">
                  <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default ImagesSection;
