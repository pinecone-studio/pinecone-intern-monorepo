'use client';

import { useState } from 'react';
import { Stack, DialogContent, Button, Dialog, DialogActions, Divider } from '@mui/material';
import { Add } from '@mui/icons-material';
import { DialogHeader, SelectWithLabel } from '../_components';

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
  const topicsMockData = ['HTML intro', 'HTML tags', 'HTML syntax', 'HTML symentic tags'];

  const dialogStyle = {
    height: '200px',
    width: '430px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid 2px #121316',
    borderRadius: '8px',
    gap: '2px',
    color: 'black',
    '&:hover': { background: 'black', color: 'white' },
  };
  const nextButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    marginBottom: '12px',
    borderRadius: '10px',
    padding: '10px',
  };

  return (
    <Stack sx={{ borderRadius: '30px' }} data-cy="add-challenge-button">
      <Button data-testid="challenge-button" variant="outlined" onClick={handleClickOpen} sx={buttonStyle} endIcon={<Add />}>
        Сорил
      </Button>
      <Dialog data-testid="challenge-dialog" open={open} onClose={handleClose}>
        <DialogHeader title={'Сорил нэмэх'} onClose={handleClose} />
        <Divider />
        <DialogContent sx={dialogStyle}>
          <SelectWithLabel label="Сэдэв сонгох" options={classesMockData} selectedOption={selectedTopic} onSelect={handleSelectTopic} />
          <SelectWithLabel label="Хичээл сонгох" options={topicsMockData} selectedOption={selectedCourse} onSelect={handleSelectCourse} />
        </DialogContent>
        <DialogActions>
          <Button data-cy="next-page-btn" onClick={handleClose} autoFocus style={nextButtonStyle}>
            Оруулах
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
