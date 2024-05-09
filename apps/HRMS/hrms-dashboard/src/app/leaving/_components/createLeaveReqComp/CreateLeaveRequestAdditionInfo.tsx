'use client';

import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { LeaveRequestCreationContext } from '../../_providers/LeaveRequestCreationProvider';
import { ButtonCustom } from './ButtonCustom';
import { CreateLeaveRequestDaysOrDayOff } from './CreateLeaveRequestDaysOrDayOff';

const validationSchema = yup.object({
  step3Substitute: yup.string().required('Ажил шилжүүлэн өгөх ажилтны нэр оруулна уу'),
  step3WorkBrief: yup.string().required('Шилжүүлэн өгч буй ажлын талаар товч оруулна уу'),
  step3ApprovedBy: yup.string().required('Хүсэлт батлах хүнээ сонгоно уу'),
});

export const CreateLeaveRequestAdditionInfo = () => {
  const leaveTypes = ['shit happened', 'remote', 'medical', 'family emergency', 'others'];
  const { setStepNumber, setLeaveReqStep, setisLeaveRequestSucceeded } = useContext(LeaveRequestCreationContext);

  const formik = useFormik({
    initialValues: {
      step3Substitute: '',
      step3WorkBrief: '',
      step3ApprovedBy: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setisLeaveRequestSucceeded(true);
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
            <input data-cy="step3Substitute" className="w-[100%] bg-[#F7F7F8]" name="step3Substitute" value={formik.values.step3Substitute} onChange={formik.handleChange} type="text"></input>
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
              className="w-[100%] bg-[#F7F7F8]"
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
          <select data-cy="step3ApprovedBy" className="w-[100%] select select-bordered bg-[#F7F7F8]" name="step3ApprovedBy" value={formik.values.step3ApprovedBy} onChange={formik.handleChange}>
            <option disabled selected>
              Хүсэлт батлах хүнээ сонго
            </option>
            {leaveTypes.map((item, index) => {
              return (
                <option key={index} data-testid={`approvedBy-${index}`} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <p data-cy="step3ApprovedByError" className="text-[#DC143C] text-[12px]">
            {formik.errors.step3ApprovedBy}
          </p>
        </div>
      </div>
      <ButtonCustom
        onClickPrev={() => {
          setLeaveReqStep(<CreateLeaveRequestDaysOrDayOff />);
          setStepNumber(1);
        }}
        onClick={() => {
          formik.handleSubmit();
        }}
        disabled={!formik.isValid}
      />
    </div>
  );
};
