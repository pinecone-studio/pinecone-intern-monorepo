import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';
import { LeaveReqCreationContext } from '../../_providers/LeaveReqCreationProvider';
import { CreateLeaveRequestStep2DayOff } from './CreateLeaveRequestStep2DayOff';
import { CreateLeaveReqStep1 } from './CreateLeaveReqStep1';

const validationSchema = yup.object({
  step21LeaveLength: yup.string().required(),
});

export const CreateLeaveRequestStep2 = () => {
  const { setLeaveReqStep, setStepNumber } = useContext(LeaveReqCreationContext);

  const formik = useFormik({
    initialValues: {
      step21LeaveLength: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setLeaveReqStep(<CreateLeaveRequestStep2DayOff />);
    },
  });

  return (
    <Box data-testid="step2Component">
      <FormControl sx={{ gap: '16px' }}>
        <FormLabel sx={{ fontSize: '16px', fontWeight: '400', color: 'primary.main' }}>Хугацааны төрөл сонгох</FormLabel>
        <RadioGroup row sx={{ gap: '16px' }} name="step21LeaveLength" onChange={formik.handleChange} value={formik.values.step21LeaveLength}>
          <FormControlLabel data-cy="radioButtonDays" data-testid="radioButtonDays" value="days" control={<Radio />} label="Хоног" />
          <FormControlLabel data-cy="radioButtonDayOff" data-testid="radioButtonDayOff" value="dayOff" control={<Radio />} label="Өдөр" />
        </RadioGroup>
      </FormControl>

      <Box paddingTop={'40px'} display={'flex'} justifyContent={'space-between'}>
        <IconButton
          data-cy="returnPreviousStep"
          data-testid="returnPreviousStep"
          sx={{ bgcolor: '#1C20240A' }}
          onClick={() => {
            setStepNumber(0);
            setLeaveReqStep(<CreateLeaveReqStep1 />);
          }}
        >
          <ArrowBack />
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
          disabled={!formik.values.step21LeaveLength}
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
