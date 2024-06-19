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
import { useCreateStudentMutation } from '@/generated';
import { useFormik } from 'formik';

export const StudentAddModal = () => {
  const [value, setValue] = useState('option-one');
  const [image, _setImage] = useState();
  const [createStudent] = useCreateStudentMutation();
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      studentCode: '',
      profileImgUrl: '',
      classId: '',
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await createStudent({
          variables: {
            input: {
              email: values.email,
              firstName: values.firstName,
              lastName: values.lastName,
              phoneNumber: values.phoneNumber,
              studentCode: values.studentCode,
              profileImgUrl: 'adsf',
              classId: 'asdf',
            },
          },
        });
        console.log('Student added');
      } catch (error) {
        console.error('error', error);
      }
    },
  });

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
          <Input value={formik.values.studentCode} onChange={(e) => formik.setFieldValue('studentCode', e.target.value)} data-testid="Student-code-input" />
          <div data-testid="radio-group" className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Label htmlFor="FirstName">Овог</Label>
              <Input value={formik.values.firstName} onChange={(e) => formik.setFieldValue('firstName', e.target.value)} data-testid="FirstName-input" className="w-[220px]" />
            </div>
            <div className="flex flex-col gap-2">
              <Label data-test="Name-label" className="w-full" htmlFor="email">
                Нэр
              </Label>
              <Input value={formik.values.lastName} onChange={(e) => formik.setFieldValue('lastName', e.target.value)} data-testid="LastName-input" className="w-[220px]" />
            </div>
          </div>
          <Label data-testid="phone-number-label" htmlFor="email">
            Утасны дугаар
          </Label>
          <Input value={formik.values.phoneNumber} onChange={(e) => formik.setFieldValue('phoneNumber', e.target.value)} data-testid="phone-number-input" />
          <Label data-test="email-label" htmlFor="email">
            Цахим хаяг
          </Label>
          <Input value={formik.values.email} onChange={(e) => formik.setFieldValue('email', e.target.value)} data-testid="email-input" placeholder="email@example.com" />
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
          <Button type="submit" onClick={() => formik.handleSubmit()} data-testid="add-student-button" className="w-[200px] ">
            Хадгалах <FaArrowRightLong />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
