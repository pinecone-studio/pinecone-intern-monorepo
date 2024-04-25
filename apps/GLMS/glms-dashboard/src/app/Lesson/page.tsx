'use client';
import { useGetSectionsQuery, Section } from '@/generated/index';
import { Stack, Typography } from '@mui/material';
import CourseRender from './_feature/CourseRender';
const Home = () => {
  const { data, loading, error } = useGetSectionsQuery();
  if (loading)
    return (
      <Stack sx={{ width: '100%', height: '800px' }} justifyContent="center" alignItems="center">
        <Typography fontSize="40px" fontWeight="700">
          Loading...
        </Typography>
      </Stack>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Stack>
      <CourseRender data-cy-id="courseId" data={data?.getSections} />
    </Stack>
  );
};
export default Home;
