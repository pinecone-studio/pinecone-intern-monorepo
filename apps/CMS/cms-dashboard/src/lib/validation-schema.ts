import * as Yup from "yup";

export const articleSchema = Yup.object({
	title: Yup.string().required("Гарчиг хоосон байж болохгүй"),
	body: Yup.string().required("Нийтлэл хоосон байж болохгүй"),
	image: Yup.mixed()
    .required('Зураггүй байж болохгүй')
    .test('fileType', 'Зөвхөн зураг оруулна уу', value => {
      if (value instanceof File) {
        return value.type === 'image/jpeg' || value.type === 'image/png';
      }
      return false;
    }),
	category: Yup.mixed().required("Шошгогүй байж болохгүй"),
});