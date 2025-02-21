'use client';

import { Button } from '@/components/ui/button';
import { HomeLogo } from './icons/HomeLogo';
import { PlusIcon } from './icons/PlusIcon';
import Link from 'next/link';
import { useAuth } from '../providers';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';

const Header = () => {
  const { user, signout } = useAuth();

  return (
    <div>
      {user?.isAdmin ? (
        <div className="w-screen h-16 border-b border-[#E4E4E7] bg-white px-8 flex items-center justify-between">
          <Link href={'/'}>
            <HomeLogo />
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">admin</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="font-light">Та гарахдаа итгэлтэй байна уу</DialogTitle>
              </DialogHeader>

              <DialogFooter>
                <DialogClose>
                  <Button type="button">Үгүй</Button>
                </DialogClose>
                <Button onClick={signout} className="bg-orange-500">
                  Тийм
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="w-screen h-16 border-b border-[#E4E4E7]  bg-white px-8 flex items-center ">
          <div className="w-full h-10 flex items-center justify-between mx-auto text-sm font-medium max-w-screen-xl">
            <div className="flex justify-center items-center gap-4">
              <Link href={'/'}>
                <HomeLogo />
              </Link>
              <Link href={'/estates'}>
                <p>Зарагдаж буй газрууд</p>
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              <Link href={'/add-estate'}>
                <Button className="w-[142px] bg-orange-500 gap-2 flex items-center">
                  <PlusIcon />
                  <p>Зар Оруулах</p>
                </Button>
              </Link>
              <Link href={'/my-estates'}>
                <p>Миний Зарууд</p>
              </Link>
              {user ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">{user.name}</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="font-light">Та гарахдаа итгэлтэй байна уу</DialogTitle>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose>
                        <Button type="button">Үгүй</Button>
                      </DialogClose>
                      <Button onClick={signout} className="bg-orange-500">
                        Тийм
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Link href={'/login'}>
                  <p>Нэвтрэх</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
