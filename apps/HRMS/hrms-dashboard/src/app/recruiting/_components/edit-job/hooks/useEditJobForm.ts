import { useFormik } from 'formik';
import { useUpdateJob } from './useUpdateJobs';
import { validationSchema } from '../../add-job';

interface Requirements {
  others: string;
}

interface Job {
  title: string;
  description: string;
  requirements: Requirements;
  minSalary: string;
  maxSalary: string;
  dueDate: string;
  createdAt: string;
  status: string;
}

const getInitialValue = (job: Job, key: keyof Job) => {
  if (key === 'requirements') {
    return job?.requirements?.others || '';
  }
  return job?.[key] || '';
};

export const useEditJobForm = (job: Job, id: string) => {
  const updateJob = useUpdateJob();

  const formik = useFormik({
    initialValues: {
      title: getInitialValue(job, 'title'),
      description: getInitialValue(job, 'description'),
      requirements: getInitialValue(job, 'requirements'),
      minSalary: getInitialValue(job, 'minSalary'),
      maxSalary: getInitialValue(job, 'maxSalary'),
      deadline: getInitialValue(job, 'dueDate'),
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await updateJob({
        variables: {
          updateJobId: id,
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

  return formik;
};
