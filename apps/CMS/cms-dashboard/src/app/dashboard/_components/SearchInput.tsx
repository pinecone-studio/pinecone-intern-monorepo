import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';

const SearchInput = () => {
  return (
    <Stack sx={{ width: '75%', bgcolor: '#FFF' }} border={'1px solid #D6D8DB'}>
      <TextField
        placeholder="Нийтлэл, шошгоор хайх"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default SearchInput;
