import React from 'react';
import { Menu } from '../svg/Menu';
import { Close } from '../svg/Close';
import { Home } from '../svg/Home';
import { WallatIcon } from '../svg/WallatIcon';
import { UserIcon } from '../svg/UserIcon';
import { List } from '../svg/List';
import { Info } from '../svg/Info';
import { Button } from '@/components/ui/button';

const SideMenu = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[319px] h-[812px] flex flex-col justify-between">
        <div>
          <div className="flex justify-between ">
            <div className="flex justify-center items-center p-4 ">
              <Menu />
            </div>
            <div className="flex justify-center items-center p-4">
              <Close />
            </div>
          </div>
          <div className="w-[318px] flex flex-col p-4">
            <div className="flex w-[302px] h-[68px] items-center">
              <div className="flex justify-center items-center p-4 ">
                <Home />
              </div>
              <p className="font-medium text-base">Нүүр хуудас</p>
            </div>
            <div className="flex w-[302px] h-[68px] items-center">
              <div className="flex justify-center items-center p-4 ">
                <WallatIcon />
              </div>
              <p className="font-medium text-base">Хэтэвч</p>
            </div>
            <div className="flex w-[302px] h-[68px] items-center">
              <div className="flex justify-center items-center p-4 ">
                <UserIcon />
              </div>
              <p className="font-medium text-base">Хэрэглэгч</p>
            </div>
            <div className="flex w-[302px] h-[68px] items-center">
              <div className="flex justify-center items-center p-4 ">
                <List />
              </div>
              <p className="font-medium text-base">Захиалгын түүх</p>
            </div>
            <div className="flex w-[302px] h-[68px] items-center">
              <div className="flex justify-center items-center p-4 ">
                <Info />
              </div>
              <p className="font-medium text-base">Бидний тухай</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-4">
          <Button className="w-[287px] h-[36px] flex justify-center" variant="destructive">
            Гарах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
