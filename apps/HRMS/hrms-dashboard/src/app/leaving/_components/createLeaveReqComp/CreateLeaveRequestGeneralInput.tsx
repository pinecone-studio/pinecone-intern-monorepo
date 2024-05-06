'use client';

import { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestDaysOrDayOff } from './CreateLeaveRequestDaysOrDayOff';

const validationSchema = yup.object({
  step1Date: yup.string().required(),
  step1UserName: yup.string().required(),
  step1LeaveType: yup.string().required(),
});

export const CreateLeaveRequestGeneralInput = () => {
  const { setStepNumber, setLeaveReqStep } = useContext(LeaveRequestCreationContext);

  const workerName = { name: 'WorkerName' };

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
            <input data-cy="date-picker-container" className="w-[100%] bg-[#F7F7F8]" name="step1Date" value={formik.values.step1Date} onChange={formik.handleChange} type="date"></input>
          </div>
        </div>

        <div className="w-[100%] flex flex-col gap-[4px]" data-testid="name-select-input">
          <div data-cy="step1Label" className="text-[16px] font-normal text-[#121316]">
            Нэрээ сонгоно уу
          </div>
          <select data-cy="name-select-input" className="select select-bordered bg-[#F7F7F8]" name="step1UserName" value={formik.values.step1UserName} onChange={formik.handleChange}>
            <option disabled selected>
              Нэрээ сонгоно уу
            </option>
            <option data-testid="WorkerName" value={workerName.name}>
              {workerName.name}
            </option>
          </select>
        </div>

        <div className="w-[100%] flex flex-col gap-[4px]" data-testid="type-select-input">
          <div data-cy="step1Label" className="text-[16px] font-normal text-[#121316]">
            Шалтгаанаа сонгоно уу
          </div>
          <select data-cy="type-select-input" className="w-[100%] select select-bordered bg-[#F7F7F8]" name="step1LeaveType" value={formik.values.step1LeaveType} onChange={formik.handleChange}>
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
        </div>
      </div>
      <div className="pt-[40px] flex justify-between">
        <button className="p-[12px] bg-[#1C20240A] rounded-full invisible">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#121316" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <button
          data-cy="next-btn"
          data-testid="nextButton"
          onClick={() => {
            formik.handleSubmit();
          }}
          className="bg-[#121316] flex gap-[4px] py-[12px] px-[16px] rounded-[8px] text-white disabled:bg-[#D6D8DB] disabled:text-[#1C20243D]"
          disabled={!formik.values.step1Date || !formik.values.step1LeaveType || !formik.values.step1UserName}
        >
          <div className="text-[16px] font-semibold">Дараах</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  );
};
