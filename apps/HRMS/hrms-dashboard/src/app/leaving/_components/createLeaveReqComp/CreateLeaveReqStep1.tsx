'use client';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs from 'dayjs';
import { LeaveReqCreationContext } from '../../_providers/LeaveReqCreationProvider';
import { CreateLeaveRequestStep2 } from './CreateLeaveRequestStep2';

const validationSchema = yup.object({
  step1Date: yup.date().required(),
  step1UserName: yup.string().required(),
  step1LeaveType: yup.string().required(),
});

export const CreateLeaveReqStep1 = () => {
  const { setStepNumber, setLeaveReqStep } = useContext(LeaveReqCreationContext);

  const workerName = { name: 'WorkerName' };

  const leaveTypes = ['shit happened', 'remote', 'medical', 'family emergency', 'others'];

  const formik = useFormik({
    initialValues: {
      step1Date: dayjs(),
      step1UserName: '',
      step1LeaveType: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setLeaveReqStep(<CreateLeaveRequestStep2 />);
      setStepNumber(1);
    },
  });

  return (
    <Box>
      <Stack sx={{ gap: '16px' }}>
        <Stack sx={{ gap: '4px' }} data-testid="date-picker-container">
          <Typography data-cy="step1Label" fontSize={16} fontWeight={400} color={'#121316'}>
            Огноо
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker name="step1Date" value={formik.values.step1Date} onChange={(value) => formik.setFieldValue('step1Date', value, true)} />
          </LocalizationProvider>
        </Stack>

        <Stack sx={{ gap: '4px' }}>
          <Typography data-cy="step1Label" fontSize={16} fontWeight={400} color={'#121316'}>
            Нэрээ сонгоно уу
          </Typography>
          <TextField data-cy="name-select-input" data-testid="name-select-input" select name="step1UserName" value={formik.values.step1UserName} onChange={formik.handleChange}>
            <MenuItem data-testid={workerName.name} value={workerName.name}>
              {workerName.name}
            </MenuItem>
          </TextField>
        </Stack>
        <Stack sx={{ gap: '4px' }}>
          <Typography data-cy="step1Label" fontSize={16} fontWeight={400} color={'#121316'}>
            Шалтгаанаа сонгоно уу
          </Typography>
          <TextField data-cy="type-select-input" data-testid="type-select-input" select name="step1LeaveType" value={formik.values.step1LeaveType} onChange={formik.handleChange}>
            {leaveTypes.map((option, index) => {
              return (
                <MenuItem data-testid={`type-${index}`} key={index} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </TextField>
        </Stack>
      </Stack>
      <Box paddingTop={'40px'} display={'flex'} justifyContent={'space-between'}>
        <IconButton sx={{ visibility: 'hidden', bgcolor: 'white' }}>
          <ArrowBack sx={{ color: 'white' }} />
        </IconButton>
        <Button
          data-cy="next-btn"
          data-testid="nextButton"
          onClick={() => {
            formik.handleSubmit();
          }}
          variant="contained"
          sx={{ bgcolor: '#121316', textTransform: 'none', gap: '4px', paddingY: '12px', paddingX: '16px' }}
          disableElevation
          disabled={!formik.values.step1Date || !formik.values.step1LeaveType || !formik.values.step1UserName}
        >
          <Typography fontSize={16} fontWeight={600} color={'white'}>
            Дараах
          </Typography>
          <ArrowForward sx={{ color: 'white' }} />
        </Button>
      </Box>
    </Box>
  );
};
