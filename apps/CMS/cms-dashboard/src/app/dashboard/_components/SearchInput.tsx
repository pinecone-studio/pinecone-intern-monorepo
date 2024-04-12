import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';

const SearchInput = () => {
  return (
    <Stack sx={{ width: '70%', bgcolor: '#FFF', borderRadius: 1.1 }}>
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
