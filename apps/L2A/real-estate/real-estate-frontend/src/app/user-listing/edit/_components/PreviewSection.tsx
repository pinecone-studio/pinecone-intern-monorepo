/* eslint-disable complexity */
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ListingPreviewCard from '@/app/_components/ListingPreviewCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const PreviewSection = () => {
  const [open, setOpen] = useState(false);


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
        <div data-cy="listing-preview-card" data-testid="listing-preview-card">
          <ListingPreviewCard
            images={[
              '/listingcard.png',
              '/listingcard.png',
              '/listingcard.png',
            ]}
            price="880,000,000₮"
            title="Seoul royal county хотхон"
         
            area={200}
            beds={4}
            baths={2}
            location="Хан-Уул дүүрэг, 1-р хороо, Хан-Уул дүүрэг..."
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
                  Утсгах
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

