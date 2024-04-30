'use client';

import { East, KeyboardBackspace } from '@mui/icons-material';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateCourseMutation } from '@/generated/index';
import FileUploader from '../../components/FileUploader';

const validatinSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: yup.string().required(),
});

const CourseAdd = () => {
  const router = useRouter();
  const [createCourse] = useCreateCourseMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (values) => {
      createCourse({
        variables: {
          courseInput: {
            title: values.title,
            description: values.description,
            thumbnail: values.thumbnail,
          },
        },
      });
      router.push('/dashboardOtherLab');
    },
  });

  return (
    <Stack data-testid="create-course-container" bgcolor={'#ECEDF0'} py={3} minHeight={'100vh'}>
      <Container maxWidth="xl">
        <Stack
          data-testid="test-back-stack"
          onClick={() => {
            router.push('/dashboardOtherLab');
          }}
          direction={'row'}
          gap={3}
          marginBottom={'26px'}
          sx={{ cursor: 'pointer' }}
          fontSize={18}
          fontWeight={600}
          alignItems={'center'}
        >
          <KeyboardBackspace /> {'Нүүр'}
        </Stack>
        <Stack width={'100%'} bgcolor={'white'} borderRadius={'12px'} px={3} paddingBottom={7} paddingTop={5}>
          <Stack marginBottom={8}>
            <Typography fontSize={28} fontWeight={700} color={'#121316'}>
              {'Сэдвийн ерөнхий мэдээлэл '}
            </Typography>
          </Stack>
          <Stack direction={'row'} gap={'74px'}>
            <Stack width={'100%'} gap={8}>
              <Stack width={'100%'} gap={1}>
                <Typography fontWeight={600} fontSize={16} color={'#121316'}>
                  {'Гарчиг'}
                </Typography>
                <TextField id="title-test" name="title" onChange={formik.handleChange} value={formik.values.title} type="text" placeholder="Оруулна уу..." />
              </Stack>
              <Stack width={'100%'} gap={1}>
                <Typography fontWeight={600} fontSize={16} color={'#121316'}>
                  {'Дэлгэрэнгүй'}
                </Typography>
                <TextField id="description-test" multiline minRows={3} name="description" onChange={formik.handleChange} value={formik.values.description} type="text" placeholder="Энд бичнэ үү..." />
              </Stack>
            </Stack>
            <Stack width={'100%'} gap={1} marginBottom={'108px'}>
              <Typography fontWeight={600} color={'#121316'}>
                {'Хавтасны зураг'}
              </Typography>
              <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
            </Stack>
          </Stack>
          <Stack width={'100%'} alignItems={'center'}>
            <Button
              data-testid="create-button"
              onClick={() => {
                formik.handleSubmit();
              }}
              variant="contained"
              sx={{
                width: 'fit-content',
                '&:disabled': {
                  color: 'white',
                  backgroundColor: '#121316',
                  opacity: '0.5',
                },
                gap: '28px',
                borderRadius: '8px',
                py: 2,
              }}
              disabled={!formik.values.title || !formik.values.description || !formik.values.thumbnail}
            >
              <Stack width={24} height={24}></Stack> {'Үргэлжлүүлэх'} <East fontSize="small" />
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CourseAdd;
