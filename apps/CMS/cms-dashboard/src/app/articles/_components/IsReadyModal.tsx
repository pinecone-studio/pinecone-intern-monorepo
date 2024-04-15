'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 528,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 3,
};

export default function IsReadyModal() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack display="flex" alignItems="end">
            <CloseIcon />
          </Stack>
          <Stack display="flex" alignItems="center" gap="36px" p="24px" sx={{ borderBottom: 1, borderColor: '#D6D8DB' }}>
            <Image src="/FeaturedIcon.png" alt="" width="60" height="60"></Image>
            <Typography id="modal-modal-title" fontWeight="600" fontSize="24px">
              Та нийтлэхэд бэлэн үү?
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" py="16px" gap="32px">
            <Button
              variant="outlined"
              sx={{
                py: 1.5,
                px: 3,
                fontWeight: 600,
                fontSize: 16,
                border: 'none',
                color: 'black',
                bgcolor: 'grey.100',
                borderRadius: '12px',
                '&:hover': { borderColor: 'black', bgcolor: 'grey.100' },
              }}
            >
              Дараа төлөвлөх
            </Button>
            <Button variant="contained" sx={{ py: 1.5, px: 3, fontWeight: 600, fontSize: 16, color: 'white', bgcolor: 'black', borderRadius: '12px', '&:hover': { bgcolor: 'black' } }}>
              Нийтлэх
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
