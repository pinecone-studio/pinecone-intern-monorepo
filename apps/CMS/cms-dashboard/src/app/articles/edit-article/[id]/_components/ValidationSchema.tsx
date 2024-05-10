import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string().required('article title cannot be empty'),
  content: yup.string().required('article content cannot be empty'),
  category: yup.string().required(),
  coverPhoto: yup.string().required('please insert cover photo'),
  commentPermission: yup.boolean().required(),
});
