import { IconButton, Link, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { useCallback, useState } from 'react';

const menuItems = [
  // {
  //   icons: <ArchiveOutlinedIcon />,
  //   label: 'Архив',
  // },
  {
    icons: <LinkOutlinedIcon />,
    label: 'Линк хуулах',
  },
];

export const MenuButton = ({ id }: { id: string }) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>();
  const [copied, setCopied] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyClicked = useCallback(async () => {
    setCopied(true);

    const text = window.location.origin ?? '';

    await navigator.clipboard.writeText(`${text}/article/id=${id}`);
  });
  return (
    <Stack>
      <IconButton data-testid="morevert-button-test-id" sx={{ cursor: 'pointer' }} onClick={handleClick}>
        <MoreVertOutlinedIcon sx={{ width: 22, height: 22 }} />
      </IconButton>

      <Menu data-testid="drop-down-menu-test-id" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menuItems.map((item, index) => {
          return (
            <Stack
              className={`close-test-class-name-${index}`}
              data-testid="close-button-menu-test-id"
              data-cy="drop-down-menu-test-cy"
              key={index}
              direction={'row'}
              alignItems={'center'}
              px={1}
              py={0.3}
              onClick={handleClose}
              sx={{
                '&:hover': {
                  bgcolor: '#cdcfd1',
                },
              }}
            >
              {/* <Link href={`/articles/copy/${id}`}>
                <IconButton data-testid="item-icon" sx={{ color: '#000' }}>
                  <ArchiveOutlinedIcon />
                </IconButton>
              </Link> */}
              <IconButton data-testid="item-icon" sx={{ color: '#000' }}>
                <ArchiveOutlinedIcon />
              </IconButton>

              <MenuItem sx={{ padding: 1 }}>{item.label}</MenuItem>
            </Stack>
          );
        })}
      </Menu>
    </Stack>
  );
};
