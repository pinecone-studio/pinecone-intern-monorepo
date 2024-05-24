import { CustomInput } from '../_components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Department, useCreateEmployeeMutation } from '../../../generated';
import { EmploymentStatus } from '../../../generated';
import { inputItems } from '../constants';
import { CloseSvg } from '../../../assets';
import { useRefetch } from '../../../common/providers/RefetchProvider';

type CreateEmployeeFormProps = {
  handleCloseNewEmployee: () => void;
};

const validationSchema = yup.object({
  lastName: yup.string().required('Овог оруулна уу'),
  firstName: yup.string().required('Нэр оруулна уу'),
  email: yup.string().email('Хүчинтэй и-мэйл оруулна уу').required('И-мэйл оруулна уу'),
  jobTitle: yup.string().required('Албан тушаал оруулна уу'),
  salary: yup.number().typeError('Тоо оруулна уу').required('Цалин оруулна уу').min(100000, 'Цалин 100 мянгаас их байх'),
  ladderLevel: yup.string().required('Түвшин оруулна уу'),
  department: yup.string().required('Хэлтэс сонгоно уу'),
  dateOfEmployment: yup.date().required('Огноо оруулна уу'),
  employmentStatus: yup.string().required('Төлөв сонгоно уу'),
});
const departmentList = Object.values(Department);
const employmentStatusList = Object.values(EmploymentStatus);
export const CreateEmployeeForm = (props: CreateEmployeeFormProps) => {
  const [createEmployee] = useCreateEmployeeMutation();
  const { refetch } = useRefetch();
  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      department: '',
      jobTitle: '',
      ladderLevel: '',
      salary: 0,
      dateOfEmployment: new Date().toISOString().slice(0, 10),
      employmentStatus: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await createEmployee({
        variables: {
          input: {
            firstName: values.firstName as string,
            lastName: values.lastName as string,
            email: values.email as string,
            jobTitle: values.jobTitle as string,
            salary: values.salary as number | null,
            ladderLevel: values.ladderLevel as string,
            department: values.department as Department,
            dateOfEmployment: values.dateOfEmployment as string,
            employmentStatus: values.employmentStatus as EmploymentStatus,
          },
        },
      });
      props.handleCloseNewEmployee();
      refetch();
    },
  });

  const generateFormikProps = (name: keyof typeof formik.values) => ({
    name: name,
    value: formik.values[name],
    error: Boolean(formik.errors[name]),
    helperText: formik.errors[name],
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  });

  return (
    <main data-cy="addEmployeeForm" className="flex flex-col max-w-[650px] p-10 w-full rounded-2xl overflow-hidden border border-[#D6D8DB] bg-white">
      <div className="flex justify-between">
        <p data-testid="addEmployeeTitle" className="text-lg text-main font-semibold">
          Ажилтан нэмэх
        </p>
        <div data-testid="close-button" onClick={props.handleCloseNewEmployee} className="cursor-pointer">
          <CloseSvg />
        </div>
      </div>
      <form className="flex flex-col justify-center px-10 pt-10 gap-4">
        <div className="grid grid-cols-2 gap-6">
          {inputItems.map((item, index) => (
            <CustomInput key={index} data-testid="customInput" label={item.label} type={item.type} placeholder={item.placeholder} {...generateFormikProps(item.name as keyof typeof formik.values)} />
          ))}

          <CustomInput data-testid="customInput" label={'Хэлтэс'} type="select" {...generateFormikProps('department')}>
            <option value="" className="text-light" disabled selected hidden>
              Хэлтэс сонгоно уу
            </option>
            {departmentList.map((item, index) => (
              <option data-testid="departmentList" key={index} value={item}>
                {item}
              </option>
            ))}
          </CustomInput>
          <CustomInput data-testid="customInput" label={'Төлөв'} type="select" {...generateFormikProps('employmentStatus')}>
            <option value="" className="text-light" selected hidden>
              Төлөв сонгоно уу
            </option>
            {employmentStatusList.map((item, index) => (
              <option data-testid="employmentStatusList" key={index} value={item}>
                {item}
              </option>
            ))}
          </CustomInput>
        </div>

        <div className="flex w-full justify-end">
          <button
            disabled={Boolean(!formik.isValid)}
            style={{
              backgroundColor: !formik.isValid ? '#fff' : '#121316',
              border: !formik.isValid ? '1px solid #D6D8DB' : '1px solid #000',
              color: !formik.isValid ? '#D6D8DB' : '#fff',
              cursor: !formik.isValid ? 'default' : 'pointer',
            }}
            className="rounded-lg py-3 px-4"
            name="submitBtn"
            data-cy="createEmployeeBtn"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <p className="text-base font-semibold">Хадгалах</p>
          </button>
        </div>
      </form>
    </main>
  );
};
