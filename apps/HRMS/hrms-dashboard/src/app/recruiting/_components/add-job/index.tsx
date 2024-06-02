'use client';

import { useRouter } from 'next/navigation';
import { LeftArrow } from '../../../asset';
import { Input, TextArea } from '../core';
import { CreateErrorModal } from '../modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CREATE_JOB_MUTATION } from './create-job-mutation';
import { useMutation } from '@apollo/client';

export const validationSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too short!').max(50, 'Too long!').required('Required'),
  description: Yup.string().max(500, 'Too Long!').required('Required'),
  requirements: Yup.string().max(500, 'Too Long!').required('Required'),
  minSalary: Yup.string().required('Required'),
  maxSalary: Yup.string().required('Required'),
  deadline: Yup.string().required('Required'),
});

export const AddJobPageComponent = () => {
  const router = useRouter();
  const [createJobRecruit] = useMutation(CREATE_JOB_MUTATION);

  const handleBackButtonClick = () => {
    router.push('/recruiting');
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      requirements: '',
      minSalary: '',
      maxSalary: '',
      deadline: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await createJobRecruit({
        variables: {
          input: {
            title: values.title,
            description: values.description,
            requirements: {
              others: values.requirements,
            },
            minSalary: values.minSalary,
            maxSalary: values.maxSalary,
            dueDate: values.deadline,
            createdAt: new Date().toISOString(),
            status: 'PUBLISHED',
          },
        },
      });
    },
  });
  return (
    <div className="w-full">
      <div className="flex items-center bg-white w-full">
        <button data-testid="back-button" onClick={handleBackButtonClick} className="hover:bg-[#cccccc] p-4 rounded-md">
          <LeftArrow />
        </button>

        <div className="w-full">
          <h1 data-testid="title" className="text-center text-sm font-semibold text-black">
            Ажлын зар үүсгэх
          </h1>
        </div>
      </div>
      <div className="py-12 px-24">
        <Input
          name="title"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
          errorText={formik.errors.title}
          label="Албан тушаалын нэр"
          placeholder="Placeholder"
        />
        <TextArea
          onBlur={formik.handleBlur}
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          errorText={formik.errors.description}
          label="Үүрэг"
          placeholder="Placeholder"
        />
        <TextArea
          onBlur={formik.handleBlur}
          name="requirements"
          onChange={formik.handleChange}
          errorText={formik.errors.requirements}
          value={formik.values.requirements}
          label="Шаардлага"
          placeholder="Placeholder"
        />
        <div className="mt-3 ">
          <h1 className="font-semibold text-base tracking-tight text-[#121316]">Цалингийн хэмжээ</h1>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <Input
              onBlur={formik.handleBlur}
              name="minSalary"
              onChange={formik.handleChange}
              errorText={formik.errors.minSalary}
              value={formik.values.minSalary}
              label="Доод цалин"
              placeholder="Placeholder"
            />
            <Input
              onBlur={formik.handleBlur}
              name="maxSalary"
              onChange={formik.handleChange}
              errorText={formik.errors.maxSalary}
              value={formik.values.maxSalary}
              label="Дээд цалин"
              placeholder="Placeholder"
            />
            <Input
              type="date"
              onBlur={formik.handleBlur}
              name="deadline"
              onChange={formik.handleChange}
              errorText={formik.errors.deadline}
              value={formik.values.deadline}
              label="Анкет хүлээн авах хугацаа"
              placeholder="Placeholder"
            />
          </div>
        </div>
        <div data-testid="modal-button" className="flex justify-end mr-0 mt-6">
          <CreateErrorModal disabled={!formik.isValid || !formik.dirty} onClose={() => router.push('/recruiting')} onClick={formik.handleSubmit} text="Хадгалах" labelType="Хадгалах" />
        </div>
      </div>
    </div>
  );
};
