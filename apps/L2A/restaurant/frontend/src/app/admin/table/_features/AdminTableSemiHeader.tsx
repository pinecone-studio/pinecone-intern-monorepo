'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useAddTableMutation } from '@/generated';
import QRCode from 'qrcode';

const TableSemiHeader = () => {
  const [tableName, setTableName] = useState('');
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [addTableMutation] = useAddTableMutation();
  const handleCreate = async () => {
    if (!tableName.trim()) {
      alert('Ширээний нэр хоосон байна');
      return;
    }
    try {
      setLoading(true);
      const { data } = await addTableMutation({
        variables: {
          input: {
            name: tableName.trim(),
          },
        },
      });
      console.log('Returned data:', data);
      if (data?.addTable?._id) {
        const qrText = `${window.location.origin}/table/${data.addTable._id}`;
        const qrDataUrl = await QRCode.toDataURL(qrText);
        setQrUrl(qrDataUrl);
        alert('Амжилттай ширээ нэмэгдлээ!');
        setTableName('');
      } else {
        alert('Ширээ үүсгэхэд алдаа гарлаа.');
      }
    } catch (error) {
      console.log('GraphQL error:', error);
      alert('Ширээ нэмэхэд алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between p-4 max-w-4xl mx-auto" data-testid="table-header-wrapper">
      <h1 className="text-2xl font-bold" data-testid="header-title">
        Ширээ
      </h1>
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setQrUrl(null);
          }
        }}
        data-testid="dialog-root"
      >
        <DialogTrigger asChild>
          <Button variant="secondary" data-testid="add-table-button">
            Ширээ +
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[340px]" data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle data-testid="dialog-title">Ширээ нэмэх</DialogTitle>
          </DialogHeader>
          <Input placeholder="Ширээний нэр" value={tableName} onChange={(e) => setTableName(e.target.value)} data-testid="table-name-input" />
          <Button onClick={handleCreate} disabled={loading} data-testid="create-button">
            {loading ? 'Үүсгэж байна...' : 'Үүсгэх'}
          </Button>
          {qrUrl && (
            <div className="mt-4 text-center" data-testid="qr-wrapper">
              <p className="text-sm mb-2" data-testid="qr-instruction">
                Ширээний QR код:
              </p>
              <Image src={qrUrl} alt={`QR code for ${tableName}`} width={200} height={200} className="mx-auto" data-testid="qr-image" />
              <a href={qrUrl} download={`${tableName}-qr.png`} data-testid="qr-download-link">
                <Button variant="outline" className="mt-2" data-testid="qr-download-button">
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
