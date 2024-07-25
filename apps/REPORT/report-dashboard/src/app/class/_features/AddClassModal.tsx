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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

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
  name: yup.string().required('Ангийн нэр оруулна уу').min(2, 'Ангийн нэр хамгийн багадаа 2 тэмдэгт байна').max(50, 'Ангийн нэр хамгийн ихдээ 50 тэмдэгт байна'),
  teacher1: yup.string().required('Багш 1-н нэр оруулна уу').min(2, 'Багшийн нэр хамгийн багадаа 2 тэмдэгт байна').max(50, 'Багшийн нэр хамгийн ихдээ 50 тэмдэгт байна'),
  teacher2: yup.string().required('Багш 2-н нэр оруулна уу').min(2, 'Багшийн нэр хамгийн багадаа 2 тэмдэгт байна').max(50, 'Багшийн нэр хамгийн ихдээ 50 тэмдэгт байна'),
  startDate: yup.date().required('Эхлэх огноо оруулна уу').min(new Date(), 'Эхлэх огноо өнөөдрөөс хойш байх ёстой'),
  endDate: yup.date().required('Дуусах огноо оруулна уу').min(yup.ref('startDate'), 'Дуусах огноо нь эхлэх огнооноос хойш байх ёстой'),
});
interface AddClassModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const AddClassModal: React.FC<AddClassModalProps> = ({ open, onOpenChange }) => {
  const [createClass] = useCreateClassMutation();
  const { refetch } = useGetClassesQuery({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    setLoading(true);

    try {
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
      setLoading(false);
      resetForm();
      refetch();
      onOpenChange(false);
      alert('Ангийг амжилттай нэмлээ!');
    } catch (error) {
      alert('Ангийг нэмэхэд алдаа гарлаа.');
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const renderInput = (name: keyof FormValues, label: string, testId: string) => (
    <div className="flex flex-col gap-2">
      <Label data-testid={`${testId}-label`}>{label}</Label>
      <Input data-testid={testId} name={name} value={formik.values[name]} onChange={(e) => formik.setFieldValue(name, e.target.value)} className="w-[220px]" />
      {formik.touched[name as keyof FormValues] && formik.errors[name as keyof FormValues] && <div className="text-red-500 text-sm">{formik.errors[name as keyof FormValues]}</div>}
    </div>
  );

  const renderDatePicker = (name: 'startDate' | 'endDate', label: string, testId: string) => (
    <div className="flex flex-col gap-2">
      <Label data-testid={`${testId}-label`}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className={'w-[220px] justify-start text-left font-normal'} data-testid={`${testId}`}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formik.values[name] ? formik.values[name] : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={formik.values[name] ? new Date(formik.values[name]) : undefined}
            onSelect={(date) => formik.setFieldValue(name, date ? format(date, 'yyyy-MM-dd') : '')}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {formik.touched[name] && formik.errors[name] && <div className="text-red-500 text-sm">{formik.errors[name]}</div>}
    </div>
  );

  const renderRadioGroup = () => (
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
            {renderDatePicker('startDate', 'Эхлэх огноо', 'start-date-input')}
            {renderDatePicker('endDate', 'Дуусах огноо', 'end-date-input')}
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
