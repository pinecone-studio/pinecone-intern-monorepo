import { Container, InputAdornment, Stack, TextField } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
const Header = () => {
  return (
    <Stack bgcolor="#F7F7F8">
      <Container data-testid="header-artivle-detail" maxWidth="xl" sx={{ display: 'flex', height: '48px', alignItems: 'center', justifyContent: 'space-between' }}>
        <img width="32px" height="24px" src="svgCompanyLogo.png" />
        <Stack direction="row" gap="8px" alignItems="center">
          <TextField
            data-testid="text-data-search"
            InputProps={{
              sx: {
                borderRadius: '8px',
                width: '180px',
                height: '32px',
                p: '6px',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'black' }} />
                </InputAdornment>
              ),
            }}
            type="search"
            placeholder="Search"
          />
          <AppsIcon sx={{ color: '#5E6166', width: '36xp', height: '36px' }} />
          <Stack width="32px" height="32px" borderRadius="100%">
            <img src="Avatar.png" />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};
export default Header;
