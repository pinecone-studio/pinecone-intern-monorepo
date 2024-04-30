'use client';

import { Clear } from '@mui/icons-material';
import { Box, Container, IconButton, Modal, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useContext } from 'react';
import { LeaveReqCreationContext } from '../../_providers/LeaveReqCreationProvider';

export const CreateLeaveReqModal = () => {
  const { isOpen, setIsOpen, leaveReqStep, stepNumber } = useContext(LeaveReqCreationContext);
  const steps = ['Ерөнхий', 'Хугацаа', 'Нэмэлт'];

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal data-cy="request-modal" data-testid="leaveRequestModal" open={isOpen} onClose={handleClose}>
      <Container
        data-testid="modalContainer"
        sx={{
          width: '600px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          bgcolor: 'white',
          borderRadius: '16px',
          padding: '40px',
          border: '1px #ECEDF0 solid',
        }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography fontSize={18} fontWeight={600} color={'#000'}>
            Чөлөөний хуудас бөглөх
          </Typography>
          <IconButton aria-label="modalClosingButton" data-cy="modal-closing-btn" data-testid="modalClosingButton" onClick={handleClose}>
            <Clear sx={{ color: '#121316' }} />
          </IconButton>
        </Box>
        <Stepper activeStep={stepNumber} alternativeLabel>
          {steps.map((item) => (
            <Step
              sx={{
                '& .MuiStepLabel-root .Mui-completed': {
                  color: 'black',
                },
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                  color: 'blue',
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: 'black',
                },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                  color: '#38a832',
                },
                '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                  fill: 'white',
                },
              }}
              key={item}
            >
              <StepLabel sx={{ gap: '8px' }}>
                <Typography fontSize={14} fontWeight={600} color={'#121316'}>
                  {item}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {leaveReqStep}
      </Container>
    </Modal>
  );
};
