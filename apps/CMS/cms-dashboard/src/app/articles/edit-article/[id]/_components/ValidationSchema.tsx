import * as yup from 'yup';
export const validationSchema = yup.object({
  title: yup.string().required('Нийтлэлийн гарчиг хоосон байж болохгүй'),
  content: yup.string().required('Нийтлэлийн эх хоосон байж болохгүй'),
  category: yup.string().required(),
  coverPhoto: yup.string().required('Өнгөц зураг оруулна уу'),
  commentPermission: yup.boolean().required(),
});
