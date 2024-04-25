import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

type JobLabelProps = {
  title: string;
  labelType?: 'Drafted' | 'Published' | 'Closed';
};

export const JobStatusLabel = ({ title, labelType }: JobLabelProps) => {
  const labels = [
    { status: 'Drafted', bgColor: '#fae8a2', color: '#5e4123' },
    { status: 'Closed', bgColor: '#fc9090', color: '#5e2330' },
    { status: 'Published', bgColor: '#c1e6cf', color: '#174224' },
  ];
  const filterLabels = labels.filter((label) => label.status === labelType);

  return (
    <Box>
      <Typography padding={1.3} margin={1} display="inline-block" borderRadius={6} sx={{ backgroundColor: `${filterLabels[0]?.bgColor}`, color: `${filterLabels[0]?.color}` }}>
        {title}
      </Typography>
    </Box>
  );
};

type ApplicantLabelProps = {
  title: string;
  labelType?: 'Passed' | 'Pending' | 'Rejected' | 'Scheduled' | 'Interview ';
};

export const ApplicantStatusLabel = ({ title, labelType }: ApplicantLabelProps) => {
  const labels = [
    { status: 'Pending', bgColor: '#fae8a2', color: '#5e4123' },
    { status: 'Rejected', bgColor: '#fc9090', color: '#5e2330' },
    { status: 'Passed', bgColor: '#c1e6cf', color: '#174224' },
    { status: 'Interview', bgColor: '#a2b5fa', color: '#2a235e' },
    { status: 'Scheduled', bgColor: '##a2b5fa', color: '#2a235e' },
  ];
  const filterLabels = labels.filter((label) => label.status === labelType);

  return (
    <Box>
      <Typography padding={1.3} margin={1} display="inline-block" borderRadius={6} sx={{ backgroundColor: `${filterLabels[0]?.bgColor}`, color: `${filterLabels[0]?.color}` }}>
        {title}
      </Typography>
    </Box>
  );
};
