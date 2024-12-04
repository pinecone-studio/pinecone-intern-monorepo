import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';

type ImageDialogProps = {
  images?: string[];
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export const ImageDialog = ({ dialogOpen, setDialogOpen, images }: ImageDialogProps) => {
  const [count, setCount] = React.useState(6);

  const handleMore = () => {
    setCount((prevCount) => prevCount + 4);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="flex flex-col p-[24px] gap-5 max-w-6xl max-h-[800px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="mb-2">Image</DialogTitle>
          <div className="grid grid-cols-2 gap-x-2 gap-y-3">
            {images?.slice(0, count).map((photo, index) => (
              <div key={index} className="relative w-full h-80 rounded-md overflow-hidden">
                <Image src={photo} alt={`Image ${index + 1}`} fill />
              </div>
            ))}
          </div>
        </DialogHeader>
        {count < (images?.length || 0) && (
          <DialogFooter>
            <Button data-testid="view-more" onClick={handleMore} variant="ghost" className="border w-full">
              View more
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
