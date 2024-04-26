'use client';
import { Button, Divider, Stack, TextField, Typography, Input } from '@mui/material';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import { useCreateLessonMutation } from '../../../generated';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validatinSchema = yup.object({
  title: yup.string().required('Please Enter Lesson Name '),
  thumbnail: yup.string().required('Required'),
});

const AddLesson = () => {
  const [image, setImage] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function selectFiles() {
    fileInputRef.current.click();
  }
  function onFileSelect(event) {
    const files = event.target.files[0];
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (value) => {
      handleBack(value.title, value.thumbnail);
    },
  });

  const [createLesson] = useCreateLessonMutation();
  const lessonInput = useRef({
    title: '',
    thumbnail: '',
  });

  const handleBack = (field: string, value: string) => {
    lessonInput.current = { ...lessonInput.current, [field]: value };
  };

  const handleSubmit = async () => {
    const { data } = await createLesson({
      variables: {
        title: lessonInput.current.title,
        thumbnail: lessonInput.current.thumbnail,
      },
    });
    throw data;
  };

  return (
    <Stack sx={{ display: 'flex', gap: 4, backgroundColor: '#fff', borderRadius: 4, justifyContent: 'center', alignItems: 'center', paddingTop: 6, paddingBottom: 4 }} data-cy="Lesson-Add-Page">
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: '50%',
          borderInlineStyle: 'dotted',
          backgroundColor: '#fff',
          border: 1,
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 6,
          borderStyle: 'dashed',
        }}
      >
        <Stack sx={{ gap: 1, width: '100%' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Хичээлийн гарчиг</Typography>
          <TextField
            id="title-test"
            sx={{ borderRadius: 5 }}
            name="title"
            // onChange={(e) => handleBack('title', e.target.target)}
            value={formik.values.title}
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // error={formik.touched.title && Boolean(formik.errors.title)}
            // helperText={formik.touched.title && formik.errors.title}
            placeholder="Оруулна уу..."
          ></TextField>
        </Stack>

        <Stack sx={{ gap: 1, width: '100%' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}> Хичээлийн зураг</Typography>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              width: '100%',
              height: '260px',
              justifyContent: 'center',
              alignItems: 'center',
              border: 1,
              borderRadius: 4,
              borderStyle: 'dashed',
            }}
          >
            {isDragging ? (
              <Typography>jndkj</Typography>
            ) : (
              <>
                <PhotoOutlinedIcon sx={{ color: '#D6D8DB' }} />
                <Stack sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
                  <Typography sx={{ color: '#D6D8DB' }}>Зургийг чирж буулгах эсвэл</Typography>
                  <span className="select" role="button" onClick={selectFiles}>
                    Browse
                  </span>
                </Stack>
              </>
            )}

            <input id="#file-test" name="file" type="file" className="file" ref={fileInputRef} hidden></input>
          </Stack>
        </Stack>
      </Stack>

      <Stack sx={{ borderTop: 1, borderColor: '#ECEDF0', width: '100%', display: 'flex', alignContent: 'end', justifyItems: 'end', alignItems: 'center', paddingTop: 4 }}>
        <Button
          data-testid="create-button"
          sx={{
            width: '15%',
            height: 56,
            backgroundColor: '#D6D8DB',
            color: 'rgba(28, 32, 36, 0.24)',
            fontWeight: 'bold',
            alignSelf: 'center',
            ':hover': { backgroundColor: 'black', color: 'white' },
          }}
          onClick={handleSubmit}
          variant="contained"
        >
          Хадгалах
        </Button>
      </Stack>
    </Stack>
  );
};
export default AddLesson;
