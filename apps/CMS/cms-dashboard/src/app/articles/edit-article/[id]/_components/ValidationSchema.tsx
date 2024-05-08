import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  thumbnail: yup.string().required(),
  articleTitle: yup.string().required('article title cannot be empty'),
  articleContent: yup.string().required('article content cannot be empty'),
});
