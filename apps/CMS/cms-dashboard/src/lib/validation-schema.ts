import * as Yup from "yup";

export const articleSchema = Yup.object({
	title: Yup.string().required("Гарчиг хоосон байж болохгүй"),
	body: Yup.string().required("Нийтлэл хоосон байж болохгүй"),
});