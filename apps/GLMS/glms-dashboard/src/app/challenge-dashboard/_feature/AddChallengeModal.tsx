'use client';

import { useState } from 'react';
import { Stack, DialogContent, DialogTitle, Button, Dialog, DialogActions, IconButton, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Add } from '@mui/icons-material';
import { SelectButton } from '../_components';

export const AddChallengeModal = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleSelectCourse = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(event.target.value);
  };
  const handleSelectTopic = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopic(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classesMockData = ['HTML intro', 'HTML tags', 'HTML syntax', 'HTML symentic tags'];
  const TopicsMockData = ['HTML intro', 'HTML tags', 'HTML syntax', 'HTML symentic tags'];

  const textStyle = {
    fontWeight: 600,
    fontSize: '14px',
    color: '#121316',
  };
  const DialogStyle = {
    height: '200px',
    width: '430px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };
  const ButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 2px #121316',
    borderRadius: '8px',
    gap: '2px',
    color: 'black',
    '&:hover': { background: 'black', color: 'white' },
  };
  const NextBtnStyle = {
    backgroundColor: 'black',
    color: 'white',
    marginBottom: '12px',
    borderRadius: '10px',
    padding: '10px',
  };

  return (
    <Stack sx={{ borderRadius: '30px' }}>
      <Button data-testid="challenge-button" variant="outlined" onClick={handleClickOpen} sx={ButtonStyle}>
        Сорил <Add />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <div style={{ padding: '4px 15px 8px 15px' }}>
          <DialogTitle sx={{ fontWeight: 700, fontSize: 24 }}> Сорил нэмэх</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 20,
              top: 20,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        <DialogContent sx={DialogStyle}>
          <>
            <Typography sx={textStyle}>Сэдэв сонгох</Typography>
            <SelectButton options={classesMockData} selectedOption={selectedTopic} handleSelectChange={handleSelectTopic} />
          </>
          <>
            <Typography sx={textStyle}>Хичээл сонгох</Typography>
            <SelectButton options={TopicsMockData} selectedOption={selectedCourse} handleSelectChange={handleSelectCourse} />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus style={NextBtnStyle}>
            Оруулах
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
