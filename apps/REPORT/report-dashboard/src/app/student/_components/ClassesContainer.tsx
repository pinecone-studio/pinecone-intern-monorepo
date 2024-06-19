'use client';
import { ClassCards } from '@/app/_topic/_features/ClassCards';

import { Class, useGetClassesQuery } from '@/generated';

const ClassesContainer = () => {
  const { data, loading, error } = useGetClassesQuery();
  const classData = data?.getClasses;
  return <div>{loading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : <ClassCards data={classData as Class[]} />}</div>;
};

export default ClassesContainer;
