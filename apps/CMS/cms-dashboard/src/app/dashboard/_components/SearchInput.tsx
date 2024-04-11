import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';

export function SearchInput() {
    return(
        <Stack sx={{ width:'70%' }}>
            <TextField
            placeholder='Нийтлэл, шошгоор хайх'
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
                )
            }}
            />
        </Stack>
    )
}