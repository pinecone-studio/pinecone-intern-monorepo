import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Button, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { CreateLeaveReqStep3 } from './CreateLeaveReqStep3';
import { useContext } from 'react';
import { LeaveReqCreationContext } from '../../providers/LeaveReqCreationProvider';
import { CreateLeaveReqStep1 } from './CreateLeaveReqStep1';
import { useFormik } from 'formik';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const validationSchema = yup.object({
  step2Length: yup.number().integer().default(0).required('only numbers'),
  step2StartDate: yup.date().required(),
  step2StartTime: yup.string().required(),
});

export const CreateLeaveReqStep2 = () => {
  const { setLeaveReqStep, setStepNo, leaveLength, setLeaveLength, startDate, setStartDate, startTime, setStartTime } = useContext(LeaveReqCreationContext);
  const label1 = 'Хэдэн өдрөөр тооцон авах';
  const label2 = 'Эхлэх хугацаа';
  const label3 = 'Эхлэх цаг';
  const labels = [label1, label2, label3];

  const formik = useFormik({
    initialValues: {
      step2Length: '',
      step2StartDate: dayjs(),
      step2StartTime: dayjs(),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(JSON.parse(localStorage.getItem('CreateLeaveReqStep1')));
      // localStorage.setItem('CreateLeaveReqStep1', JSON.stringify(values));
      setLeaveReqStep(<CreateLeaveReqStep3 />);
      setStepNo(2);
    },
  });

  return (
    <Box>
      <Stack sx={{ gap: '16px' }}>
        {labels.map((item) => {
          return (
            <Stack sx={{ gap: '4px' }}>
              <Typography fontSize={16} fontWeight={400} color={'#121316'}>
                {item}
              </Typography>
              {item == label1 ? (
                <TextField
                  name="step2Length"
                  value={formik.values.step2Length}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.step2Length && Boolean(formik.errors.step2Length))}
                  helperText={formik.touched.step2Length && formik.errors.step2Length}
                />
              ) : item == label2 ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    name="step2StartDate"
                    value={formik.values.step2StartDate}
                    onChange={formik.handleChange}
                    // error={Boolean(formik.touched.step2StartDate && Boolean(formik.errors.step2StartDate))}
                    // helperText={formik.touched.step2StartDate && formik.errors.step2StartDate}
                  />
                </LocalizationProvider>
              ) : item == label3 ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    name="step2StartTime"
                    value={formik.values.step2StartTime}
                    onChange={formik.handleChange}
                    // error={Boolean(formik.touched.step2StartTime && Boolean(formik.errors.step2StartTime))}
                    // helperText={formik.touched.step2StartTime && formik.errors.step2StartTime}
                  />
                </LocalizationProvider>
              ) : (
                ''
              )}
            </Stack>
          );
        })}
      </Stack>
      <Box paddingTop={'40px'} display={'flex'} justifyContent={'space-between'}>
        <IconButton
          onClick={() => {
            setLeaveReqStep(<CreateLeaveReqStep1 />);
            setStepNo(0);
          }}
          sx={{ bgcolor: '#1C20240A' }}
        >
          <ArrowBack sx={{ color: '#121316' }} />
        </IconButton>
        <Button
          onClick={() => {
            formik.handleSubmit();
          }}
          variant="contained"
          sx={{ bgcolor: '#121316', textTransform: 'none', gap: '4px', paddingY: '12px', paddingX: '16px' }}
          disableElevation
          disabled={!formik.values.step2Length || !formik.values.step2StartDate || !formik.values.step2StartTime}
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
