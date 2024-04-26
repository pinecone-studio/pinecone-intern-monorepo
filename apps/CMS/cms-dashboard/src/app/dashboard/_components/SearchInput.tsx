import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Stack data-cy="search-input-cy-id" bgcolor={'#fff'} sx={{ width: '75%' }}>
      <TextField
        placeholder="Нийтлэл, шошгоор хайх"
        onChange={(e) => {
          router.push(pathname + '?' + createQueryString('searchedValue', e.target.value));
        }}
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
