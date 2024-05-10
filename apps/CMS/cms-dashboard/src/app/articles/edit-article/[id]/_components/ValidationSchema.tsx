import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  thumbnail: yup.string().required(),
  title: yup.string().required('article title cannot be empty'),
  content: yup.string().required('article content cannot be empty'),
});
