'use client';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Dispatch, SetStateAction, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCreateStudentMutation, useGetStudentByClassIdQuery } from '@/generated';
import { Toaster, toast } from 'sonner';
import * as Yup from 'yup';
import UploadImage from '../../student/_components/UploadImage';

const validationSchema = Yup.object().shape({
  studentCode: Yup.string().required('Сурагчийн код оруулна уу'),
  lastName: Yup.string().required('Овог оруулна уу'),
  firstName: Yup.string().required('Нэр оруулна уу'),
  phoneNumber: Yup.string().required('Утасны дугаар оруулна уу'),
  email: Yup.string().email('Цахим хаяг буруу форматтай').required('Цахим хаяг оруулна уу'),
});

interface CustomToastProps {
  message: string;
}
type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  studentCode: string;
  profileImgUrl: string;
  classId: string;
  active: string;
};
export const CustomToast: React.FC<CustomToastProps> = ({ message }) => <div data-cy="toast-message">{message}</div>;
export const CustomToastError: React.FC<CustomToastProps> = ({ message }) => <div data-cy="toast-message-error">{message}</div>;
interface AddStudentModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  classId: string;
}
export const StudentAddModal: React.FC<AddStudentModalProps> = ({ open, onOpenChange, classId }) => {
  const [createStudent] = useCreateStudentMutation();
  const [uploadImg, setUploadImg] = useState<string>('');
  const [activeStatus, setActiveStatus] = useState('ACTIVE');
  const { refetch } = useGetStudentByClassIdQuery({
    variables: {
      classId: classId,
    },
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      studentCode: '',
      profileImgUrl: '',
      classId: '',
      active: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await createStudent({
          variables: {
            input: {
              ...values,
              profileImgUrl: uploadImg,
              active: activeStatus,
              classId: classId,
            },
          },
        });
        toast.success(<CustomToast message="Сурагч амжилттай нэмэгдлээ" />);
        formik.resetForm();
        setUploadImg('');
        refetch();
      } catch (error) {
        toast.error(<CustomToastError message="Алдаа гарлаа Дахин оролдоно уу." />);
        console.log(error);
        console.log('param', classId);
      }
      onOpenChange(false);
    },
  });
  const renderInput = (field: keyof FormValues, label: string, type: string, testId: string) => (
    <div data-testid="input" className="flex flex-col gap-2">
      <Label htmlFor={field}>{label}</Label>
      <Input
        type={type}
        value={formik.values[field]}
        onChange={(e) => formik.setFieldValue(field, e.target.value)}
        data-testid={testId}
        className={field === 'lastName' || field === 'firstName' ? 'w-[220px]' : ''}
      />
      {formik.touched[field as keyof FormValues] && formik.errors[field as keyof FormValues] && <div className="text-red-500 text-sm">{formik.errors[field as keyof FormValues]}</div>}
    </div>
  );
  return (
    <div className="flex justify-between mb-10">
      <div data-testid="add-student-modal" className="flex justify-center items-center border rounded-md p-3 gap-2">
        <CiSearch />
        <input placeholder="Сурагчийн Нэр, Код ..." className="w-[260px]" />
      </div>
      <Toaster position="bottom-right" richColors={true} />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger className="hidden"></DialogTrigger>
        <DialogContent>
          <DialogHeader>Бүртгэл үүсгэх</DialogHeader>
          {renderInput('studentCode', 'Сурагчийн код', 'text', 'student-code-input')}
          <div data-testid="radio-group" className="flex justify-between">
            {renderInput('lastName', 'Овог', 'text', 'lastName-input')}
            {renderInput('firstName', 'Нэр', 'text', 'firstName-input')}
          </div>
          {renderInput('phoneNumber', 'Утасны дугаар', 'number', 'phone-number-input')}
          {renderInput('email', 'Цахим хаяг', 'text', 'email-input')}
          <div className="border-dashed border-2 border-gray-300 p-2 rounded-md flex flex-col gap-2 justify-center items-center h-[158px]">
            {!uploadImg && <UploadImage value={uploadImg} onChange={setUploadImg} />}
            {uploadImg && (
              <Image data-testid="student-profile-image" className="w-[110px] h-[110px] rounded-full border-dashed border border-black" src={uploadImg} alt="profileImage" width={110} height={110} />
            )}
          </div>
          <RadioGroup
            data-testid="radio-group"
            onValueChange={(value) => {
              setActiveStatus(value);
              formik.setFieldValue('active', value);
            }}
            className="flex"
            defaultValue={activeStatus}
          >
            <div className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${activeStatus === 'PASSIVE' ? 'bg-slate-200' : 'bg-white'}`}>
              <RadioGroupItem data-testid="passive-radio-group-item" value="PASSIVE" id="option-one" />
              <Label htmlFor="option-one">Идэвхгүй </Label>
            </div>
            <div className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${activeStatus === 'ACTIVE' ? 'bg-slate-200' : 'bg-white'}`}>
              <RadioGroupItem data-testid="active-radio-group-item" value="ACTIVE" id="option-two" />
              <Label htmlFor="option-two">Идэвхитэй</Label>
            </div>
          </RadioGroup>
          <Button
            type="submit"
            onClick={() => {
              formik.handleSubmit();
            }}
            data-testid="add-student-button"
            className="w-[200px] "
          >
            Хадгалах <FaArrowRightLong />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
