import { Box } from '@mui/material';
import { EmployeesList } from './_features/EmployeesList';

const EmployeeDetailsPage = () => {
  return (
    <Box bgcolor={'primary.light'} width={'100%'} overflow={'scroll'}>
      <EmployeesList />
    </Box>
  );
};

export default EmployeeDetailsPage;
