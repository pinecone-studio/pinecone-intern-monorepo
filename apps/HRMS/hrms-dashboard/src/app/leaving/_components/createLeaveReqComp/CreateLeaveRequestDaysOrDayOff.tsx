'use client';

import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestSelectedDayOff } from './CreateLeaveRequestSelectedDayOff';
import { CreateLeaveRequestGeneralInput } from './CreateLeaveRequestGeneralInput';

const validationSchema = yup.object({
  step2LeaveLength: yup.string().required(),
});

export const CreateLeaveRequestDaysOrDayOff = () => {
  const { setLeaveReqStep, setStepNumber } = useContext(LeaveRequestCreationContext);

  const formik = useFormik({
    initialValues: {
      step2LeaveLength: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setLeaveReqStep(<CreateLeaveRequestSelectedDayOff />);
    },
  });

  return (
    <div data-testid="step2Component">
      <div className="flex flex-col gap-[16px]">
        <div className="text-[16px] font-normal text-[#121316]">Хугацааны төрөл сонгох</div>
        <div className="flex gap-[16px]">
          <div className="flex items-center">
            <div className="w-[48px] h-[48px] p-[12px]">
              <input
                className="w-[24px] h-[24px]"
                data-cy="radioButtonDays"
                data-testid="radioButtonDays"
                type="radio"
                id="radioButtonDays"
                name="step2LeaveLength"
                value="days"
                onClick={(e) => formik.setFieldValue('step2LeaveLength', (e.target as HTMLTextAreaElement).value)}
              />
            </div>
            <label htmlFor="radioButtonDays" className="text-[16px] font-normal text-[#121316]">
              Хоног
            </label>
          </div>
          <div className="flex items-center">
            <div className="w-[48px] h-[48px] p-[12px]">
              <input
                className="w-[24px] h-[24px]"
                data-cy="radioButtonDayOff"
                data-testid="radioButtonDayOff"
                type="radio"
                id="radioButtonDayOff"
                name="step2LeaveLength"
                value="dayOff"
                onClick={(e) => formik.setFieldValue('step2LeaveLength', (e.target as HTMLTextAreaElement).value)}
              />
            </div>
            <label htmlFor="radioButtonDayOff" className="text-[16px] font-normal text-[#121316]">
              Өдөр
            </label>
          </div>
        </div>
      </div>

      <div className="pt-[40px] flex justify-between">
        <button
          data-cy="returnPreviousStep"
          data-testid="returnPreviousStep"
          className="p-[12px] bg-[#1C20240A] rounded-full"
          onClick={() => {
            setStepNumber(0);
            setLeaveReqStep(<CreateLeaveRequestGeneralInput />);
          }}
        >
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
          disabled={!formik.values.step2LeaveLength}
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
