'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useUpdateUserImageMutation } from '@/generated';
import { Edit2, ImagePlus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UpdateImage = () => {
  const [userImage, setUserImage] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [updateUserImage] = useUpdateUserImageMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    if (userData) {
      setUserImage(userData.profileImage);
      setPreviewImage(userData.profileImage);
      setUserId(userData._id);
    }
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setUserImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      const updatedUser = await updateUserImage({
        variables: {
          input: {
            profileImage: userImage,
            _id: userId,
          },
        },
      });
      localStorage.setItem('user', JSON.stringify(updatedUser?.data?.updateUserImage));
      toast.success('Таний бүртгэл амжилттай шинэчлэгдлээ');
      setOpen(false);
    } catch {
      toast.error('something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit2 width={18} height={18} data-testid="edit-icon" />
      </DialogTrigger>
      <DialogContent className="max-w-[340px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Profile Зураг</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {previewImage ? (
              <Image src={previewImage} alt="Profile preview" className="w-full h-full object-cover" width={80} height={80} />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImagePlus className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="imageUpload" data-testid="file-input" />
          <label htmlFor="imageUpload" className="cursor-pointer text-sm flex justify-center items-center gap-2 bg-[#E4E4E7] py-2 px-4 rounded-lg">
            <Plus />
            Зураг сонгох
          </label>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full bg-[#441500]" onClick={handleSubmit} disabled={!previewImage} data-testid="submit-button">
            Шинэчлэх
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateImage;
