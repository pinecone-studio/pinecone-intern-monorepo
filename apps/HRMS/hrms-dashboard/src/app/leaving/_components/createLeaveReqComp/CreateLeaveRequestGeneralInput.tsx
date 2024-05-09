'use client';

import { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestDaysOrDayOff } from './CreateLeaveRequestDaysOrDayOff';
import { ButtonCustom } from './ButtonCustom';
import { useGetEmployeeRequestQuery } from '@/generated';

const validationSchema = yup.object({
  step1Date: yup.string().required('Огноо оруулна уу'),
  step1UserName: yup.string().required('Нэрээ сонгоно уу'),
  step1LeaveType: yup.string().required('Шалтгаанаа сонгоно уу'),
});

export const CreateLeaveRequestGeneralInput = () => {
  const { setStepNumber, setLeaveReqStep, payload } = useContext(LeaveRequestCreationContext);
  const leaveTypes = ['shit happened', 'remote', 'medical', 'family emergency', 'others'];

  const formik = useFormik({
    initialValues: {
      step1Date: undefined,
      step1UserName: undefined,
      step1LeaveType: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setLeaveReqStep(<CreateLeaveRequestDaysOrDayOff />);
      setStepNumber(1);
    },
  });

  return (
    <div className="w-[100%] flex flex-col gap-[40px]">
      <div className="w-[100%] flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[4px]">
          <div data-cy="step1Label" className="text-[16px] font-normal text-[#121316]">
            Огноо
          </div>
          <div data-testid="date-picker-container" className="w-[100%] p-[8px] bg-[#F7F7F8] rounded-[8px] border-[1px] border-[#D6D8DB]">
            <input data-cy="date-picker-container" className="w-[100%] bg-[#F7F7F8] text-[#121316]" name="step1Date" value={formik.values.step1Date} onChange={formik.handleChange} type="date"></input>
          </div>
          <p data-cy="step1DateError" className="text-[#DC143C] text-[12px]">
            {formik.errors.step1Date}
          </p>
        </div>

        <div className="w-[100%] flex flex-col gap-[4px]" data-testid="name-select-input">
          <div data-cy="step1Label" className="text-[16px] font-normal text-[#121316]">
            Нэрээ сонгоно уу
          </div>
          <select data-cy="name-select-input" className="select select-bordered bg-[#F7F7F8] text-[#121316]" name="step1UserName" value={formik.values.step1UserName} onChange={formik.handleChange}>
            <option disabled selected>
              Нэрээ сонгоно уу
            </option>
            <option data-testid="WorkerName" value={payload?.firstName}>
              {payload?.firstName}
            </option>
          </select>
          <p data-cy="step1UserNameError" className="text-[#DC143C] text-[12px]">
            {formik.errors.step1UserName}
          </p>
        </div>

        <div className="w-[100%] flex flex-col gap-[4px]" data-testid="type-select-input">
          <div data-cy="step1Label" className="text-[16px] font-normal text-[#121316]">
            Шалтгаанаа сонгоно уу
          </div>
          <select
            data-cy="type-select-input"
            className="w-[100%] select select-bordered bg-[#F7F7F8] text-[#121316]"
            name="step1LeaveType"
            value={formik.values.step1LeaveType}
            onChange={formik.handleChange}
          >
            <option disabled selected>
              Шалтгаанаа сонгоно уу
            </option>
            {leaveTypes.map((item, index) => {
              return (
                <option key={index} data-testid={`type-${index}`} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <p data-cy="step1LeaveTypeError" className="text-[#DC143C] text-[12px]">
            {formik.errors.step1LeaveType}
          </p>
        </div>
      </div>
      <ButtonCustom
        onClick={() => {
          formik.handleSubmit();
        }}
        disabled={!formik.isValid}
      />
    </div>
  );
};
