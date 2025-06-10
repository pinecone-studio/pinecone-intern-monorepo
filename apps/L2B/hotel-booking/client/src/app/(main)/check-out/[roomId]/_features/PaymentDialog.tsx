'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface PaymentDialogProps {
  qrCodeDataUrl: string | null;
  showPaymentQR: boolean;
  setShowPaymentQR: Dispatch<SetStateAction<boolean>>;
  setPaymentVerified: Dispatch<SetStateAction<boolean>>;
  setQrCodeDataUrl: Dispatch<SetStateAction<string | null>>;
}

export const PaymentDialog: React.FC<PaymentDialogProps> = ({ qrCodeDataUrl, showPaymentQR, setShowPaymentQR, setPaymentVerified }) => {
  return (
    <Dialog
      open={showPaymentQR}
      onOpenChange={(open) => {
        setShowPaymentQR(open);
      }}
    >
      <DialogContent data-cy="payment-qr-modal" className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle data-cy="payment-qr-title">Complete Payment</DialogTitle>
          <DialogDescription data-cy="payment-qr-description">Scan this QR code with your payment app to complete the transaction.</DialogDescription>
        </DialogHeader>
        {qrCodeDataUrl && (
          <div className="mb-4 mx-auto border border-blue-100 p-2">
            <Image data-cy="payment-qr-image" src={qrCodeDataUrl} alt="Payment QR Code" width={300} height={300} />
          </div>
        )}
        <DialogFooter className="flex gap-2">
          <Button
            data-cy="cancel-payment-button"
            variant="secondary"
            onClick={() => {
              setShowPaymentQR(false);
              toast.info('Payment not completed', { id: 'info-toast' });
            }}
          >
            Cancel Payment
          </Button>
          <Button
            data-cy="payment-completed-button"
            onClick={() => {
              setPaymentVerified(true);
              setShowPaymentQR(false);
              toast.success('Payment verified successfully', { id: 'success-toast' });
            }}
          >
            Payment Completed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
