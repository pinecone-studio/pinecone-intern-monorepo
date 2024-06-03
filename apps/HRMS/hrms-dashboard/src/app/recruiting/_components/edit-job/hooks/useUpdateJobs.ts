import { useMutation } from '@apollo/client';
import { UPDATE_JOB } from '../mutations/job-update-mutation';

export const useUpdateJob = () => {
  const [updateJob] = useMutation(UPDATE_JOB);

  return updateJob;
};
