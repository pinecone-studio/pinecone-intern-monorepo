'use client';
import { useGetClassesQuery } from '@/generated/index';
import { ClassCards } from '../_topic/_features/ClassCards';

export default function Index() {
  const { data, loading, error } = useGetClassesQuery();

  const classData = data?.getClasses;

  return <div>{loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : <ClassCards data={classData} />}</div>;
}
