'use client';
import React, { useMemo, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useCreateArticleMutation } from '../../../../generated';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: {} }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ],
};

const NewArticle = () => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const coverPhoto = 'https://content.ikon.mn/news/2022/9/27/ahrmi8_pine2_x974.jpg';
  const author = '661c68e36837efa536464cb5';
  const category = '661c677c6837efa536464cab';
  const status = 'PUBLISHED';
  const slug = 'slug';
  const commentPermission = true;
  const [createArticle, { loading: creationLoading }] = useCreateArticleMutation();

  const handleCreateArticle = async () => {
    await createArticle({
      variables: {
        articleInput: { title, coverPhoto, content, author, category, status, slug, commentPermission },
      },
    });
  };

  return (
    <Stack data-testid="create-article-main-container" width={'100%'} height={'100vh'} flexDirection={'column'} pl={12} pt={8} pr={10} gap={6} bgcolor={'#F7F7F8'}>
      <Stack gap={2}>
        <ArrowBack data-testid="publish-arrowBack" color="primary" />
        <Stack data-testid="publish-arrowBack" flexDirection={'column'} gap={2}>
          <Typography fontSize={18}>{'Гарчиг өгөх'}</Typography>
          <TextField
            data-testid="title"
            variant="standard"
            sx={{ height: '64px', backgroundColor: 'white', paddingX: '24px', alignItems: 'center', paddingY: '18px', fontSize: '18px', borderRadius: '16px' }}
            fullWidth
            placeholder="Энд гарчгаа бичнэ үү..."
            InputProps={{ disableUnderline: true }}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </Stack>
      </Stack>
      <Stack
        sx={{
          '& .ql-toolbar': { backgroundColor: 'white', width: 'fit-content' },
          '& .ql-container': { backgroundColor: 'white', border: 'none', borderRadius: '18px', minHeight: '237px', overflowY: 'scroll', fontSize: '18px' },
        }}
        data-testid="content"
        flexDirection={'column'}
        gap={2}
      >
        <Typography fontSize={18}>{'Нийтлэлээ бичих'}</Typography>

        <ReactQuill data-testid="content" theme="snow" value={content} onChange={setContent} style={{ display: 'flex', flexDirection: 'column-reverse', gap: '40px' }} modules={modules} />
      </Stack>
      <Button
        data-testid="create-article-btn"
        variant="contained"
        color="primary"
        sx={{ height: '40px', display: 'flex', flexDirection: 'column' }}
        disabled={creationLoading}
        onClick={() => {
          handleCreateArticle();
          router.push('/');
        }}
      >
        Нийтлэх
      </Button>
    </Stack>
  );
};
export default NewArticle;
