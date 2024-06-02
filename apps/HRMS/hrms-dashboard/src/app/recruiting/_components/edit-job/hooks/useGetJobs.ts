import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../../job-detail/query/get-jobs-query';

export const useGetJobs = () => {
  const { data, loading } = useQuery(GET_JOBS);
  const jobs = data?.getJobs;

  return { jobs, loading };
};
