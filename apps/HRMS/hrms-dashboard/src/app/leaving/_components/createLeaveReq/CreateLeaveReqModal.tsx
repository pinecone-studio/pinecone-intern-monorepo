'use client';

import { Clear } from '@mui/icons-material';
import { Box, Button, Container, IconButton, MenuItem, Modal, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { LeaveReqCreationContext } from '../../providers/LeaveReqCreationProvider';
import { CreateLeaveReqSuccess } from './CreateLeaveReqSuccess';
import dayjs, { Dayjs } from 'dayjs';

export const CreateLeaveReqModal = () => {
  const {
    isOpen,
    setIsOpen,
    leaveReqStep,
    stepNo,
    isSucceeded,
    refresh,
    setRefresh,
    date,
    setDate,
    userName,
    setUserName,
    leaveReason,
    setLeaveReason,
    leaveLength,
    setLeaveLength,
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    subs,
    setSubs,
    workBrief,
    setWorkBrief,
    byApproved,
    setByApproved,
  } = useContext(LeaveReqCreationContext);
  const steps = [
    { label: 'Set up Store', text: 'Est 10-15 min' },
    { label: 'Set up Store', text: 'Est 10-15 min' },
    { label: 'Set up Store', text: 'Est 10-15 min' },
  ];

  const handleClose = () => {
    setIsOpen(false);
    setDate(dayjs(new Date()));
    setUserName('');
    setLeaveReason('');
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      {!isSucceeded ? (
        <Container sx={{ display: 'flex', flexDirection: 'column', gap: '40px', bgcolor: 'white', borderRadius: '16px', padding: '40px', border: '1px #ECEDF0 solid' }}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography fontSize={18} fontWeight={600} color={'#000'}>
              Чөлөөний хуудас бөглөх
            </Typography>
            <IconButton>
              <Clear onClick={handleClose} sx={{ color: '#121316' }} />
            </IconButton>
          </Box>
          <Stepper activeStep={stepNo} alternativeLabel>
            {steps.map((item) => (
              <Step key={item.label}>
                <StepLabel sx={{ gap: '8px' }}>
                  <Stack sx={{ gap: '4px' }}>
                    <Typography fontSize={14} fontWeight={600} color={'#121316'}>
                      {item.label}
                    </Typography>
                    <Typography fontSize={14} fontWeight={400} color={'#3F4145'}>
                      {item.text}
                    </Typography>
                  </Stack>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {leaveReqStep}
        </Container>
      ) : (
        <Container sx={{ padding: '24px', bgcolor: 'white', border: '1px #ECEDF0 solid', borderRadius: '12px' }}>
          <CreateLeaveReqSuccess
            onClick={() => {
              handleClose();
              setRefresh(refresh + 1);
            }}
          />
        </Container>
      )}
    </Modal>
  );
};
