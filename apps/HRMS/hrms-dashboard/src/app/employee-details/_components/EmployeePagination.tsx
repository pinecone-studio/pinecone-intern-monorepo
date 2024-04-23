import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';

export const EmployeePagination = () => {
  return (
    <Stack>
      <Pagination
        data-testid="page-button"
        count={6}
        variant="outlined"
        shape="rounded"
        size="large"
        sx={{
          'Button.MuiPaginationItem-previousNext': {
            border: 'none',
            fontWeight: 700,
          },
          'Button.MuiPaginationItem-page': {
            border: '2px solid #ECEDF0',
            borderRadius: '8px',
          },
          'Button.MuiPaginationItem-page.Mui-selected': {
            border: 'none',
            bgcolor: 'primary.main',
            color: '#fff',
            borderRadius: '8px',
          },
          display: 'flex',
          justifyContent: 'center',
        }}
      />
    </Stack>
  );
};
