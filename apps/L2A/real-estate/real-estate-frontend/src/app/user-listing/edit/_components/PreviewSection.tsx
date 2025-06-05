/* eslint-disable complexity */
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ListingPreviewCard from '@/app/_components/ListingPreviewCard';
import { useFormikContext } from 'formik';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';

  

const PreviewSection = ({ draftKey }: { draftKey: string }) => {
  const { values, submitForm } = useFormikContext<any>();
  const [open, setOpen] = useState(false);

  const handleSaveToLocal = () => {
    try {
      localStorage.setItem(draftKey, JSON.stringify(values));
      toast.success('Амжилттай хадгалагдлаа', {
        description: 'Таны засвар ноорог болгон хадгалагдлаа.',
        duration: 3000,
        className: 'text-sm',
      });
    } catch (err) {
      console.error('LocalStorage save error:', err);
      toast.error('Алдаа гарлаа', {
        description: 'Засвар хадгалахад алдаа гарлаа.',
        duration: 3000,
        className: 'text-sm',
      });
    }
  };

  const safeImages = Array.isArray(values.images) && values.images.length > 0
    ? values.images
    : ['/listingcard.png'];

  return (
    <Card
      className="w-full max-w-[520px] self-start border-none shadow-none"
      data-testid="preview-section"
      data-cy="preview-section"
    >
      <CardContent className="p-6 pb-6 bg-[#F9F9F9]">
        <h3 className="text-xl font-semibold mb-1">Хэрэглэгчдэд харагдах</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Таны оруулсан мэдээлэл хэрэглэгчдэд харагдах үзүүлэлт
        </p>

        <div data-testid="listing-preview-card" data-cy="listing-preview-card">
          <ListingPreviewCard
            images={safeImages}
            price={`${values.price}₮`}
            title={values.title || 'Гарчиг оруулаагүй'}
            area={values.size || 0}
            beds={parseInt(values.totalRooms || '0')}
            baths={parseInt(values.restrooms || '0')}
            location={
              `${values.location?.district || ''}, ${values.location?.city || ''}, ${values.location?.address || ''}`
            }
          />
        </div>

        <div className="mt-6 space-y-3">
          <Button
            onClick={submitForm}
            data-cy="submit-post-button"
            data-testid="submit-post-button"
            className="w-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600"
          >
            Зар оруулах хүсэлт илгээх
          </Button>

          <Button
            type="button"
            variant="outline"
            data-cy="save-post-button"
            data-testid="save-post-button"
            className="w-full text-sm font-medium"
            onClick={handleSaveToLocal}
          >
            Хадгалаад гарах
          </Button>

           <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                data-cy="delete-post-button"
                data-testid="delete-post-button"
                className="w-full text-sm text-destructive font-medium"
                onClick={() => setOpen(true)}
              >
                Устгах
              </Button>
            </DialogTrigger>
            <DialogContent className='w-[480px] h-[168px] ' data-cy="delete-confirm-modal" data-testid="delete-confirm-modal">
              <DialogHeader>
                <DialogTitle className='text-[#09090B] text-[20px]'>Та устгахдаа итгэлтэй байна уу?</DialogTitle>
                <DialogDescription className='text-[16px]'>
                  Мэдээллийг устгаснаар дахин сэргээх боломжгүй
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  data-cy="cancel-delete-button"
                  data-testid="cancel-delete-button"
                >
                  Болих
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setOpen(false);
                  }}
                  data-cy="confirm-delete-button"
                  data-testid="confirm-delete-button"
                  
                  className='bg-[#F97316] w-[78px] h-[36px] text-white'
       >
                  Устгах
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewSection;
