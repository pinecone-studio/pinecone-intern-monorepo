'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUpdateNumberUserMutation } from '@/generated';
import { Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const UpdateNumber = () => {
  const [userNumber, setUserNumber] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [updateUserNumber] = useUpdateNumberUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    if (userData) {
      setUserNumber(userData.phoneNumber);
      setUserId(userData._id);
    }
  }, []);
  const handleSubmit = async () => {
    if (userNumber.length !== 8) {
      return toast.error('Утасны дугаар 8 оронтой байх ёстой');
    }
    try {
      const updatedUser = await updateUserNumber({
        variables: {
          input: {
            newPhoneNumber: userNumber,
            _id: userId,
          },
        },
      });
      localStorage.setItem('user', JSON.stringify(updatedUser?.data?.updateNumberUser));
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
          <DialogTitle>Утас</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4 ">
          <Input
            placeholder="0000-0000"
            value={userNumber}
            onChange={(e) => {
              setUserNumber(e.target.value);
            }}
            className="col-span-4"
            type="number"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="w-full bg-[#441500]" onClick={handleSubmit}>
              Шинэчлэх
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateNumber;
