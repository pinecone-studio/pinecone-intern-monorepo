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
import { LeaveReqCreationContext } from 'apps/HRMS/hrms-dashboard/src/common/providers/index';

const validationSchema = yup.object({
  step1Date: yup.date().required(),
  step1UserName: yup.string().required(),
  step1LeaveType: yup.string().required(),
});

export const CreateLeaveReqStep1 = () => {
  const { setStepNo } = useContext(LeaveReqCreationContext);

  const labels = [
    { label: 'Нэрээ сонгоно уу', textFieldDataCy: 'name-select-input', textFieldName: 'step1UserName', options: ['WorkerName'] },
    { label: 'Шалтгаанаа сонгоно уу', textFieldDataCy: 'type-select-input', textFieldName: 'step1LeaveType', options: ['shit happened', 'remote', 'medical', 'family emergency', 'others'] },
  ];

  const formik = useFormik({
    initialValues: {
      step1Date: dayjs(),
      step1UserName: '',
      step1LeaveType: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      setStepNo(1);
    },
  });

  return (
    <Box>
      <Stack sx={{ gap: '16px' }}>
        <Stack sx={{ gap: '4px' }}>
          <Typography data-cy="step1Label" fontSize={16} fontWeight={400} color={'#121316'}>
            Огноо
          </Typography>
          <LocalizationProvider data-cy="datepicker-input" dateAdapter={AdapterDayjs}>
            <DatePicker name="step1Date" value={formik.values.step1Date} onChange={(value) => formik.setFieldValue('step1Date', value, true)} />
          </LocalizationProvider>
        </Stack>
        {labels.map((item, index) => {
          return (
            <Stack key={index} sx={{ gap: '4px' }}>
              <Typography data-cy="step1Label" fontSize={16} fontWeight={400} color={'#121316'}>
                {item.label}
              </Typography>
              <TextField data-cy={item.textFieldDataCy} select name={item.textFieldName} value={`formik.values.${item.textFieldName}`} onChange={formik.handleChange}>
                {item.options.map((option, index) => {
                  return (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  );
                })}
              </TextField>
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
