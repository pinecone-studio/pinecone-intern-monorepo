'use client';
import * as yup from 'yup';

import { useFormik } from 'formik';
import { useCreateSectionMutation } from '../../../generated';
import FileUploader from '../../../components/FileUploader';

const validatinSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  contentImage: yup.string(),
});

const AddSection = () => {
  const [createSection] = useCreateSectionMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (values) => {
      createSection({
        variables: {
          sectionInput: {
            title: values.title,
            description: values.description,
            contentImage: values.thumbnail,
          },
        },
      });
      formik.resetForm();
    },
  });

  return (
    <div data-testid="add-section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
      <div className="'flex flex-col  gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
        <div className="flex flex-col py-2">
          <p className="font-bold">Хэсгийн гарчиг</p>
          <input
            data-cy="title"
            className="w-[588px] h-fit border rounded-[4px] p-2"
            type="text"
            name="title"
            placeholder="Оруулна уу..."
            id="title-test"
            onChange={formik.handleChange}
            value={formik.values.title}
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold">Дэлгэрэнгүй</p>
          <input
            data-cy="description"
            className="w-[588px] h-fit border rounded-[4px] p-2"
            id="description-test"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            type="text"
            placeholder="Энд бичнэ үү..."
          ></input>
        </div>
        <div className="flex flex-col py-2">
          <p className="font-bold"> Хэсгийн зураг</p>
          <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
        </div>
      </div>
      <div className="flex gap-4 jutify-center items-center py-4">
        <button
          data-cy="add-section-handle-btn"
          className="w-[36px] bg-black h-[36px] text-white rounded-[8px] flex items-center justify-center text-[26px] pb-2 hover:bg-[#D6D8DB] hover:text-black "
          onClick={() => {
            formik.handleSubmit();
          }}
          disabled={!formik.values.title || !formik.values.description || !formik.values.thumbnail}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddSection;
