'use client';

import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '../../../components/ui/dialog';
import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { GoPlus } from 'react-icons/go';
import { Input } from '../../../components/ui/input';
import { useAddStudent } from './store';
import axios from 'axios';
export const StudentAddModal = () => {
  const [value, setValue] = useState('option-one');
  const [image, _setImage] = useState();
  const {
    firstName,
    lastName,
    studentCode,
    profileImgUrl,
    classId,
    phoneNumber,
    email,
    active,
    setFirstName,
    setLastName,
    setStudentCode,
    setProfileImgUrl,
    setClassId,
    setPhoneNumber,
    setEmail,
    setActive,
  } = useAddStudent();

  const AddStudent = async () => {
    try {
      const response = await axios.post('/api/student/add', {
        firstName,
        lastName,
        studentCode,
        profileImgUrl,
        classId,
        phoneNumber,
        email,
        active,
      });
      console.log(response.data);
      setFirstName('');
      setLastName('');
      setStudentCode('');
      setProfileImgUrl('');
      setClassId('');
      setPhoneNumber('');
      setEmail('');
      setActive(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between mb-10">
      <div data-testid="add-student-modal" className="flex justify-center items-center border rounded-md p-3 gap-2">
        <CiSearch />
        <input placeholder="Сурагчийн Нэр, Код ..." className="w-[260px]" />
      </div>
      <Dialog>
        <DialogTrigger data-testid="title">
          <h1 className="text-md border flex p-3 w-[130px] rounded-md bg-[#18181B] text-white justify-center items-center gap-2">
            Сурагч <GoPlus />
          </h1>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Бүртгэл үүсгэх</DialogHeader>
          <Label data-testid="Student-code-label" htmlFor="email">
            Сурагчийн код
          </Label>
          <Input value={studentCode} onChange={(e) => setStudentCode(e.target.value)} data-testid="Student-code-input" />
          <div data-testid="radio-group" className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Label htmlFor="FirstName">Овог</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} data-testid="FirstName-input" className="w-[220px]" />
            </div>
            <div className="flex flex-col gap-2">
              <Label data-test="Name-label" className="w-full" htmlFor="email">
                Нэр
              </Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} data-testid="LastName-input" className="w-[220px]" />
            </div>
          </div>
          <Label data-testid="phone-number-label" htmlFor="email">
            Утасны дугаар
          </Label>
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} data-testid="phone-number-input" />
          <Label data-test="email-label" htmlFor="email">
            Цахим хаяг
          </Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} data-testid="email-input" placeholder="email@example.com" />
          <div data-testid="dropzone" className={` ${!image && 'border-dashed border-2 border-gray-200 p-2 rounded-md flex flex-col gap-2 justify-center items-center h-[158px]'}  `}>
            <img className="w-[110px] h-[110px] rounded-full" src="/images/studentProfile.jpg" alt="profileImage" />
            {image && (
              <Label htmlFor="dropzone">
                <span className="cursor-pointer"> Файлыг чирж буулгах эсвэл</span>
                <span className="text-md font-semibold cursor-pointer ml-2">Browse</span>
              </Label>
            )}
          </div>
          <RadioGroup data-testid="radio-group" onValueChange={(value) => setValue(value)} className="flex" defaultValue="option-one">
            <div data-test="passive-radio-group-item" className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${value === 'option-one' ? 'bg-slate-100' : 'bg-white'}`}>
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Идэвхгүй </Label>
            </div>
            <div data-testid="active-radio-group-item" className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${value === 'option-two' ? 'bg-slate-100' : 'bg-white'}`}>
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">Идэвхитэй</Label>
            </div>
          </RadioGroup>
          <Button onClick={() => AddStudent()} data-testid="add-student-button" className="w-[200px] ">
            Хадгалах <FaArrowRightLong />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
