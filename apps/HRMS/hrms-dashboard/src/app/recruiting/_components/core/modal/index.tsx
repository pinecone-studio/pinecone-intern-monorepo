'use client';
import * as React from 'react';
import { Dialog, useTheme, Button, DialogActions, DialogContent, DialogContentText, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

type Props = {
  text: string;
  label: string;
};

export const CreateErrorModal = ({ text, label }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} data-testid="error-modal-button">
        {label}
      </Button>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title" sx={{ borderRadius: '25px' }} data-testid="error-modal">
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'black' }} autoFocus data-testid="close-button">
            <CloseIcon fontSize="medium" />
          </Button>
        </DialogActions>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mx: 20, mb: 5, gap: 3 }}>
          <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '6px', padding: 10 }}>
            <CheckIcon fontSize="large" />
          </div>
          <DialogContentText sx={{ fontSize: '20px', fontWeight: '600', color: 'black' }}>{text}.</DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
