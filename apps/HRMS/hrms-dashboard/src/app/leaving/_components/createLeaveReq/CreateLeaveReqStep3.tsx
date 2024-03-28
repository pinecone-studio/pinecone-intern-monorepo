import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import { LeaveReqCreationContext } from '../../providers/LeaveReqCreationProvider';
import { CreateLeaveReqStep2 } from './CreateLeaveReqStep2';
import { CreateLeaveReqSuccess } from './CreateLeaveReqSuccess';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  step3Subs: yup.string().required(),
  step3WorkBrief: yup.string().required(),
  step3ApprovedBy: yup.string().required(),
});

export const CreateLeaveReqStep3 = () => {
  const { setLeaveReqStep, setStepNo, subs, setSubs, workBrief, setWorkBrief, byApproved, setByApproved, isSucceeded, setIsSucceeded } = useContext(LeaveReqCreationContext);
  const label1 = 'Ажил шилжүүлэн өгөх ажилтны нэр';
  const label2 = 'Ажлаа түр хугацаанд юу юу шилжүүлэн өгч буйгаа товч тэмдэглэнэ үү.';
  const label3 = 'Хүсэлт батлах хүнээ сонго';
  const labels = [label1, label2, label3];

  const formik = useFormik({
    initialValues: {
      step3Subs: '',
      step3WorkBrief: '',
      step3ApprovedBy: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(JSON.parse(localStorage.getItem('CreateLeaveReqStep1')));
      // localStorage.setItem('CreateLeaveReqStep1', JSON.stringify(values));
      setLeaveReqStep(<CreateLeaveReqSuccess />);
      setIsSucceeded(true);
      setStepNo(3);
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
                  name="step3Subs"
                  value={formik.values.step3Subs}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.step3Subs && Boolean(formik.errors.step3Subs))}
                  helperText={formik.touched.step3Subs && formik.errors.step3Subs}
                />
              ) : item == label2 ? (
                <TextField
                  name="step3WorkBrief"
                  value={formik.values.step3WorkBrief}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.step3WorkBrief && Boolean(formik.errors.step3WorkBrief))}
                  helperText={formik.touched.step3WorkBrief && formik.errors.step3WorkBrief}
                ></TextField>
              ) : item == label3 ? (
                <TextField
                  name="step3ApprovedBy"
                  value={formik.values.step3ApprovedBy}
                  onChange={formik.handleChange}
                  error={Boolean(formik.touched.step3ApprovedBy && Boolean(formik.errors.step3ApprovedBy))}
                  helperText={formik.touched.step3ApprovedBy && formik.errors.step3ApprovedBy}
                ></TextField>
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
            setLeaveReqStep(<CreateLeaveReqStep2 />);
            setStepNo(1);
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
          disabled={!formik.values.step3ApprovedBy || !formik.values.step3Subs || !formik.values.step3WorkBrief}
        >
          <Typography fontSize={16} fontWeight={600} color={'white'}>
            Илгээх
          </Typography>
          <ArrowForward sx={{ color: 'white' }} />
        </Button>
      </Box>
    </Box>
  );
};
