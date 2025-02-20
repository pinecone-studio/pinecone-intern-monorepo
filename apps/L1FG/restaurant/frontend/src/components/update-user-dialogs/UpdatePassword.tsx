'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUpdatePasswordUserMutation } from '@/generated';
import { Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Passwords {
  password: string;
  newPassword: string;
  newRePassword: string;
}

const UpdatePassword = () => {
  const [userPasswords, setUserPasswords] = useState<Passwords>({ password: '', newPassword: '', newRePassword: '' });
  const [userId, setUserId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [updateUserPassword] = useUpdatePasswordUserMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const userData = storedUser ? JSON.parse(storedUser) : null;
    if (userData) setUserId(userData._id);
  }, []);

  const handleSubmit = async () => {
    if (userPasswords.newPassword !== userPasswords.newRePassword) {
      return toast.error('Нууц үг таарахгүй байна.');
    }
    try {
      await updateUserPassword({
        variables: {
          input: {
            password: userPasswords.password,
            newPassword: userPasswords.newPassword,
            newRePassword: userPasswords.newRePassword,
            _id: userId,
          },
        },
      });
      toast.success('Таний бүртгэл амжилттай шинэчлэгдлээ');
      setOpen(false);
    } catch {
      toast.error('Хуучин нууц үг таарахгүй байна!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit2 width={18} height={18} data-testid="edit-icon" />
      </DialogTrigger>
      <DialogContent className="max-w-[340px] rounded-xl">
        <DialogHeader>
          <DialogTitle>Нууц үг</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4 ">
          <Input
            placeholder="Хуучин нууц үг"
            value={userPasswords.password}
            onChange={(e) => {
              setUserPasswords({ ...userPasswords, password: e.target.value });
            }}
            className="col-span-4"
            type="password"
          />
          <Input
            placeholder="Шинэ нууц үг"
            value={userPasswords.newPassword}
            onChange={(e) => {
              setUserPasswords({ ...userPasswords, newPassword: e.target.value });
            }}
            className="col-span-4"
            type="password"
          />
          <Input
            placeholder="Шинэ нууц үг давтах"
            value={userPasswords.newRePassword}
            onChange={(e) => {
              setUserPasswords({ ...userPasswords, newRePassword: e.target.value });
            }}
            className="col-span-4"
            type="password"
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

export default UpdatePassword;
