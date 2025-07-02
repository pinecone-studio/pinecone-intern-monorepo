'use client';
import { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { Plus, X } from 'lucide-react';
import { useUpdateRoomMutation } from '@/generated';
import { Dialog, DialogContent, DialogClose, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ImagePreview = ({ src, alt, onRemove }: { src: string; alt: string; onRemove: () => void }) => (
  <div className="relative group" data-cy={`image-preview-${alt.toLowerCase().replace(/\s+/g, '-')}`}>
    <Image src={src} alt={alt} width={340} height={200} className="w-full h-[200px] object-cover rounded-sm" />
    <button onClick={onRemove} className="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100" data-cy={`remove-image-${alt.toLowerCase().replace(/\s+/g, '-')}`}>
      <X className="h-4 w-4 text-red-500" />
    </button>
  </div>
);

const UploadArea = ({ onUpload }: { onUpload: (_e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="relative border w-full h-[200px] bg-gray-50 rounded-sm p-8 text-center hover:border-gray-300" data-cy="upload-area">
    <input type="file" multiple accept="image/*" onChange={onUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" data-cy="image-upload-input" />
    <div className="flex flex-col items-center justify-center h-full space-y-2">
      <Plus className="w-6 h-6 text-blue-600" />
      <p className="text-sm text-gray-600">Drag or Upload Photo</p>
    </div>
  </div>
);

export const RoomImages = ({ roomId, room }: { roomId: string; room: { images?: string[] | null } }) => {
  const [updateRoom] = useUpdateRoomMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const images = useMemo(() => room?.images?.filter(Boolean) || [], [room?.images]);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => reader.result && setPreviews((p) => [...p, reader.result as string]);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      await updateRoom({
        variables: { updateRoomId: roomId, input: { images: [...images, ...previews] } },
        refetchQueries: ['room'],
      });
      setPreviews([]);
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  }, [roomId, images, previews, updateRoom]);

  const handleRemove = useCallback(
    async (index: number) => {
      const updated = images.filter((_, i) => i !== index);
      await updateRoom({
        variables: { updateRoomId: roomId, input: { images: updated } },
        refetchQueries: ['room'],
      });
    },
    [images, roomId, updateRoom]
  );

  return (
    <div className="w-full bg-white rounded-lg border p-6" data-cy="room-images">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Images</h4>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger className="text-blue-600 text-sm font-medium" data-cy="edit-images-button">
            Edit {images.length > 0 && <span className="text-gray-500 ml-2">({images.length})</span>}
          </DialogTrigger>
          <DialogContent className="min-w-[50rem]" data-cy="room-images-form">
            <DialogHeader>
              <DialogTitle>Room Images</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 h-[30rem] overflow-auto p-4">
              <UploadArea onUpload={handleUpload} />
              {[...previews, ...images].map((src, i) => (
                <ImagePreview
                  key={i}
                  src={src}
                  alt={`Room image ${i}`}
                  onRemove={() => (i < previews.length ? setPreviews((p) => p.filter((_, idx) => idx !== i)) : handleRemove(i - previews.length))}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <DialogClose asChild>
                <Button variant="ghost" data-cy="images-cancel-button">
                  Close
                </Button>
              </DialogClose>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700" disabled={loading} data-cy="images-save-button">
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border-b mb-4"></div>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {images.slice(0, 4).map((img, i) => (
            <ImagePreview key={i} src={img} alt={`Room ${i}`} onRemove={() => handleRemove(i)} />
          ))}
          {images.length > 4 && (
            <div className="bg-gray-100 rounded-sm flex items-center justify-center h-[200px]" data-cy="more-images-indicator">
              +{images.length - 4} more
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500" data-cy="no-images-text">
          <p>No photos uploaded</p>
        </div>
      )}
    </div>
  );
};
