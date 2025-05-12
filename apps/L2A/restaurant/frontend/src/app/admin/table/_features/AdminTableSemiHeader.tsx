'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useAddTableMutation } from '@/generated';
import { Toaster, toast } from 'sonner';
import QRCode from 'qrcode';

/* istanbul ignore next */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as Window & typeof globalThis & { QRCode: typeof QRCode }).QRCode = QRCode;
}

const TableSemiHeader = () => {
  const [tableName, setTableName] = useState('');
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addTableMutation] = useAddTableMutation();
  const resetForm = () => {
    setTableName('');
    setQrUrl(null);
  };
  const handleCreate = async () => {
    const trimmedName = tableName.trim();
    if (!trimmedName) {
      toast.error('Ширээний нэр хоосон байна');
      return;
    }
    try {
      setLoading(true);
      const { data } = await addTableMutation({
        variables: { input: { name: trimmedName } },
      });
      const createdId = data?.addTable?._id;
      if (createdId) {
        const qrText = `${window.location.origin}/table/${createdId}`;
        try {
          const qrDataUrl = await QRCode.toDataURL(qrText);
          setQrUrl(qrDataUrl);
          toast.success('Ширээ амжилттай нэмэгдлээ!');
        } catch (qrError) {
          toast.error('QR код үүсгэхэд алдаа гарлаа.');
        }
      } else {
        toast.error('Ширээ үүсгэхэд алдаа гарлаа.');
      }
    } catch (error) {
      toast.error('Серверийн алдаа. Дахин оролдоно уу.');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <div className="flex justify-between p-4 max-w-4xl mx-auto" data-testid="table-header-wrapper">
      <Toaster position="top-center" expand={true} data-testid="toaster-root" />
      <h1 className="text-2xl font-bold" data-testid="header-title">
        Ширээ
      </h1>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange} data-testid="dialog-root">
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            type="button"
            data-testid="add-table-button"
            onClick={() => {
              resetForm();
              setIsDialogOpen(true);
            }}
          >
            Ширээ +
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[340px] h-auto">
          <DialogHeader>
            <DialogTitle data-testid="dialog-title">Ширээ нэмэх</DialogTitle>
          </DialogHeader>
          <Input placeholder="Ширээний нэр" value={tableName} onChange={(e) => setTableName(e.target.value)} data-testid="table-name-input" />
          <Button onClick={handleCreate} disabled={loading} type="button" data-testid="create-button">
            {loading ? 'Үүсгэж байна...' : 'Үүсгэх'}
          </Button>
          {qrUrl && (
            <div className="mt-4 text-center" data-testid="qr-wrapper">
              <p className="text-sm mb-2" data-testid="qr-instruction">
                Ширээний QR код:
              </p>
              <Image src={qrUrl} alt={`QR code for ${tableName}`} width={200} height={200} className="mx-auto" data-testid="qr-image" />
              <a href={qrUrl} download={`${tableName}-qr.png`} data-testid="qr-download-link" aria-label={`Download QR code for ${tableName}`}>
                <Button variant="outline" className="mt-2" type="button" data-testid="qr-download-button">
                  Татах
                </Button>
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TableSemiHeader;
