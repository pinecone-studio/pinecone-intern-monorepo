import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';

type PropsType = {
  paginationPageCount: number;
  handleClick: (_: number) => void;
  searchPath: string | null;
};

export const EmployeePagination = ({ paginationPageCount, handleClick, searchPath }: PropsType) => {
  return (
    <Stack>
      <Pagination
        onChange={(_, page) => handleClick(page)}
        data-testid="page-button"
        count={paginationPageCount}
        variant="outlined"
        page={Number(searchPath)}
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
