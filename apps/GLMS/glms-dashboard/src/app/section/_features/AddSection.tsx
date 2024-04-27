'use client';
import { Alert, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import { useCreateSectionMutation } from '../../../generated';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SectionInputForm from '../_components/SectionInputForm';
import * as yup from 'yup';
import { useFormik } from 'formik';

const AddSection = () => {

  const [createSection , {loading}] = useCreateSectionMutation();
  const [successMessage, setSuccessMessage] = useState('');

  const validationScema = yup.object({
    title : yup.string().required('Хичээлийн гарчиг оруулна уу...'),
    description : yup.string().required('Дэлгэрэнгүй мэдээлэл оруулна уу...'),
    contentImage : yup.string()
  });

  const formik = useFormik({
    initialValues : {
      title : '' ,
      description : '' , 
      contentImage : ''
    },
    validationSchema : validationScema,
    onSubmit:  async (values , {resetForm}) => {
      try {
        const { data } = await createSection({
          variables: values
        });
        setSuccessMessage('Хичээл амжилттай үүсгэгдлээ!');
        resetForm()
      } catch (error) {
        throw error
      }
    }
   });

   useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 3000); 
    return () => clearTimeout(timer);
  }, [successMessage]);

  return (
    <Stack
      data-testid="add-section-component"
      sx={{ display: 'flex', flexDirection: 'column', gap: 4, backgroundColor: '#fff', borderRadius: 4, justifyContent: 'center', alignItems: 'center', padding: 6 }}
    >
      <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 4, border: 2, borderRadius: 4, padding: 4, borderStyle: 'dashed', borderColor: '#D6D8DB' }}>
        <SectionInputForm
         name='title'
         label="Хичээлийн гарчиг"
         type='text'
         placeholder="Оруулна уу" 
         value={formik.values.title}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         error={formik.touched.title && Boolean(formik.errors.title)}
         helperText={formik.touched.title && formik.errors.title}  />
        <SectionInputForm
         name='description'
         label="Дэлгэрэнгүй"
         type='text' 
         placeholder="Энд бичнэ үү" 
         value={formik.values.description}
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         error={formik.touched.description && Boolean(formik.errors.description)}
         helperText={formik.touched.description && formik.errors.description} />
        <Stack>
          <Typography sx={{ fontWeight: 'bold' }}> Хичээлийн зураг</Typography>
          <Stack width={'588px'} height={'240px'} border={'2px #D6D8DB dashed'} direction={'column'}  justifyContent={'center'} alignItems={'center'} borderRadius={'8px'}>
          <PhotoOutlinedIcon sx={{ color: '#D6D8DB' }} />
          <Stack direction={'row'}  alignItems={'center'} justifyContent={'center'} >
          <Typography fontWeight={400} fontSize={18} color={'#3F414580'}>
              Зургийг чирж буулгах эсвэл
            </Typography>
            <Stack width={80} overflow={'hidden'} position={'relative'} alignItems={'center'} justifyContent={'center'}>
              <Typography sx={{ textDecoration: 'underline' }} fontSize={18} fontWeight={600} color={'#3F4145'}>
                Browse
              </Typography>
              <TextField
                id="file-test"
                name="image"
                type="file"
                sx={{
                  opacity: 0,
                  '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': { padding: 0 },
                  position: 'absolute',
                }}
              />
            </Stack>
          </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Button variant="outlined" sx={{ borderColor: 'black', color: 'black', ':hover': { backgroundColor: 'white', borderColor: 'black' } }}>
          Засах <EditOutlinedIcon />
        </Button>
        <Button variant="outlined" sx={{ borderColor: 'black', color: 'black', ':hover': { backgroundColor: 'white', borderColor: 'black' } }}>
          Устгах <DeleteOutlineOutlinedIcon />
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          data-cy="add-section-handle-btn"
          onClick={() => formik.handleSubmit()}
          sx={{ width: '26px', backgroundColor: 'black', alignSelf: 'center', ':hover': { backgroundColor: 'black' } }}
          variant="contained"
          disabled={!formik.isValid}
        >
          +
        </Button>
      </Stack>
      <Divider sx={{ width: '100%' }} />
      <Stack sx={{ display: 'flex', flexDirection: 'row', gap: '500px' }}>
        <Button sx={{ width: '280px', color: 'black', borderColor: 'black', ':hover': { backgroundColor: '#fff', borderColor: 'black' } }} variant="outlined">
          Нийтлэх
        </Button>
        <Button sx={{ width: '280px', backgroundColor: '#D6D8DB', color: '#1c2024', ':hover': { backgroundColor: '#D6D8DB' } }} variant="contained">
          Хадгалах
        </Button>
      </Stack>
      {successMessage && (
        <Alert data-testid="success" severity="success">{successMessage}</Alert>
      )}
    </Stack>
    
  );
};

export default AddSection;
