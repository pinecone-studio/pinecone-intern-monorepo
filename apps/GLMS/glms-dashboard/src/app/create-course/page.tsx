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
    onSubmit: () => {},
  });

  const submitHandler = () => {
    formik.handleSubmit();
  };

  const router = useRouter();
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
              <Stack width={'100%'} height={422} px={1} border={'2px #D6D8DB dashed'} direction={'row'} justifyContent={'center'} alignItems={'center'} borderRadius={'8px'}>
                <Typography fontWeight={400} fontSize={18} color={'#3F414580'}>
                  Зургийг чирж буулгах эсвэл
                </Typography>
                <Stack width={80} overflow={'hidden'} position={'relative'} alignItems={'center'}>
                  <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontWeight={600} color={'#3F4145'}>
                    Browse
                  </Typography>
                  <TextField
                    id="file-test"
                    name="image"
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    type="file"
                    sx={{
                      opacity: 0,
                      '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 },
                      position: 'absolute',
                    }}
                    // variant="standard"
                    // inputProps={{}}
                    // InputProps={{ disableUnderline: true }}
                    // sx={{ visibility: 'hidden' }}
                    // sx={{ position: 'absolute' }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack width={'100%'} alignItems={'center'}>
            <Button
              data-testid="create-button"
              onClick={() => {
                submitHandler();
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
              disabled={!formik.values.title || !formik.values.description || !formik.values.image}
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
