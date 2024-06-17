'use client';

import { Label } from '../../../components/Label';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { RiImageFill } from 'react-icons/ri';

import { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '../../../components/Modal';

export function StudentAddModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <h1>Сурагч +</h1>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Бүртгэл үүсгэх</DialogHeader>
        <Label htmlFor="email">Сурагчийн код:</Label>
        <Input />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Сурагчийн код:</Label>
            <Input className="w-[220px]" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="w-full" htmlFor="email">
              Сурагчийн код:
            </Label>
            <Input className="w-[220px]" />
          </div>
        </div>
        <div className="border-dashed border-2 border-gray-200 p-2 rounded-md flex flex-col gap-2 justify-center items-center h-[158px]">
          <RiImageFill />
          <Label htmlFor="dropzone">
            <span className="cursor-pointer"> Файлыг чирж буулгах эсвэл</span>
            <span className="text-md font-semibold cursor-pointer ml-2">Browse</span>
          </Label>
          <Input id="dropzone" type="file" className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
