import { Stack } from '@mui/material';
import { PersonalInformation } from './_components';

const EmployeeDetaills = () => {
  return (
    <Stack data-cy="Employee-Details-Page">
      <PersonalInformation lastName={'М.Ганбат'} email={'Zoloosoko0526@gmail.com'} />
    </Stack>
  );
};

export default EmployeeDetaills;
