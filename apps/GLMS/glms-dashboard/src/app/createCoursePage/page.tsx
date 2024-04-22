'use client';

import { East, KeyboardBackspace } from '@mui/icons-material';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validatinSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  image: yup.string().required(),
});

const CourseAdd = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
    },
    validationSchema: validatinSchema,
    onSubmit: () => {
      alert('hii');
    },
  });

  const router = useRouter();
  return (
    <Stack data-testid="create-course-container" bgcolor={'#ECEDF0'} py={3} minHeight={'100vh'}>
      <Container maxWidth="xl">
        <Stack
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
                <TextField data-testid="title" name="title" onChange={formik.handleChange} value={formik.values.title} type="text" placeholder="Энд бичнэ үү..." />
              </Stack>
              <Stack width={'100%'} gap={1}>
                <Typography fontWeight={600} fontSize={16} color={'#121316'}>
                  {'Дэлгэрэнгүй'}
                </Typography>
                <TextField
                  data-testid="description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  variant="outlined"
                  minRows={2}
                  placeholder="Оруулна уу..."
                  sx={{ bgcolor: 'white' }}
                />
              </Stack>
            </Stack>
            <Stack width={'100%'} gap={1} marginBottom={'108px'}>
              <Typography fontWeight={600} color={'#121316'}>
                {'Хавтасны зураг'}
              </Typography>
              <Stack width={'100%'} height={422} border={'2px #D6D8DB dashed'} borderRadius={'8px'} display={'grid'} sx={{ placeContent: 'center' }}>
                <TextField
                  data-testid="file"
                  name="image"
                  onChange={formik.handleChange}
                  value={formik.values.image}
                  type="file"
                  variant="filled"
                  inputProps={{}}
                  InputProps={{ disableUnderline: true }}
                />
              </Stack>
            </Stack>
          </Stack>
          <Stack width={'100%'} alignItems={'center'}>
            <Button
              data-cy="create-button"
              onClick={() => formik.handleSubmit()}
              variant="contained"
              sx={{ width: 'fit-content', bgcolor: '#121316', gap: 2 }}
              disabled={!formik.values.title || !formik.values.description || !formik.values.image}
            >
              {'Үргэлжлүүлэх'} <East />
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CourseAdd;
