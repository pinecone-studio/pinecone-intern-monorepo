import { FaArrowRightLong } from 'react-icons/fa6';
import { Dispatch, SetStateAction } from 'react';
import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ClassType, useCreateClassMutation, useGetClassesQuery } from '@/generated';

export const AddClassModal = ({ open, onOpenChange }: { open: boolean; onOpenChange: Dispatch<SetStateAction<boolean>> }) => {
  const [createClass] = useCreateClassMutation();
  const { refetch } = useGetClassesQuery({});

  interface FormValues {
    name: string;
    teacher1: string;
    teacher2: string;
    startDate: string;
    endDate: string;
    classType: string;
  }

  interface FormErrors {
    name?: string;
    teacher1?: string;
    teacher2?: string;
    startDate?: string;
    endDate?: string;
    classType?: string;
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      teacher1: '',
      teacher2: '',
      startDate: '',
      endDate: '',
      classType: ClassType.Coding,
    },
    validate: (values: FormValues): FormErrors => {
      const errors: FormErrors = {};
      if (!values.name) errors.name = 'Class name is required';
      if (!values.teacher1) errors.teacher1 = 'Teacher name is required';
      if (!values.teacher2) errors.teacher2 = 'Teacher name is required';
      if (!values.startDate) errors.startDate = 'Start date is required';
      if (!values.endDate) errors.endDate = 'End date is required';
      if (!values.classType) errors.classType = 'Please select a class type';
      return errors;
    },
    onSubmit: async (values) => {
      await createClass({
        variables: {
          input: {
            name: values.name,
            teachers: [values.teacher1, values.teacher2],
            startDate: values.startDate,
            endDate: values.endDate,
            classType: values.classType as ClassType,
          },
        },
      });
      formik.resetForm();
      refetch();
      onOpenChange(false);
    },
  });

  return (
    <div className="flex justify-between mb-10">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger>
          <div className="hidden"></div>
        </DialogTrigger>
        <DialogContent data-testid="modal-content">
          <DialogHeader data-testid="modal-header">Анги нэмэх</DialogHeader>
          <Label>Ангийн нэр</Label>
          <Input value={formik.values.name} onChange={(e) => formik.setFieldValue('name', e.target.value)} data-testid="class-name-input" />
          {formik.touched.name && formik.errors.name && <div className="text-red-500">{formik.errors.name}</div>}
          <div data-testid="teachers-container" className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Label data-testid="teacher1-label">Багш 1-н нэр</Label>
              <Input value={formik.values.teacher1} onChange={(e) => formik.setFieldValue('teacher1', e.target.value)} data-testid="teacher1-input" className="w-[220px]" />
              {formik.touched.teacher1 && formik.errors.teacher1 && <div className="text-red-500">{formik.errors.teacher1}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <Label data-testid="teacher2-label" data-test="Name-label" className="w-full">
                Багш 2-н нэр
              </Label>
              <Input data-testid="teacher2-input" value={formik.values.teacher2} onChange={(e) => formik.setFieldValue('teacher2', e.target.value)} className="w-[220px]" />
              {formik.touched.teacher2 && formik.errors.teacher2 && <div className="text-red-500">{formik.errors.teacher2}</div>}
            </div>
          </div>
          <div data-testid="dates-container" className="flex justify-between">
            <div className="flex flex-col gap-2">
              <Label data-testid="start-date-label">Эхлэх огноо</Label>
              <Input data-testid="start-date-input" value={formik.values.startDate} onChange={(e) => formik.setFieldValue('startDate', e.target.value)} className="w-[220px]" />
              {formik.touched.startDate && formik.errors.startDate && <div className="text-red-500">{formik.errors.startDate}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <Label data-test="end-date-label" className="w-full" htmlFor="email">
                Дуусах огноо
              </Label>
              <Input data-testid="end-date-input" value={formik.values.endDate} onChange={(e) => formik.setFieldValue('endDate', e.target.value)} className="w-[220px]" />
              {formik.touched.endDate && formik.errors.endDate && <div className="text-red-500">{formik.errors.endDate}</div>}
            </div>
          </div>

          <RadioGroup
            data-testid="class-type-radio-group"
            onValueChange={(value) => {
              formik.setFieldValue('classType', value);
            }}
            className="flex flex-row-reverse"
            defaultValue={ClassType.Coding}
          >
            <div
              data-testid="coding-radio-container"
              className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${formik.values.classType === ClassType.Coding ? 'bg-slate-100' : 'bg-white'}`}
            >
              <RadioGroupItem data-testid="coding-radio-button" value={ClassType.Coding} />
              <Label htmlFor="option-one" data-testid="coding-radio-label">
                Кодинг анги
              </Label>
            </div>
            <div
              data-testid="design-radio-container"
              className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${formik.values.classType === ClassType.Design ? 'bg-slate-100' : 'bg-white'}`}
            >
              <RadioGroupItem data-testid="design-radio-button" value={ClassType.Design} />
              <Label data-testid="design-radio-label" htmlFor="option-two">
                Дизайн анги
              </Label>
            </div>
          </RadioGroup>
          <Button type="submit" onClick={() => formik.handleSubmit()} data-testid="submit-button" className="w-[200px]">
            Хадгалах <FaArrowRightLong />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
