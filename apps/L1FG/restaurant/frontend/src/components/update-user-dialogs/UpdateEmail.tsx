'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUpdateEmailUserMutation } from '@/generated';
import { Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UpdateEmail = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [updateUserEmail] = useUpdateEmailUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    if (userData) {
      setUserEmail(userData.email);
      setUserId(userData._id);
    }
  }, []);

  const handleSubmit = async () => {
    if (!/\S+@\S+\.\S+/.test(userEmail)) {
      return toast.error('Зөв имэйл хаяг оруулна уу.');
    }
    try {
      const updatedUser = await updateUserEmail({
        variables: {
          input: {
            newEmail: userEmail,
            _id: userId,
          },
        },
      });
      localStorage.setItem('user', JSON.stringify(updatedUser?.data?.updateEmailUser));
      toast.success('Таний бүртгэл амжилттай шинэчлэгдлээ');
      setOpen(false);
    } catch {
      toast.error('something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit2 width={18} height={18} data-testid="edit-icon" />
      </DialogTrigger>
      <DialogContent className="max-w-[340px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Имэйл хаяг</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4 ">
          <Input
            placeholder="Шинэчлэх хаяг"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            className="col-span-4"
            type="email"
          />
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full bg-[#441500]" onClick={handleSubmit}>
            Шинэчлэх
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEmail;
