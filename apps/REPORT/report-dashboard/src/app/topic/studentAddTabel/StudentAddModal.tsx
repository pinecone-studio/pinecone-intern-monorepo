'use client';

import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { RiImageFill } from 'react-icons/ri';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '../../../components/ui/dialog';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GoPlus } from 'react-icons/go';
import { Input } from '../../../components/ui/input';

export const StudentAddModal = () => {
  const [value, setValue] = useState('option-one');

  return (
    <div className="flex justify-between mb-10">
      <div className="flex justify-center items-center border rounded-md p-3 gap-2">
        <CiSearch />
        <input placeholder="Сурагчийн Нэр, Код ..." className="w-[260px]" />
      </div>
      <Dialog>
        <DialogTrigger>
          <h1 className="text-md border flex p-3 w-[130px] rounded-md bg-[#18181B] text-white justify-center items-center gap-2">
            Сурагч <GoPlus />
          </h1>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Бүртгэл үүсгэх</DialogHeader>
          <Label htmlFor="email">Сурагчийн код:</Label>
          <Input />
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Овог</Label>
              <Input className="w-[220px]" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="w-full" htmlFor="email">
                Нэр
              </Label>
              <Input className="w-[220px]" />
            </div>
          </div>
          <Label htmlFor="email">Утасны дугаар </Label>
          <Input />
          <Label htmlFor="email">Цахим хаяг</Label>
          <Input placeholder="email@example.com" />
          <div className="border-dashed border-2 border-gray-200 p-2 rounded-md flex flex-col gap-2 justify-center items-center h-[158px]">
            <RiImageFill />
            <Label htmlFor="dropzone">
              <span className="cursor-pointer"> Файлыг чирж буулгах эсвэл</span>
              <span className="text-md font-semibold cursor-pointer ml-2">Browse</span>
            </Label>
            <Input id="dropzone" type="file" className="hidden" />
          </div>
          <RadioGroup onValueChange={(value) => setValue(value)} className="flex" defaultValue="option-one">
            <div className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${value === 'option-one' ? 'bg-slate-100' : 'bg-white'}`}>
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Идэвхгүй </Label>
            </div>
            <div className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${value === 'option-two' ? 'bg-slate-100' : 'bg-white'}`}>
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Идэвхитэй</Label>
            </div>
          </RadioGroup>
          <Button className="w-[200px] ">
            Хадгалах <FaArrowRightLong />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
