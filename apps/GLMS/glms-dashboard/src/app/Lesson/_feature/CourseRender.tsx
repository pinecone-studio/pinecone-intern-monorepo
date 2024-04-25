'use client';
import { Card, Container, Stack, Typography } from '@mui/material';
import CourseTitle from '../component/CourseTitle';
import CourseImage from '../component/CourseImage';
import DeleteButton from '../component/DeleteButton';
import EditButton from '../component/EditButton';
import BackButton from '../component/BackButton';
import { Section } from '@/generated/index';
import CourseDesc from '../component/CourseDesc';

type CourseRenderProps = {
  data?: Section[];
};

const CourseRender = ({ data }: CourseRenderProps) => {
  return (
    <Stack bgcolor="#F7F7F8">
      <Container maxWidth="xl">
        <BackButton />
        {data?.map((item) => (
          <Stack key={item.id} paddingY="48px" paddingX="24px" bgcolor="white" borderRadius="12px" gap="24px">
            <Stack direction="row" justifyContent="space-between">
              <CourseTitle title={item.title} />
              <Stack direction="row" gap="16px">
                <EditButton />
                <DeleteButton />
              </Stack>
            </Stack>
            <Stack direction="row" gap="97px" justifyContent="space-between">
          <CourseDesc description={item.description}/>
              <CourseImage contentImage={item.contentImage} />
            </Stack>
          </Stack>
        ))}
      </Container>
    </Stack>
  );
};

export default CourseRender;
