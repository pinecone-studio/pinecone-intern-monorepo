'use client';

import { toast } from 'react-toastify';
import { useState } from 'react';
import { DialogItem } from '@/components';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircleIcon } from 'lucide-react';
import { useCreateArtistMutation } from '@/generated';

export const AddArtistComponent = () => {
  const [createArtist] = useCreateArtistMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    artistName: '',
    additional: '',
    status: 'Энгийн',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = <K extends keyof typeof formData>(key: K, value: typeof formData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isValidForm = () => {
    if (!formData.artistName) {
      toast.error('Артистын нэр оруулна уу.');
      return false;
    }
    if (!formData.additional) {
      toast.error('Артистын тухай мэдээлэл оруулна уу.');
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({ artistName: '', additional: '', status: 'Энгийн'});
  };

  const submitForm = async () => {
    try {
      await createArtist({
        variables: { input: { ...formData } },
      });
      toast.success('Артист амжилттай үүслээ.');
      resetForm();
      setIsOpen(false);
    } catch (error: any) {
      console.error('GraphQL Error:', error);
      if (error.networkError) {
        console.error('Network Error:', error.networkError);
      }
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach((err) => console.error('GraphQL Error:', err.message));
      }
      toast.error('Алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleSubmit = async () => {
    if (!isValidForm()) return;
    setIsLoading(true);
    await submitForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger className="flex self-stretch py-2 px-4 justify-center items-center gap-2 rounded-md bg-[#18181B] shadow-sm text-[#fff]" data-testid="Artist-DialogOpen">
        Артист Нэмэх
        <PlusCircleIcon />
      </DialogTrigger>
      <DialogContent className="flex max-w-[640px] p-9 flex-col items-start gap-4 border-[1px] border-[#E4E4E7] bg-[#fff] shadow-xs overflow-scroll min-h-[320px]" data-testid="Artist-dialog-content">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Артист Нэмэх</DialogTitle>
        </DialogHeader>

        {/* Artist Name */}
        <DialogItem htmlFor="ArtistName" name="Артистын нэр">
          <Input
            placeholder="Артистын нэр оруулах"
            name="ArtistName"
            value={formData.artistName}
            onChange={(e) => handleInputChange('artistName', e.target.value)}
          />
        </DialogItem>

        {/* Additional Info */}
        <DialogItem htmlFor="additional" name="Артистын тухай">
          <Textarea
            className="min-h-16"
            placeholder="Дэлгэрэнгүй мэдээлэл"
            name="additional"
            value={formData.additional}
            onChange={(e) => handleInputChange('additional', e.target.value)}
          />
        </DialogItem>

        {/* Submit Button */}
        <Button
          className="w-full"
          onClick={handleSubmit}
          data-testid="createArtistButton"
          disabled={isLoading}
        >
          {isLoading ? 'Үүсгэж байна...' : 'Үүсгэх'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
