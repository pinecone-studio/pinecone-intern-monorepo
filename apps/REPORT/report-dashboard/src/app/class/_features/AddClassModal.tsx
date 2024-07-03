import { FaArrowRightLong } from 'react-icons/fa6';
import { Dispatch, SetStateAction } from 'react';
import { useFormik, FormikErrors } from 'formik';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { ClassType, useCreateClassMutation, useGetClassesQuery } from '@/generated';

interface FormValues {
  name: string;
  teacher1: string;
  teacher2: string;
  startDate: string;
  endDate: string;
  classType: ClassType;
}

interface AddClassModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const initialValues: FormValues = {
  name: '',
  teacher1: '',
  teacher2: '',
  startDate: '',
  endDate: '',
  classType: ClassType?.Coding,
};

const validate = (values: FormValues): FormikErrors<FormValues> => {
  const errors: FormikErrors<FormValues> = {};
  const requiredFields: (keyof FormValues)[] = ['name', 'teacher1', 'teacher2', 'startDate', 'endDate', 'classType'];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = `${field} is required`;
    }
  });

  return errors;
};

export const AddClassModal: React.FC<AddClassModalProps> = ({ open, onOpenChange }) => {
  const [getClasses] = useCreateClassMutation();
  const { refetch } = useGetClassesQuery({});

  const formik = useFormik<FormValues>({
    initialValues,
    validate,
    onSubmit: async (values) => {
      await getClasses({
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
      formik.resetForm();
      refetch();
      onOpenChange(false);
    },
  });

  const renderInput = (field: keyof FormValues, label: string, testId: string) => (
    <div className="flex flex-col gap-2">
      <Label data-testid={`${testId}-label`}>{label}</Label>
      <Input data-testid={`${testId}-input`} value={formik.values[field]} onChange={(e) => formik.setFieldValue(field, e.target.value)} className="w-[220px]" />
      {formik.touched[field] && formik.errors[field] && <div className="text-red-500">{formik.errors[field]}</div>}
    </div>
  );

  const renderRadioOption = (value: ClassType, label: string) => (
    <div
      data-testid={`${value.toLowerCase()}-radio-container`}
      className={`flex items-center space-x-2 border p-2 rounded-md w-[220px] ${formik.values.classType === value ? 'bg-slate-100' : 'bg-white'}`}
    >
      <RadioGroupItem data-testid={`${value.toLowerCase()}-radio-button`} value={value} />
      <Label data-testid={`${value.toLowerCase()}-radio-label`}>{label}</Label>
    </div>
  );

  return (
    <div className="flex justify-between mb-10">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger>
          <div className="hidden"></div>
        </DialogTrigger>
        <DialogContent data-testid="modal-content">
          <DialogHeader data-testid="modal-header">Анги нэмэх</DialogHeader>
          {renderInput('name', 'Ангийн нэр', 'class-name')}
          <div data-testid="teachers-container" className="flex justify-between">
            {renderInput('teacher1', 'Багш 1-н нэр', 'teacher1')}
            {renderInput('teacher2', 'Багш 2-н нэр', 'teacher2')}
          </div>
          <div data-testid="dates-container" className="flex justify-between">
            {renderInput('startDate', 'Эхлэх огноо', 'start-date')}
            {renderInput('endDate', 'Дуусах огноо', 'end-date')}
          </div>
          <RadioGroup data-testid="class-type-radio-group" onValueChange={(value) => formik.setFieldValue('classType', value)} className="flex flex-row-reverse" defaultValue={ClassType.Coding}>
            {renderRadioOption(ClassType.Coding, 'Кодинг анги')}
            {renderRadioOption(ClassType.Design, 'Дизайн анги')}
          </RadioGroup>
          <Button type="submit" onClick={() => formik.handleSubmit()} data-testid="submit-button" className="w-[200px]">
            Хадгалах <FaArrowRightLong />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
