'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ListingPreviewCard from '@/app/_components/ListingPreviewCard';

const PreviewSection = () => {
  const [openSaveModal, setOpenSaveModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleSave = () => {
    setOpenSaveModal(false);
  };

  const handleDelete = () => {
    setOpenDeleteModal(false);
  };

  return (
    <Card className="w-full max-w-[520px] self-start border-none shadow-none" data-cy="preview-section">
      <CardContent className="p-6 pb-6 bg-[#F9F9F9]">
        <h3 className="text-xl font-semibold mb-1">Хэрэглэгчдэд харагдах</h3>
        <p className="text-sm text-muted-foreground mb-4">Таны оруулсан мэдээлэл хэрэглэгчдэд харагдах үзүүлэлт</p>

        <div data-cy="listing-preview-card">
          <ListingPreviewCard
            images={['/listingcard.png', '/listingcard.png', '/listingcard.png']}
            price="880,000,000₮"
            title="Seoul royal county хотхон"
            area={200}
            beds={4}
            baths={2}
            location="Хан-Уул дүүрэг, 1-р хороо, Хан-Уул дүүрэг..."
          />
        </div>

        <div className="mt-6 space-y-3">
          <Button data-cy="submit-post-button" className="w-full bg-orange-500 text-white text-sm font-medium hover:bg-orange-600">
            Зар оруулах хүсэлт илгээх
          </Button>
          <Button variant="outline" data-cy="save-post-button" className="w-full text-sm font-medium" data-testid="open-save-dialog-button" onClick={() => setOpenSaveModal(true)}>
            Хадгалаад гарах
          </Button>
          <Button variant="ghost" data-cy="delete-post-button" className="w-full text-sm text-destructive font-medium" data-testid="open-delete-dialog-button" onClick={() => setOpenDeleteModal(true)}>
            Устгах
          </Button>
        </div>
      </CardContent>

      <Dialog open={openSaveModal} onOpenChange={setOpenSaveModal}>
        <DialogContent data-cy="dialog-content">
          <DialogHeader>
            <DialogTitle>Хадгалах уу?</DialogTitle>
          </DialogHeader>
          <p>Та энэ зарын мэдээллийг хадгалаад гарахдаа итгэлтэй байна уу?</p>
          <DialogFooter data-cy="dialog-footer">
            <Button variant="outline" onClick={() => setOpenSaveModal(false)}>
              Болих
            </Button>
            <Button className="hover:bg-orange-600 bg-orange-500 text-white" data-testid="confirm-save-button" onClick={handleSave}>
              Хадгалах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent data-cy="dialog-content">
          <DialogHeader>
            <DialogTitle>Устгах уу?</DialogTitle>
          </DialogHeader>
          <p>Та энэ зарын мэдээллийг устгахдаа итгэлтэй байна уу?</p>
          <DialogFooter data-cy="dialog-footer">
            <Button variant="outline" onClick={() => setOpenDeleteModal(false)}>
              Болих
            </Button>
            <Button variant="destructive" className="hover:bg-orange-600 bg-orange-500 text-white" data-testid="confirm-delete-button" onClick={handleDelete}>
              Устгах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PreviewSection;
