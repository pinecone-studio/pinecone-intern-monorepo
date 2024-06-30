import { Input } from '@/components/ui/input';
import { Department, EmploymentStatus } from '@/generated';
import { useFormik } from 'formik';
import { LeftArrowIcon, RightArrowWhiteIcon } from '../Icons/ModalIcons';
import { useState } from 'react';

type EmployeesInfoType = {
  firstname: string;
  lastname: string;
  email: string;
  imageURL: string;
  department: Department;
  jobTitle: string[];
  ladderLevel: string;
  salary: string;
  dateOfEmployment: Date;
  employmentStatus: EmploymentStatus;
};

export const StepAdditionalInfo = ({
  prevStep,
  employeesInfo,
  changeEmployee,
  createData,
  fileChangeHandler,
  imageUrl,
}: {
  prevStep: () => void;
  employeesInfo: {
    firstname: string;
    lastname: string;
    email: string;
    imageURL: string;
    department: Department;
    jobTitle: string[];
    ladderLevel: string;
    salary: string;
    dateOfEmployment: Date;
    employmentStatus: EmploymentStatus;
  };
  changeEmployee: (_values: Partial<EmployeesInfoType>) => void;
  createData: () => void;
  fileChangeHandler: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl: string;
}) => {
  const [validMessage, setValidMessage] = useState('');
  const formik = useFormik({
    initialValues: {
      imageURL: employeesInfo.imageURL,
      ladderLevel: employeesInfo.ladderLevel,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('Submitting form with values:', values);
        changeEmployee(values);
        console.log('Employee created successfully:');
        resetForm();
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
  });

  const handleAddImage = () => {
    formik.setFieldValue('imageURL', imageUrl);
    console.log('formik image', imageUrl);
  };

  const handleNext = () => {
    formik.handleSubmit();
    if (formik.values.imageURL !== '' && formik.values.ladderLevel !== '') {
      createData();
    } else {
      setValidMessage('Мэдээллээ бүрэн оруулна уу');
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div data-testid="step-additional-info" className="flex gap-4 flex-col">
        <div className="flex flex-col gap-4">
          <label className=" text-[16px] font-normal text-[#121316]">{'Мэрэгжлийн зэрэг'}</label>
          <Input className="h-[56px] px-[8px] py-[8px] bg-[#F7F7F8]" type="text" placeholder="" name="ladderLevel" value={formik.values.ladderLevel} onChange={formik.handleChange} />
          <div className="flex gap-5 justify-center">
            <Input className="wrap h-[56px] w-[105px] px-[8px] py-[8px] bg-[#F7F7F8]" type="file" name="image" onChange={fileChangeHandler} />
            <p className="text-[12px] text-[red]">{validMessage}</p>
            <button onClick={handleAddImage}>
              upload
              <div
                className="flex w-[150px] h-[150px] border-dashed border rounded-[10px] bg-[#F7F7F8] justify-center items-center"
                style={{ backgroundImage: `URL(${formik.values.imageURL})`, backgroundPosition: 'center', backgroundSize: 'cover' }}
              ></div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button data-testid="prev-button" onClick={prevStep} className="flex justify-center items-center h-12 w-12 rounded-full bg-[#F6F6F6]">
          <div className="flex w-6 h-6 items-center justify-center">
            <LeftArrowIcon />
          </div>
        </button>
        <button onClick={handleNext} type="submit">
          <div data-testid="step-3" className="flex h-12 rounded-[8px] min-w-[80px] px-[16px] py-[12px] bg-[#121316] items-center">
            <div className="px-2 py-1 flex">
              <p className="text-[#FFF] text-[16px] font-[600] leading-5 tracking-[-0.3px] not-italic">Илгээх</p>
            </div>
            <div className="w-6 h-6">
              <RightArrowWhiteIcon />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
