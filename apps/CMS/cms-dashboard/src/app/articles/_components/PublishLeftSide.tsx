'use client';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useCreateArticleMutation } from "../../../generated";


const modules = {
  toolbar :[
        [{header:[1,2,3,4,5,6,false]}],
        [{font:{}}],  
        [{size:[]}],  
        ["bold", "italic","underline"],
        [
              {list:"ordered"},
              {list:"bullet"},
        ]  ,
        ["link"], 
        [{ 'color': [] }, { 'background': [] }], 
        [{ 'align': [] }],
        ['clean']       
  ],
};

const PublishLeftSide = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const coverPhoto = "zurag";
  const author = "661c68e36837efa536464cb5";
  const category = "661c677c6837efa536464cab";
  const status = "PUBLISHED";
  const slug = "slug";
  const commentPermission = true;
  const [createArticle, { loading: creationLoading }] = useCreateArticleMutation();

  const handleCreateArticle = async () => {
    console.log("garchig", title);
    console.log("content", content);
    await createArticle({
      variables: {
        articleInput: {title,coverPhoto, content, author, category, status, slug, commentPermission}
      },
    });

    setTitle('');
    setContent('');
  };

  return (
    <Stack data-testid="PublishLeftSide" data-cy="PublishLeftSide" width={'100%'} height={'100vh'} flexDirection={'column'} pl={12} pt={8} pr={10} gap={6} bgcolor={'#F7F7F8'}>
      <Stack data-testid="title" gap={2}>
        <ArrowBack data-testid="publish-arrowBack" color="primary" />
        <Stack data-testid="publish-arrowBack" flexDirection={'column'} gap={2}>
          <Typography fontSize={18}>{'Гарчиг өгөх'}</Typography>
          <TextField variant='standard' sx={{  height: '64px', backgroundColor: "white", paddingX:"24px", alignItems:"center", paddingY:"18px", fontSize:"18px", borderRadius:"16px"}} fullWidth placeholder="Энд гарчгаа бичнэ үү..." InputProps={{disableUnderline: true}}    value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}/>
        </Stack>
      </Stack>
      <Stack data-testid = "content" flexDirection={'column'}  gap={2}>
        <Typography fontSize={18}>{'Нийтлэлээ бичих'}</Typography>
        <ReactQuill theme="snow" value={content} onChange={setContent}  modules={modules}/>;
      </Stack>
      <Button data-testid="create-article-btn" variant='contained' color='primary' sx={{height:"40px"}} disabled={creationLoading} onClick={handleCreateArticle}>Нийтлэх</Button>   
    </Stack>
  );
};
export default PublishLeftSide;
