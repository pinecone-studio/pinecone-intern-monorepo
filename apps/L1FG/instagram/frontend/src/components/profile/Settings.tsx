import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const items = ['Apps and websites', 'QR code', 'Notifications', 'Settings and privacy', 'Meta verified', 'Supervision', 'Login activity', 'Log out', 'Cancel'];

const Settings = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col justify-center">
          {items.map((item, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-center py-3">{item}</div>
              {index < items.length - 1 && <div className="w-full border"></div>}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
