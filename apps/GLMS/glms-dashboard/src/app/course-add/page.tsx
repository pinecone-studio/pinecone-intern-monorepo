'use client';
import { Box, Input, Stack, Typography, Button } from '@mui/material';
import React, { useRef } from 'react';
import LeftArrow from './assets/LeftArrow';
import { useCreateCourseMutation } from '@/generated/index';

const CourseAdd = () => {
  const [createCourse] = useCreateCourseMutation();
  const CourseInput = useRef({
    title: '',
    thumbnail: '',
    contentTitle: '',
    contentDesc: '',
  });
  const handleBack = (field: string, value: string | number) => {
    CourseInput.current = { ...CourseInput.current, [field]: value };
  };

  const handleSubmit = async () => {
    const { data } = await createCourse({
      variables: {
        title: CourseInput.current.title,
        thumbnail: CourseInput.current.thumbnail,
        content: [
          {
            title: CourseInput.current.contentTitle,
            description: CourseInput.current.contentDesc,
          },
        ],
      },
    });
    throw data;
  };

  return (
    <Stack sx={{ backgroundColor: '#F7F7F8', height: '1024px' }}>
      <Box>
        <LeftArrow />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ backgroundColor: 'white', width: '1248px', height: '810px' }}>
          <Typography sx={{ fontSize: '28px', paddingX: '24px', marginTop: '40px' }}>Сэдвийн ерөнхий мэдээлэл</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: '24px', marginTop: '64px' }}>
            <Box>
              <Box>
                <Typography>Гарчиг</Typography>
                <Input
                  onChange={(e) => handleBack('title', e.target.value)}
                  type="thumbnail"
                  sx={{ border: '1px solid #D6D8DB', borderRadius: '4px', borderBottom: 'none', width: '588px' }}
                  placeholder="Оруулна уу..."
                ></Input>
              </Box>
              <Box>
                <Typography>Дэлгэрэнгүй</Typography>
                <Input
                  onChange={(e) => handleBack('thumbnail', e.target.value)}
                  type="title"
                  sx={{ border: '1px solid #D6D8DB', borderRadius: '4px', borderBottom: 'none', width: '588px', height: '102px' }}
                  placeholder="Энд бичнэ үү..."
                ></Input>
              </Box>
            </Box>
            <Box>
              <Box>
                <Typography>Content Title</Typography>
                <Input
                  onChange={(e) => handleBack('contentTitle', e.target.value)}
                  type="content description"
                  sx={{ border: '1px solid #D6D8DB', borderRadius: '4px', borderBottom: 'none', width: '440px', height: '220px' }}
                  placeholder="Энд бичнэ үү..."
                ></Input>
              </Box>
              <Box>
                <Typography>Content Description</Typography>
                <Input
                  onChange={(e) => handleBack('contentDesc', e.target.value)}
                  type="content title"
                  sx={{ border: '1px solid #D6D8DB', borderRadius: '4px', borderBottom: 'none', width: '440px', height: '220px' }}
                  placeholder="Энд бичнэ үү..."
                ></Input>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {' '}
            <Button onClick={handleSubmit}>Үргэлжлүүлэх</Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default CourseAdd;
