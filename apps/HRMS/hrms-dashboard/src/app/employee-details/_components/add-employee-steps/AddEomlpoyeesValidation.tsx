import * as Yup from 'Yup';

export const initialAddEmployeesInfo = {
  lastName: '',
  firstName: '',
  email: '',
  jobTitle: '',
  salary: 0,
  ladderLevel: '',
  department: '',
  dateOfEmployment: '',
  employmentStatus: '',
};

export type TAddEmployeesInfo = {
  lastName: string;
  firstName: string;
  email: string;
  jobTitle: string;
  salary: number;
  ladderLevel: string;
  department: any;
  dateOfEmployment: string;
  employmentStatus: any;
};

export const addEmployeeSchema = Yup.object().shape({
  lastName: Yup.string().required('Овог оруулна уу'),
  firstName: Yup.string().required('Нэр оруулна уу'),
  email: Yup.string().email('Хүчинтэй и-мэйл оруулна уу').required('И-мэйл оруулна уу'),
  jobTitle: Yup.string().required('Албан тушаал оруулна уу'),
  salary: Yup.number().typeError('Тоо оруулна уу').required('Цалин оруулна уу').min(100000, 'Цалин 100 мянгаас их байх'),
  ladderLevel: Yup.string().required('Түвшин оруулна уу'),
  department: Yup.string().required('Хэлтэс сонгоно уу'),
  dateOfEmployment: Yup.string().required('Огноо оруулна уу'),
  employmentStatus: Yup.string().required('Төлөв сонгоно уу'),
});
