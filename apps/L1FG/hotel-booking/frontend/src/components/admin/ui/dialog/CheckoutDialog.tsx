import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const CheckoutDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-8 py-2 rounded-[6px] bg-[#2563EB] text-[#FAFAFA] font-Inter text-sm font-medium hover:bg-[#256eeb]">Checkout</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#09090B] font-Inter text-xl font-semibold tracking-[-0.5px]">Confirm Checkout</AlertDialogTitle>
          <AlertDialogDescription className="text-[#09090B] font-Inter text-base font-normal">
            Are you sure you want to proceed with checking out this guest? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-4 py-2 bg-white rounded-[6px]  border border-[#E4E4E7] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">Cancel</AlertDialogCancel>
          <AlertDialogAction className="px-4 py-2 bg-[#2563EB] rounded-[6px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:bg-[#256eeb]">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
