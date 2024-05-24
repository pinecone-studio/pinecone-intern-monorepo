'use client';
import { useState } from 'react';
import { UpdateButton } from '../../../_components';
import { EmploymentInfoInput } from './EmploymentInfoInput';

type UpdateEmploymentProps = {
  jobTitle: string | null | undefined;
  department: string | null | undefined;
  dateOfEmployment: string | null | undefined;
  employmentStatus: string | null | undefined;
  refetch: () => void;
};

export const UpdateEmployment = (props: UpdateEmploymentProps) => {
  const today = new Date();
  const year = props.dateOfEmployment?.toString().slice(0, 4);
  const month = props.dateOfEmployment?.toString().slice(5, 7);
  const day = props.dateOfEmployment?.toString().slice(8, 10);

  const started = new Date(Number(year), Number(month), Number(day));

  const employedYear = Math.floor(today.getFullYear() - started.getFullYear());

  const [updateEmpInput, setUpdateEmpInput] = useState(false);

  return (
    <section data-cy="updateEmployment" className="flex flex-col w-full bg-white rounded-xl p-6 gap-6 ">
      <div className="flex justify-between">
        <p data-cy="employmentPageTitle" className="text-black text-lg font-semibold cursor-pointer">
          Хөдөлмөр эрхлэлтийн мэдээлэл
        </p>
        <div
          data-cy="updateEmploymentInfoBtn"
          onClick={() => {
            setUpdateEmpInput(true);
          }}
        >
          <UpdateButton />
        </div>
        {updateEmpInput && (
          <div data-testid="update-employment" className="flex w-full h-full justify-center items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-50 ">
            <div className="absolute z-50">
              <EmploymentInfoInput
                refetch={props.refetch}
                setUpdateEmpInput={setUpdateEmpInput}
                jobTitle={props.jobTitle}
                department={props.department}
                dateOfEmployment={props.dateOfEmployment}
                employmentStatus={props.employmentStatus}
              />
            </div>
            <div
              onClick={() => {
                setUpdateEmpInput(false);
              }}
              className="flex w-full h-full bg-[#00000080] justify-center items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-30 overflow-hidden "
            ></div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Албан тушаал</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.jobTitle}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Хэлтэс</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.department}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Ажилд орсон өдөр</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.dateOfEmployment?.toString().slice(0, 10)}</p>
      </div>
      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Ажилласан хугацаа</p>
        <p className="w-full text-left text-main text-base font-semibold">{employedYear} жил</p>
      </div>

      <div className="flex flex-col gap-1 justify-start">
        <p className="w-full text-left text-main  text-sm font-normal">Төлөв</p>
        <p className="w-full text-left text-main text-base font-semibold">{props.employmentStatus}</p>
      </div>
    </section>
  );
};
