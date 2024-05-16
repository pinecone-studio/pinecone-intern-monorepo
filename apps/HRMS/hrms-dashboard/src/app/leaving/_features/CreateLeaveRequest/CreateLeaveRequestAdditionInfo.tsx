'use client';

import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';
import { CreateLeaveRequestNextButtonCustom } from '../../_components/createLeaveReqComp/CreateLeaveRequestNextButtonCustom';
import { CreateLeaveRequestDaysOrDayOff } from './CreateLeaveRequestDaysOrDayOff';
import { CreateLeaveRequestPreviousButtonCustom } from '../../_components/createLeaveReqComp/CreateLeaveRequestPreviousButtonCustom';
import { useGetEmployeeRequestQuery } from '@/generated';
import { useCreateLeaveRequestDaysMutation, useCreateLeaveRequestHoursMutation } from '@/generated';
import { LeaveType, DurationType } from '@/generated';

const validationSchema = yup.object({
  step3Substitute: yup.string().required('Ажил шилжүүлэн өгөх ажилтны нэр оруулна уу'),
  step3WorkBrief: yup.string().required('Шилжүүлэн өгч буй ажлын талаар товч оруулна уу'),
  step3ApprovedBy: yup.string().required('Хүсэлт батлах хүнээ сонгоно уу'),
});

export const CreateLeaveRequestAdditionInfo = () => {
  const { setStepNumber, setLeaveReqStep, setisLeaveRequestSucceeded, loggedUser, radioValue, step1, step2 } = useContext(LeaveRequestCreationContext);
  const [createLeaveRequestDays] = useCreateLeaveRequestDaysMutation();
  const [createLeaveRequestHours] = useCreateLeaveRequestHoursMutation();

  const { data } = useGetEmployeeRequestQuery({ variables: { getEmployeeRequestId: !loggedUser ? '' : loggedUser.id } });

  const formik = useFormik({
    initialValues: {
      step3Substitute: '',
      step3WorkBrief: '',
      step3ApprovedBy: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setisLeaveRequestSucceeded(true);
      if (radioValue === 'Day') {
        await createLeaveRequestDays({
          variables: {
            requestInput: {
              employeeId: loggedUser?.id,
              name: loggedUser?.firstName,
              startDateString: step2?.step2StartDate,
              endDateString: step2?.step2EndDate,
              description: values.step3WorkBrief,
              leaveType: step1?.step1LeaveType as LeaveType,
              superVisor: values.step3ApprovedBy,
              durationType: step2?.step2LeaveLength as DurationType,
              email: loggedUser?.email as string,
              substitute: values.step3Substitute,
            },
          },
        });
      }

      if (radioValue === 'Hour') {
        await createLeaveRequestHours({
          variables: {
            requestInput: {
              employeeId: loggedUser?.id,
              name: loggedUser?.firstName,
              startDateString: step2?.step2StartDate,
              endDateString: step2?.step2EndDate,
              description: values.step3WorkBrief,
              leaveType: step1?.step1LeaveType as LeaveType,
              superVisor: values.step3ApprovedBy,
              durationType: step2?.step2LeaveLength as DurationType,
              email: loggedUser?.email as string,
              substitute: values.step3Substitute,
            },
          },
        });
      }
    },
  });

  return (
    <div data-testid="step3Component" className="w-[100%] flex flex-col gap-[40px]">
      <div className="w-[100%] flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[4px]">
          <div data-cy="step3Label" className="text-[16px] font-normal text-[#121316]">
            Ажил шилжүүлэн өгөх ажилтны нэр
          </div>
          <div data-testid="step3Substitute-container" className="w-[100%] p-[8px] bg-[#F7F7F8] rounded-[8px] border-[1px] border-[#D6D8DB]">
            <input
              data-cy="step3Substitute"
              className="w-[100%] bg-[#F7F7F8] text-[#121316]"
              name="step3Substitute"
              value={formik.values.step3Substitute}
              onChange={formik.handleChange}
              type="text"
            ></input>
          </div>
          <p data-cy="step3SubstituteError" className="text-[#DC143C] text-[12px]">
            {formik.errors.step3Substitute}
          </p>
        </div>

        <div className="w-[100%] flex flex-col gap-[4px]">
          <div data-cy="step3Label" className="text-[16px] font-normal text-[#121316]">
            Ажлаа түр хугацаанд юу юу шилжүүлэн өгч буйгаа товч тэмдэглэнэ үү
          </div>
          <div className="w-[100%] p-[8px] bg-[#F7F7F8] rounded-[8px] border-[1px] border-[#D6D8DB]">
            <textarea
              data-testid="step3WorkBrief-container"
              data-cy="step3WorkBrief"
              rows={3}
              cols={3}
              className="w-[100%] bg-[#F7F7F8] text-[#121316]"
              name="step3WorkBrief"
              value={formik.values.step3WorkBrief}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <p data-cy="step3WorkBriefError" className="text-[#DC143C] text-[12px]">
            {formik.errors.step3WorkBrief}
          </p>
        </div>

        <div data-testid="step3ApprovedBy-container" className="w-[100%] flex flex-col gap-[4px]">
          <div data-cy="step3Label" className="text-[16px] font-normal text-[#121316]">
            Хүсэлт батлах хүнээ сонго
          </div>
          <select
            data-cy="step3ApprovedBy"
            className="w-[100%] select select-bordered bg-[#F7F7F8] text-[#121316]"
            name="step3ApprovedBy"
            value={formik.values.step3ApprovedBy}
            onChange={formik.handleChange}
          >
            <option disabled selected value="">
              Хүсэлт батлах хүнээ сонго
            </option>
            {data?.getEmployeeRequest.map((item, index) => {
              return (
                <option key={index} data-testid={`approvedBy-${index}`} value={item?.firstName ?? undefined}>
                  {item?.firstName}
                </option>
              );
            })}
          </select>
          <p data-cy="step3ApprovedByError" className="text-[#DC143C] text-[12px]">
            {formik.errors.step3ApprovedBy}
          </p>
        </div>
      </div>
      <div className="pt-[40px] flex justify-between">
        <CreateLeaveRequestPreviousButtonCustom
          onClickPrev={() => {
            setLeaveReqStep(<CreateLeaveRequestDaysOrDayOff />);
            setStepNumber(1);
          }}
        />
        <CreateLeaveRequestNextButtonCustom onClick={formik.handleSubmit} disabled={!formik.isValid} />
      </div>
    </div>
  );
};
