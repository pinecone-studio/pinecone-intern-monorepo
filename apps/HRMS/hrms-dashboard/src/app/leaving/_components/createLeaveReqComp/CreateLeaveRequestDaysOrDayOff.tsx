'use client';

import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import * as yup from 'yup';
import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestSelectedDayOff } from './CreateLeaveRequestSelectedDayOff';
import { CreateLeaveRequestSelectedDays } from './CreateLeaveRequestSelectedDays';
import { ButtonCustom } from './ButtonCustom';
import { CreateLeaveRequestGeneralInput } from './CreateLeaveRequestGeneralInput';
import { CreateLeaveRequestAdditionInfo } from './CreateLeaveRequestAdditionInfo';

const validationSchemaDayOff = yup.object({
  step2LeaveLength: yup.string().required('Хоног эсвэл өдөр сонгоно уу'),
  step2Date: yup.string().required('Огноо сонгоно уу'),
  step2StartHour: yup.string().required('Эхлэх цаг сонгоно уу'),
  step2EndHour: yup.string().required('Дуусах цаг сонгоно уу'),
});

const validationSchemaDays = yup.object({
  step2LeaveLength: yup.string().required('Хоног эсвэл өдөр сонгоно уу'),
  step2StartDate: yup.string().required('Эхлэх өдөр сонгоно уу'),
  step2EndDate: yup.string().required('Дуусах өдөр сонгоно уу'),
});

export const CreateLeaveRequestDaysOrDayOff = () => {
  const { setLeaveReqStep, setStepNumber } = useContext(LeaveRequestCreationContext);
  const [radioValue, setRadioValue] = useState('dayOff');

  const formikSubmitHandler = () => {
    if (radioValue == 'dayOff') {
      formikDayOff.handleSubmit();
    }
    if (radioValue == 'days') {
      formikDays.handleSubmit();
    }
  };

  const formikDayOff = useFormik({
    initialValues: {
      step2LeaveLength: '',
      step2Date: undefined,
      step2StartHour: undefined,
      step2EndHour: undefined,
    },
    validationSchema: validationSchemaDayOff,
    onSubmit: () => {
      setLeaveReqStep(<CreateLeaveRequestAdditionInfo />);
      setStepNumber(2);
    },
  });

  const formikDays = useFormik({
    initialValues: {
      step2LeaveLength: '',
      step2StartDate: undefined,
      step2EndDate: undefined,
    },
    validationSchema: validationSchemaDays,
    onSubmit: () => {
      setLeaveReqStep(<CreateLeaveRequestAdditionInfo />);
      setStepNumber(2);
    },
  });

  return (
    <div data-testid="step2Component">
      <div className="flex flex-col gap-[16px]">
        <div>
          <div className="text-[16px] font-normal text-[#121316]">Хугацааны төрөл сонгох</div>
          <p className="text-[#DC143C] text-[12px]">{formikDayOff.errors.step2LeaveLength}</p>
          <p className="text-[#DC143C] text-[12px]">{formikDays.errors.step2LeaveLength}</p>
        </div>
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
                checked={radioValue === 'days'}
                onClick={(e) => {
                  formikDays.setFieldValue('step2LeaveLength', (e.target as HTMLTextAreaElement).value);
                  setRadioValue((e.target as HTMLTextAreaElement).value);
                }}
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
                checked={radioValue === 'dayOff'}
                onClick={(e) => {
                  formikDayOff.setFieldValue('step2LeaveLength', (e.target as HTMLTextAreaElement).value);
                  setRadioValue((e.target as HTMLTextAreaElement).value);
                }}
              />
            </div>
            <label htmlFor="radioButtonDayOff" className="text-[16px] font-normal text-[#121316]">
              Өдөр
            </label>
          </div>
        </div>

        {radioValue == 'dayOff' ? (
          <CreateLeaveRequestSelectedDayOff
            step2DateName={'step2Date'}
            step2DateValue={formikDayOff.values.step2Date}
            step2DateChange={formikDayOff.handleChange}
            step2DateError={formikDayOff.errors.step2Date}
            step2StartHourName={'step2StartHour'}
            step2StartHourValue={formikDayOff.values.step2StartHour}
            step2StartHourChange={formikDayOff.handleChange}
            step2StartHourError={formikDayOff.errors.step2StartHour}
            step2EndHourName={'step2EndHour'}
            step2EndHourValue={formikDayOff.values.step2EndHour}
            step2EndHourChange={formikDayOff.handleChange}
            step2EndHourError={formikDayOff.errors.step2EndHour}
          />
        ) : (
          <CreateLeaveRequestSelectedDays
            step2StartDateName={'step2StartDate'}
            step2StartDateValue={formikDays.values.step2StartDate}
            step2StartDateChange={formikDays.handleChange}
            step2StartDateError={formikDays.errors.step2StartDate}
            step2EndDateName={'step2EndDate'}
            step2EndDateValue={formikDays.values.step2EndDate}
            step2EndDateChange={formikDays.handleChange}
            step2EndDateError={formikDays.errors.step2EndDate}
          />
        )}
      </div>

      <ButtonCustom
        onClickPrev={() => {
          setStepNumber(0);
          setLeaveReqStep(<CreateLeaveRequestGeneralInput />);
        }}
        onClick={formikSubmitHandler}
        disabled={(() => (radioValue === 'days' && !formikDays.isValid) || (radioValue === 'dayOff' && !formikDayOff.isValid))()}
      />
    </div>
  );
};
