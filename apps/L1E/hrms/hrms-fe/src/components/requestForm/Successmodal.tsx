'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Check } from 'lucide-react';
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[608px]">
        <DialogTitle>
          <div className="flex flex-col items-center justify-center gap-6 py-8">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 border-2 border-green-500 rotate-45 translate-y-1 translate-x-1" style={{ width: '24px', height: '16px' }} />
                  <Check className="h-6 w-6 text-green-500 relative z-10" />
                </div>
              </div>
            </div>
          </div>
        </DialogTitle>
        <div className="flex flex-col items-center justify-center gap-6 py-8">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold">Амжилттай илгээгдлээ</h2>
            <p className="text-sm text-muted-foreground">Таны хүсэлттэй ахлах ажилтан танилцсаны дараа хариуг танд Teams Chat-аар мэдэгдэх болно.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SuccessModal;
