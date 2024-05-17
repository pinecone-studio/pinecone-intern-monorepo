'use client';

import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestSelectedDayOff } from './CreateLeaveRequestSelectedDayOff';
import { CreateLeaveRequestSelectedDays } from './CreateLeaveRequestSelectedDays';
import { CreateLeaveRequestGeneralInput } from './CreateLeaveRequestGeneralInput';
import { CreateLeaveRequestAdditionInfo } from './CreateLeaveRequestAdditionInfo';
import { CreateLeaveRequestPreviousButtonCustom } from '../../_components/createLeaveReqComp/CreateLeaveRequestPreviousButtonCustom';
import { CreateLeaveRequestNextButtonCustom } from '../../_components/createLeaveReqComp/CreateLeaveRequestNextButtonCustom';

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
  const { setLeaveReqStep, setStepNumber, radioValue, setRadioValue, setStep2, step2 } = useContext(LeaveRequestCreationContext);

  const durationTypeList = ['Day', 'Hour'];

  const formikSubmitHandler = () => {
    if (radioValue == 'Hour') {
      formikDayOff.handleSubmit();
    }
    if (radioValue == 'Day') {
      formikDays.handleSubmit();
    }
  };

  const formikDayOff = useFormik({
    initialValues: {
      step2LeaveLength: 'Hour',
      step2Date: (() => (step2 ? step2.step2Date : ''))(),
      step2StartHour: (() => (step2 ? step2.step2StartHour : ''))(),
      step2EndHour: (() => (step2 ? step2?.step2EndHour : ''))(),
    },
    validationSchema: validationSchemaDayOff,
    onSubmit: (values) => {
      setLeaveReqStep(<CreateLeaveRequestAdditionInfo />);
      setStepNumber(2);
      setStep2(values);
    },
  });

  const formikDays = useFormik({
    initialValues: {
      step2LeaveLength: 'Day',
      step2StartDate: (() => (step2 ? step2.step2StartDate : ''))(),
      step2EndDate: (() => (step2 ? step2.step2EndDate : ''))(),
    },
    validationSchema: validationSchemaDays,
    onSubmit: (values) => {
      setLeaveReqStep(<CreateLeaveRequestAdditionInfo />);
      setStepNumber(2);
      setStep2(values);
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
          {durationTypeList.map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <div className="w-[48px] h-[48px] p-[12px]">
                  <input
                    className="w-[24px] h-[24px] accent-white"
                    data-cy={item === 'Day' ? 'radioButtonDays' : 'radioButtonDayOff'}
                    data-testid={item === 'Day' ? 'radioButtonDays' : 'radioButtonDayOff'}
                    type="radio"
                    id={item === 'Day' ? 'radioButtonDays' : 'radioButtonDayOff'}
                    name="step2LeaveLength"
                    value={item}
                    checked={radioValue === item}
                    onClick={(e) => {
                      if (radioValue === 'Day') {
                        formikDays.setFieldValue('step2LeaveLength', (e.target as HTMLTextAreaElement).value);
                      }
                      if (radioValue === 'Hour') {
                        formikDayOff.setFieldValue('step2LeaveLength', (e.target as HTMLTextAreaElement).value);
                      }

                      setRadioValue((e.target as HTMLTextAreaElement).value);
                    }}
                  />
                </div>
                <label htmlFor={item === 'Day' ? 'radioButtonDays' : 'radioButtonDayOff'} className="text-[16px] font-normal text-[#121316]">
                  {item}
                </label>
              </div>
            );
          })}
        </div>

        {radioValue == 'Hour' ? (
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
      <div className="pt-[40px] flex justify-between">
        <CreateLeaveRequestPreviousButtonCustom
          onClickPrev={() => {
            setStepNumber(0);
            setLeaveReqStep(<CreateLeaveRequestGeneralInput />);
          }}
        />
        <CreateLeaveRequestNextButtonCustom onClick={formikSubmitHandler} disabled={(() => (radioValue === 'Day' && !formikDays.isValid) || (radioValue === 'Hour' && !formikDayOff.isValid))()} />
      </div>
    </div>
  );
};
