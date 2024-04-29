import { Stack, Button, Typography, MenuItem, Grid } from '@mui/material';
import { CustomInput } from '../_components/CustomInput';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Department, useCreateEmployeeMutation } from '../../../generated';
import { EmploymentStatus } from '../../../generated';

type CreateEmployeeFormProps = {
  handleCloseNewEmployee: () => void;
};
const validationSchema = yup.object({
  lastName: yup.string().required('Овог оруулна уу'),
  firstName: yup.string().required('Нэр оруулна уу'),
  email: yup.string().email('Хүчинтэй и-мэйл оруулна уу').required('И-мэйл оруулна уу'),
  jobTitle: yup.string().required('Албан тушаал оруулна уу'),
  salary: yup.number().typeError('Тоо оруулна уу').required('Цалин оруулна уу').min(100000, 'Цалин 100 мянгаас их байх'),
  ladderLevel: yup.string().required(),
  department: yup.string().required('Хэлтэс сонгоно уу'),
  employmentStatus: yup.string().required('Төлөв сонгоно уу'),
});
const departmentList = Object.values(Department);
const employmentStatusList = Object.values(EmploymentStatus);
export const CreateEmployeeForm = (props: CreateEmployeeFormProps) => {
  const { handleCloseNewEmployee } = props;
  const [createEmployee] = useCreateEmployeeMutation();
  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      email: '',
      department: '',
      jobTitle: null,
      ladderLevel: '',
      salary: null,
      dateOfEmployment: new Date(),
      employmentStatus: null,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      console.log(formik.values);
      createEmployee({
        variables: {
          input: {
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            email: formik.values.email,
            jobTitle: formik.values.jobTitle,
            salary: formik.values.salary,
            ladderLevel: formik.values.ladderLevel,
            department: formik.values.department,
            dateOfEmployment: formik.values.dateOfEmployment,
            employmentStatus: formik.values.employmentStatus,
          },
        },
      });
    },
  });
  return (
    <Stack p={5} maxWidth={'650px'} width={'100%'} borderRadius={'16px'} border={1} borderColor={'#D6D8DB'} bgcolor={'common.white'}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <Typography data-testid="addEmployeeTitle" color={'common.black'} fontSize={18} fontWeight={600}>
          Ажилтан нэмэх
        </Typography>
        <Stack onClick={handleCloseNewEmployee} sx={{ cursor: 'pointer' }}>
          <Close fontSize="small" />
        </Stack>
      </Stack>

      <Stack justifyContent="center" px={5} pt={5} gap={2}>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <CustomInput label={'Овог'} type="text" placeholder={'Овог оруулна уу'} name="lastName" value={formik.values.lastName} error={Boolean(formik.errors.lastName)} helperText={formik.errors.lastName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
          </Grid>
          <Grid item md={6}>
            <CustomInput label={'Нэр'} type="text" placeholder={'Нэр оруулна уу'} name="firstName" value={formik.values.firstName} error={Boolean(formik.errors.firstName)} helperText={formik.errors.firstName} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
          </Grid>
          <Grid item md={6}>
            <CustomInput label={'И-мэйл'} type="text" placeholder={'И-мэйл оруулна уу'} name="email" value={formik.values.email} error={Boolean(formik.errors.email)} helperText={formik.errors.email} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
          </Grid>
          <Grid item md={6}>
            <CustomInput label={'Хэлтэс'} type="select" placeholder={'Хэлэс сонгоно уу'} name="department" value={formik.values.department} error={Boolean(formik.errors.department)} helperText={formik.errors.department} onBlur={formik.handleBlur} onChange={formik.handleChange}>
              {departmentList.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomInput>
          </Grid>
          <Grid item md={6}>
            <CustomInput label={'Албан тушаал'} type="text" placeholder={'Албан тушаал оруулна уу'} name="jobTitle" value={formik.values.jobTitle} error={Boolean(formik.errors.jobTitle)} helperText={formik.errors.jobTitle} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
          </Grid>
          <Grid item md={6}>
            <CustomInput label={'Түвшин'} type="text" placeholder={'Түвшин оруулна уу'} name="ladderLevel" value={formik.values.ladderLevel} error={Boolean(formik.errors.ladderLevel)} helperText={formik.errors.ladderLevel} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
          </Grid>
          <Grid item md={6}>
            <CustomInput label={'Цалин'} type="number" placeholder={'Цалин оруулна уу'} name="salary" value={formik.values.salary} error={Boolean(formik.errors.salary)} helperText={formik.errors.salary} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
          </Grid>
          <Grid item md={6}>
            <CustomInput label={'Ажилд орсон огноо'} type="date" placeholder={'Огноо оруулна уу'} name="dateOfEmployment" value={formik.values.dateOfEmployment} error={Boolean(formik.errors.dateOfEmployment)} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
          </Grid>
          <Grid item md={6}>
            <CustomInput label={'Төлөв'} type="select" placeholder={'Төлөв сонгоно уу'} name="employmentStatus" value={formik.values.employmentStatus} error={Boolean(formik.errors.employmentStatus)} onBlur={formik.handleBlur} onChange={formik.handleChange}>
              {employmentStatusList.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </CustomInput>
          </Grid>
        </Grid>

        <Stack color={'red'} alignItems={'flex-end'}>
          <Button
            disabled={Boolean(!formik.isValid)}
            onClick={() => {
              formik.handleSubmit();
            }}
            data-testid="addEmployeeBtn"
            variant="contained"
            color="primary"
            sx={{ width: 'fit-content' }}
          >
            <Typography fontSize={16} fontWeight={600}>
              Хадгалах
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};
