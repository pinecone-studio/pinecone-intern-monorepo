import * as yup from 'yup';

export const initialAddEmployeesInfo = {
  lastName: '',
  firstName: '',
  email: '',
  jobTitle: '',
  salary: 0,
  ladderLevel: '',
  department: '',
  dateOfEmployment: new Date().toISOString().slice(0, 10),
  employmentStatus: '',
};

export const addEmployeeSchema = yup.object().shape({
  lastName: yup.string().required('Овог оруулна уу'),
  firstName: yup.string().required('Нэр оруулна уу'),
  email: yup.string().email('Хүчинтэй и-мэйл оруулна уу').required('И-мэйл оруулна уу'),
  jobTitle: yup.string().required('Албан тушаал оруулна уу'),
  salary: yup.number().typeError('Тоо оруулна уу').required('Цалин оруулна уу').min(100000, 'Цалин 100 мянгаас их байх'),
  ladderLevel: yup.string().required('Түвшин оруулна уу'),
  department: yup.string().required('Хэлтэс сонгоно уу'),
  dateOfEmployment: yup.string().required('Огноо оруулна уу'),
  employmentStatus: yup.string().required('Төлөв сонгоно уу'),
});
