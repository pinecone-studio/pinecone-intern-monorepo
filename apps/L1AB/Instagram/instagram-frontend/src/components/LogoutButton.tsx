import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface LogoutDialogProps {
  buttonClassName?: string;
}

const LogoutDialog = ({ buttonClassName }: LogoutDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button data-testid="btn-logout" className={`${buttonClassName} p-0 text-[11px] dark:bg-black font-semibold bg-white hover:bg-white`}>
          Log out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-6 w-[324px] flex flex-col gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[18px] leading-7 font-semibold text-[#09090B]">Log out of your account?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border text-[#09090B]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            data-testId="log-out-button"
            className="border bg-white hover:bg-white text-[#2563EB]"
            onClick={() => {
              localStorage.removeItem('userToken');
              location.reload();
            }}
          >
            Log out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutDialog;
