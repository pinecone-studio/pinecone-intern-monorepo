'use client';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { LeaveReqCreationContext } from 'apps/HRMS/hrms-dashboard/src/common/providers/LeaveReqCreationProvider';

const validationSchema = yup.object({
  step1Date: yup.date().required(),
  step1UserName: yup.string().required(),
  step1LeaveType: yup.string().required(),
});

export const CreateLeaveReqStep1 = () => {
  const { setStepNo } = useContext(LeaveReqCreationContext);

  const loggedUser = { name: 'WorkerName' };
  const label1 = 'Огноо';
  const label2 = 'Нэрээ сонгоно уу';
  const label3 = 'Шалтгаанаа сонгоно уу';
  const labels = [label1, label2, label3];
  const leaveReasons = ['shit happened', 'remote', 'medical', 'family emergency', 'others'];

  const formik = useFormik({
    initialValues: {
      step1Date: dayjs(),
      step1UserName: '',
      step1LeaveType: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setStepNo(1);
    },
  });

  return (
    <Box>
      <Stack sx={{ gap: '16px' }}>
        {labels.map((item, index) => {
          return (
            <Stack key={index} sx={{ gap: '4px' }}>
              <Typography data-cy="step1Label" fontSize={16} fontWeight={400} color={'#121316'}>
                {item}
              </Typography>
              {item == label1 ? (
                <LocalizationProvider data-cy="datepicker-input" dateAdapter={AdapterDayjs}>
                  <DatePicker name="step1Date" value={formik.values.step1Date} onChange={(value) => formik.setFieldValue('step1Date', value, true)} />
                </LocalizationProvider>
              ) : item == label2 ? (
                <TextField
                  data-cy="name-select-input"
                  select
                  name="step1UserName"
                  value={formik.values.step1UserName}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.step1UserName && Boolean(formik.errors.step1UserName))}
                  helperText={formik.touched.step1UserName && formik.errors.step1UserName}
                >
                  <MenuItem key={loggedUser.name} value={loggedUser.name}>
                    {loggedUser.name}
                  </MenuItem>
                </TextField>
              ) : item == label3 ? (
                <TextField
                  data-cy="type-select-input"
                  select
                  name="step1LeaveType"
                  value={formik.values.step1LeaveType}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.step1LeaveType && Boolean(formik.errors.step1LeaveType))}
                  helperText={formik.touched.step1LeaveType && formik.errors.step1LeaveType}
                >
                  {leaveReasons.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                ''
              )}
            </Stack>
          );
        })}
      </Stack>
      <Box paddingTop={'40px'} display={'flex'} justifyContent={'space-between'}>
        <IconButton sx={{ visibility: 'hidden', bgcolor: 'white' }}>
          <ArrowBack sx={{ color: 'white' }} />
        </IconButton>
        <Button
          data-cy="next-btn"
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
