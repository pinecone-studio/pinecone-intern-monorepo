import React, { Dispatch, SetStateAction, useState, useCallback } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useFormik, FormikHelpers } from 'formik';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ClassType, useGetClassesQuery, useCreateClassMutation } from '@/generated';
import * as yup from 'yup';

interface FormValues {
  name: string;
  teacher1: string;
  teacher2: string;
  startDate: string;
  endDate: string;
  classType: ClassType;
}

const initialValues: FormValues = {
  name: '',
  teacher1: '',
  teacher2: '',
  startDate: '',
  endDate: '',
  classType: ClassType.Coding,
};

const validationSchema = yup.object().shape({
  name: yup.string().required('This field is required'),
  teacher1: yup.string().required('This field is required'),
  teacher2: yup.string().required('This field is required'),
  startDate: yup.string().required('This field is required'),
  endDate: yup.string().required('This field is required'),
});

interface AddClassModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const AddClassModal: React.FC<AddClassModalProps> = ({ open, onOpenChange }) => {
  const [createClass] = useCreateClassMutation();
  const { refetch } = useGetClassesQuery({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
      setLoading(true);
      await createClass({
        variables: {
          input: {
            name: values.name,
            teachers: [values.teacher1, values.teacher2],
            startDate: values.startDate,
            endDate: values.endDate,
            classType: values.classType,
          },
        },
      });
      setTimeout(() => {
        setLoading(false);
        resetForm();
        refetch();
        onOpenChange(false);
      }, 2000);
    },
    [createClass, refetch, onOpenChange]
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const renderInput = useCallback(
    (name: keyof FormValues, label: string, testId: string) => (
      <div className="flex flex-col gap-2">
        <Label data-testid={`${testId}-label`}>{label}</Label>
        <Input data-testid={testId} name={name} value={formik.values[name]} onChange={formik.handleChange} className="w-[220px]" />
        {formik.errors[name] && <div className="text-red-500">{formik.errors[name]}</div>}
      </div>
    ),
    [formik]
  );

  const renderRadioGroup = useCallback(
    () => (
      <RadioGroup data-testid="class-type-radio-group" onValueChange={(value) => formik.setFieldValue('classType', value)} className="flex flex-row-reverse" defaultValue={ClassType.Coding}>
        {[ClassType.Coding, ClassType.Design].map((type) => (
          <div
            key={type}
            data-testid={`${type.toLowerCase()}-radio-container`}
            className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${formik.values.classType === type ? 'bg-slate-100' : 'bg-white'}`}
          >
            <RadioGroupItem data-testid={`${type.toLowerCase()}-radio-button`} value={type} />
            <Label data-testid={`${type.toLowerCase()}-radio-label`}>{type === ClassType.Coding ? 'Кодинг анги' : 'Дизайн анги'}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
    [formik]
  );

  return (
    <div className="flex justify-between mb-10">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger>
          <div className="hidden"></div>
        </DialogTrigger>
        <DialogContent data-testid="modal-content">
          <DialogHeader data-testid="modal-header">Анги нэмэх</DialogHeader>
          {renderInput('name', 'Ангийн нэр', 'class-name-input')}
          <div data-testid="teachers-container" className="flex justify-between">
            {renderInput('teacher1', 'Багш 1-н нэр', 'teacher1-input')}
            {renderInput('teacher2', 'Багш 2-н нэр', 'teacher2-input')}
          </div>
          <div data-testid="dates-container" className="flex justify-between">
            {renderInput('startDate', 'Эхлэх огноо', 'start-date-input')}
            {renderInput('endDate', 'Дуусах огноо', 'end-date-input')}
          </div>
          {renderRadioGroup()}
          <Button disabled={loading} type="submit" onClick={() => formik.handleSubmit()} data-testid="submit-button" className="w-[200px]">
            Хадгалах <FaArrowRightLong />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
