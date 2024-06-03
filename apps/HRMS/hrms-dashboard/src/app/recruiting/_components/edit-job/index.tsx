'use client';

import { LeftArrow } from '../../../asset';
import { useRouter, useParams } from 'next/navigation';
import { Input, TextArea } from '../core';
import { CreateErrorModal } from '../modal';
import { useGetJobs, useEditJobForm } from './hooks';

export const EditJob = () => {
  const router = useRouter();
  const { id } = useParams();
  const { jobs, loading } = useGetJobs();
  const job = jobs?.find((job: { id: string }) => job.id === id);

  const formik = useEditJobForm(job, id);

  const handleBackButtonClick = () => {
    router.push(`/recruiting/job-detail/${id}`);
  };

  if (loading)
    return (
      <div data-testid="loading" className="flex w-full justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

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
      <form data-testid="form" onSubmit={formik.handleSubmit}>
        <div className="py-12 px-24">
          <Input
            data-testid="title-input"
            name="title"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.title}
            errorText={formik.errors.title}
            label="Албан тушаалын нэр"
            placeholder="Placeholder"
          />
          <TextArea
            data-testid="description-input"
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
            <div className="grid grid-cols-2 gap-x-6">
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
            <CreateErrorModal
              disabled={!formik.isValid || !formik.dirty}
              onClose={() => router.push(`/recruiting/job-detail/${job?.id}`)}
              onClick={formik.handleSubmit}
              text="Хадгалах"
              labelType="Хадгалах"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
